import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContractModel } from '../../../../models/contract/contract.model';
import { AUTH_SERVICE, CONTRACT_SERVICE, TENANT_SERVICE } from '../../../../constants/injection/injection.constant';
import { IContractService } from '../../../../services/contract/contract.service.interface';
import { ITenantService } from '../../../../services/tenant/tenant.service.interface';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { TenantModel } from '../../../../models/tenant/tenant.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contract-create.component.html',
  styleUrl: './contract-create.component.css'
})
export class ContractCreateComponent {
  contractForm: FormGroup;
  allTenants: PaginatedResult<TenantModel> | null = null;
  filteredTenants: TenantModel[] = [];
  selectedTenants: TenantModel[] = [];
  searchTenant = '';
  isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
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
    this.loadTenants();
    this.setDefaultStartDate();
  }

  loadTenants() {
    this.tenantService.getWithoutContract(this.authService.getUserId()).subscribe({
      next: (result: PaginatedResult<TenantModel>) => {
        this.allTenants = result;
        this.filteredTenants = result.items;
      },
      error: (error) => {
        console.error('Error loading tenants:', error);
        this.toastr.warning('Không thể tải danh sách người thuê. Vui lòng thử lại sau.');
      }
    });
    this.filteredTenants = [...this.allTenants?.items ?? []];
  }

  setDefaultStartDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const formattedStartDate = today.toISOString().split('T')[0];
    const formattedEndDate = tomorrow.toISOString().split('T')[0];
    
    this.contractForm.patchValue({ 
      startDate: formattedStartDate,
      endDate: formattedEndDate
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
    if (this.contractForm.valid && this.selectedTenants.length > 0) {
      this.isSubmitting = true;
      
      const formValue = this.contractForm.value;
      const contractData = new ContractModel();
      contractData.userId = this.authService.getUserId();
      contractData.startDate = new Date(formValue.startDate);
      contractData.endDate = new Date(formValue.endDate);
      contractData.depositAmount = formValue.depositAmount;
      contractData.status = parseInt(formValue.status);
      contractData.notes = formValue.notes;
      contractData.tenantIds = this.selectedTenants.map(t => t.id);
      contractData.tenantNames = this.selectedTenants.map(t => t.fullName);
      contractData.createdAt = new Date();


      this.contractService.create(contractData).subscribe({
        next: (response) => {
          setTimeout(() => {
            console.log('Creating contract:', contractData);
            this.isSubmitting = false;
            this.toastr.success('Hợp đồng đã được tạo thành công!');
            // Navigate back or reset form
            this.resetForm();
            this.router.navigate(['admin/contract']);
          }, 2000);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contractForm.controls).forEach(key => {
        this.contractForm.get(key)?.markAsTouched();
      });
      
      if (this.selectedTenants.length === 0) {
        this.toastr.warning('Vui lòng chọn ít nhất một người thuê!');
      }
    }
  }

  onCancel() {
    if (confirm('Bạn có chắc chắn muốn hủy tạo hợp đồng? Dữ liệu đã nhập sẽ bị mất.')) {
      this.resetForm();
    }
  }

  resetForm() {
    this.contractForm.reset();
    this.selectedTenants = [];
    this.searchTenant = '';
    this.filteredTenants = [...(this.allTenants?.items ?? [])];
    this.setDefaultStartDate();
    this.contractForm.patchValue({ status: 0 });
  }
}
