import { Component, Inject } from '@angular/core';
import { finalize } from 'rxjs';
import { ROOMSERVICE_SERVICE } from '../../../../constants/injection/injection.constant';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IRoomserviceService } from '../../../../services/roomservice/roomservice.service.interface';
import { RoomServiceModel } from '../../../../models/roomservice/roomservice.model';
import { CommonModule } from '@angular/common';
import { RoomservicesCreateComponent } from "../roomservices-create/roomservices-create.component";
import { RoomservicesEditComponent } from "../roomservices-edit/roomservices-edit.component";
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { PaginationComponent } from "../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-roomservices-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RoomservicesCreateComponent, RoomservicesEditComponent, PaginationComponent],
  templateUrl: './roomservices-list.component.html',
  styleUrl: './roomservices-list.component.css'
})
export class RoomservicesListComponent {
  roomServices: PaginatedResult<RoomServiceModel> | null = null;
  roomId!: number;
  isLoading: boolean = false;
  error: string | null = null;
  isCreateModalOpen = false;
  isEditModalOpen = false;
  selectedService: RoomServiceModel | null = null;

  currentPage: number = 1;
  pageSize: number = 10;

  displayedColumns: string[] = ['Tên', 'Giá', 'Đơn vị', 'Hành động'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(ROOMSERVICE_SERVICE) private readonly roomServiceService: IRoomserviceService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('roomId');
      if (idParam) {
        this.roomId = +idParam;
        console.log('Room ID:', this.roomId);
      }
    });
    this.loadRoomServices();
  }

  loadRoomServices(): void {
    this.isLoading = true;
    this.error = null;
    
    this.roomServiceService.getByRoomId(this.roomId, this.currentPage, this.pageSize)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (services) => this.roomServices = services,
        error: (err) => this.error = err.message || 'Failed to load room services'
      });
  }

  openEditModal(service: RoomServiceModel) {
    this.selectedService = service;
    this.isEditModalOpen = true;
  }

  handleUpdatedService(updatedService: RoomServiceModel) {
    this.loadRoomServices();
    this.isEditModalOpen = false;
  }

  deleteService(id: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.isLoading = true;
      this.roomServiceService.delete(id)
        .subscribe({
          next: () => {
            this.loadRoomServices(); // Refresh the list
          },
          error: (err) => {
            this.isLoading = false;
            this.error = err.message || 'Failed to delete service';
          }
        });
    }
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
    this.loadRoomServices();
  }

  getUnitName(unit: number): string {
    switch(unit) {
      case 1: return 'Theo phòng';
      case 2: return 'Theo chỉ số';
      case 3: return 'Theo người';
      default: return 'unit';
    }
  }

  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadRoomServices();
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.loadRoomServices();
  }
}
