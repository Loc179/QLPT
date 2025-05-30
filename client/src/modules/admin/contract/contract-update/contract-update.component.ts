import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractModel } from '../../../../models/contract/contract.model';
import { AUTH_SERVICE, CONTRACT_SERVICE, TENANT_SERVICE } from '../../../../constants/injection/injection.constant';
import { IContractService } from '../../../../services/contract/contract.service.interface';
import { ITenantService } from '../../../../services/tenant/tenant.service.interface';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { TenantModel } from '../../../../models/tenant/tenant.model';

@Component({
  selector: 'app-contract-update',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contract-update.component.html',
  styleUrl: './contract-update.component.css'
})
export class ContractUpdateComponent implements OnInit {
  contractForm: FormGroup;
  allTenants: PaginatedResult<TenantModel> | null = null;
  filteredTenants: TenantModel[] = [];
  selectedTenants: TenantModel[] = [];
  searchTenant = '';
  isSubmitting = false;
  isLoading = true;
  contractId: number = 0;
  originalContract: ContractModel | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(CONTRACT_SERVICE) private readonly contractService: IContractService,
    @Inject(TENANT_SERVICE) private readonly tenantService: ITenantService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {
    this.contractForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      depositAmount: [0, [Validators.required, Validators.min(0)]],
      status: [0, Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    this.contractId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.contractId) {
      // Load contract first, then load tenants
      this.loadContract();
    } else {
      console.error('Contract ID not found');
      this.router.navigate(['/contracts']);
    }
  }

  loadContract() {
    this.contractService.getById(this.contractId).subscribe({
      next: (contract: ContractModel) => {
        this.originalContract = contract;
        this.populateForm(contract);
        // Load tenants after contract data is available
        this.loadTenants();
      },
      error: (error) => {
        console.error('Error loading contract:', error);
        alert('Không thể tải thông tin hợp đồng. Vui lòng thử lại sau.');
        this.router.navigate(['/contracts']);
      }
    });
  }

  populateForm(contract: ContractModel) {
    // Format dates for input fields
    const startDate = new Date(contract.startDate).toISOString().split('T')[0];
    const endDate = new Date(contract.endDate).toISOString().split('T')[0];

    this.contractForm.patchValue({
      startDate: startDate,
      endDate: endDate,
      depositAmount: contract.depositAmount,
      status: contract.status,
      notes: contract.notes || ''
    });
  }

  loadTenants() {
    this.tenantService.getWithoutContract(this.authService.getUserId()).subscribe({
      next: (result: PaginatedResult<TenantModel>) => {
        this.allTenants = result;
        this.filteredTenants = result.items;
        
        // Pre-select tenants based on contract data
        if (this.originalContract && this.originalContract.tenantIds && this.originalContract.tenantIds.length > 0) {
          this.selectedTenants = result.items.filter(tenant => 
            this.originalContract!.tenantIds.includes(tenant.id!)
          );
          console.log('Selected tenants:', this.selectedTenants);
          console.log('Original tenant IDs:', this.originalContract.tenantIds);
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error loading tenants:', error);
        alert('Không thể tải danh sách người thuê. Vui lòng thử lại sau.');
        this.isLoading = false;
      }
    });
  }

  filterTenants() {
    const searchLower = this.searchTenant.toLowerCase();
    this.filteredTenants = (this.allTenants?.items ?? []).filter(tenant =>
      tenant.fullName.toLowerCase().includes(searchLower) ||
      tenant.email?.toLowerCase().includes(searchLower) ||
      tenant.phoneNumber?.includes(this.searchTenant)
    );
  }

  toggleTenant(tenant: TenantModel) {
    if (this.isSelected(tenant)) {
      this.removeTenant(tenant);
    } else {
      this.selectedTenants.push(tenant);
    }
  }

  removeTenant(tenant: TenantModel) {
    this.selectedTenants = this.selectedTenants.filter(t => t.id !== tenant.id);
  }

  isSelected(tenant: TenantModel): boolean {
    return this.selectedTenants.some(t => t.id === tenant.id);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  onSubmit() {
    if (this.contractForm.valid && this.selectedTenants.length > 0 && this.originalContract) {
      this.isSubmitting = true;
      
      const formValue = this.contractForm.value;
      const contractData = new ContractModel();
      contractData.id = this.originalContract.id;
      contractData.userId = this.originalContract.userId;
      contractData.startDate = this.originalContract.startDate;
      contractData.endDate = this.originalContract.endDate;
      contractData.depositAmount = formValue.depositAmount;
      contractData.status = parseInt(formValue.status);
      contractData.notes = formValue.notes;
      contractData.tenantIds = this.selectedTenants.map(t => t.id!);
      contractData.tenantNames = this.selectedTenants.map(t => t.fullName);
      contractData.createdAt = this.originalContract.createdAt;

      this.contractService.update(contractData.id!,contractData).subscribe({
        next: (response) => {
          setTimeout(() => {
            console.log('Updating contract:', contractData);
            this.isSubmitting = false;
            alert('Hợp đồng đã được cập nhật thành công!');
            this.router.navigate(['/contracts']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error updating contract:', error);
          this.isSubmitting = false;
          alert('Có lỗi xảy ra khi cập nhật hợp đồng. Vui lòng thử lại sau.');
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contractForm.controls).forEach(key => {
        this.contractForm.get(key)?.markAsTouched();
      });
      
      if (this.selectedTenants.length === 0) {
        alert('Vui lòng chọn ít nhất một người thuê!');
      }
    }
  }

  onCancel() {
    if (this.hasChanges()) {
      if (confirm('Bạn có chắc chắn muốn hủy? Các thay đổi sẽ không được lưu.')) {
        this.router.navigate(['/contracts']);
      }
    } else {
      this.router.navigate(['/contracts']);
    }
  }

  hasChanges(): boolean {
    if (!this.originalContract) return false;

    const formValue = this.contractForm.value;
    const originalStartDate = new Date(this.originalContract.startDate).toISOString().split('T')[0];
    const originalEndDate = new Date(this.originalContract.endDate).toISOString().split('T')[0];

    // Check form fields
    const formChanged = 
      formValue.startDate !== originalStartDate ||
      formValue.endDate !== originalEndDate ||
      formValue.depositAmount !== this.originalContract.depositAmount ||
      formValue.status !== this.originalContract.status ||
      (formValue.notes || '') !== (this.originalContract.notes || '');

    // Check selected tenants
    const currentTenantIds = this.selectedTenants.map(t => t.id!).sort();
    const originalTenantIds = [...this.originalContract.tenantIds].sort();
    const tenantsChanged = 
      currentTenantIds.length !== originalTenantIds.length ||
      !currentTenantIds.every((id, index) => id === originalTenantIds[index]);

    return formChanged || tenantsChanged;
  }

  resetForm() {
    if (this.originalContract) {
      this.populateForm(this.originalContract);
      this.searchTenant = '';
      this.filteredTenants = [...(this.allTenants?.items ?? [])];
      
      // Reset selected tenants
      if (this.allTenants && this.originalContract.tenantIds) {
        this.selectedTenants = this.allTenants.items.filter(tenant => 
          this.originalContract!.tenantIds.includes(tenant.id!)
        );
        console.log('Reset - Selected tenants:', this.selectedTenants);
      }
    }
  }
}