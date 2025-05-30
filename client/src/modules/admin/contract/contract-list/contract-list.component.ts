import { IContractService } from './../../../../services/contract/contract.service.interface';
import { Component, Inject } from '@angular/core';
import { ContractResponseModel } from '../../../../models/contract/contractresponse.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { AUTH_SERVICE, CONTRACT_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { Router } from '@angular/router';
import { PaginationComponent } from "../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-contract-list',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.css'
})
export class ContractListComponent {
  contracts: PaginatedResult<ContractResponseModel> | null = null;
  filteredContracts: PaginatedResult<ContractResponseModel> | null = null;
  selectedStatus: string = '';
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private readonly route: Router,
    @Inject(CONTRACT_SERVICE) private readonly contractService: IContractService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  ngOnInit() {
    this.loadContracts();
  }

  loadContracts() {
    this.contractService.getByUserId(this.authService.getUserId(), this.currentPage, this.pageSize).subscribe({
      next: (result) => {
        this.contracts = result;
        this.filteredContracts = { ...result };
      },
      error: (error) => {
        console.error('Error loading contracts:', error);
      }
    });
  }

  filterContracts() {
    if (!this.contracts) return;

    this.filteredContracts = {
      ...this.contracts,
      items: this.contracts.items.filter(contract => {
        const matchesStatus = !this.selectedStatus || contract.status.toString() === this.selectedStatus;
        const matchesSearch = !this.searchTerm || contract.tenantName.toLowerCase().includes(this.searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      })
    };
  }

  getContractsByStatus(status: number): ContractResponseModel[] {
    return this.contracts?.items.filter(contract => contract.status === status) || [];
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 0: return 'bg-yellow-100 text-yellow-800';
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 0: return 'Đã hết hạn';
      case 1: return 'Đang hoạt động';
      default: return 'Không xác định';
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  trackByContractId(index: number, contract: ContractResponseModel): number {
    return contract.id || index;
  }
  
  createContract() {
    this.route.navigate(['admin/contract/create']);
  }

  viewContract(contract: ContractResponseModel) {
    this.route.navigate(['admin/contract/detail', contract.id]);
  }

  editContract(contract: ContractResponseModel) {
    this.route.navigate(['admin/contract/edit', contract.id]);
  }

  deleteContract(contract: ContractResponseModel) {
    console.log('Deleting contract:', contract);
    if (contract.id !== undefined) {
      this.contractService.delete(contract.id).subscribe({
        next: () => {
          this.loadContracts();
        },
        error: (error) => {
          console.error('Error deleting contract:', error);
        }
      });
    } else {
      console.error('Cannot delete contract: contract.id is undefined');
    }
  }

  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadContracts();
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.loadContracts();
  }
}
