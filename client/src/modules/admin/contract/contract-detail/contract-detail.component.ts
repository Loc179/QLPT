import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContractModel } from '../../../../models/contract/contract.model';
import { AUTH_SERVICE, CONTRACT_SERVICE, TENANT_SERVICE } from '../../../../constants/injection/injection.constant';
import { IContractService } from '../../../../services/contract/contract.service.interface';
import { ITenantService } from '../../../../services/tenant/tenant.service.interface';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { TenantModel } from '../../../../models/tenant/tenant.model';

@Component({
  selector: 'app-contract-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './contract-detail.component.html',
  styleUrl: './contract-detail.component.css'
})
export class ContractDetailComponent implements OnInit {
  contract: ContractModel | null = null;
  tenants: TenantModel[] = [];
  isLoading = true;
  contractId: number = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(CONTRACT_SERVICE) private readonly contractService: IContractService,
    @Inject(TENANT_SERVICE) private readonly tenantService: ITenantService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  ngOnInit() {
    this.contractId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.contractId) {
      this.loadContract();
    } else {
      console.error('Contract ID not found');
      this.router.navigate(['/contracts']);
    }
  }

  loadContract() {
    this.contractService.getById(this.contractId).subscribe({
      next: (contract: ContractModel) => {
        this.contract = contract;
        this.loadTenants();
      },
      error: (error) => {
        console.error('Error loading contract:', error);
        alert('Không thể tải thông tin hợp đồng. Vui lòng thử lại sau.');
        this.router.navigate(['/contracts']);
      }
    });
  }

  loadTenants() {
    if (this.contract && this.contract.tenantIds && this.contract.tenantIds.length > 0) {
      // Load tenant details for each tenant ID
      const tenantPromises = this.contract.tenantIds.map(id => 
        this.tenantService.getById(id).toPromise()
      );

      Promise.all(tenantPromises).then(
        (tenants: (TenantModel | undefined)[]) => {
          this.tenants = tenants.filter(tenant => tenant !== undefined) as TenantModel[];
          this.isLoading = false;
        }
      ).catch(error => {
        console.error('Error loading tenants:', error);
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getStatusText(status: number): string {
    return status === 1 ? 'Đang hoạt động' : 'Đã hết hạn';
  }

  getStatusClass(status: number): string {
    return status === 1 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  onEdit() {
    this.router.navigate(['/contracts', this.contractId, 'edit']);
  }

  onDelete() {
    if (confirm('Bạn có chắc chắn muốn xóa hợp đồng này? Hành động này không thể hoàn tác.')) {
      this.contractService.delete(this.contractId).subscribe({
        next: () => {
          alert('Hợp đồng đã được xóa thành công!');
          this.router.navigate(['/contracts']);
        },
        error: (error) => {
          console.error('Error deleting contract:', error);
          alert('Có lỗi xảy ra khi xóa hợp đồng. Vui lòng thử lại sau.');
        }
      });
    }
  }

  onBack() {
    this.router.navigate(['/contracts']);
  }
}