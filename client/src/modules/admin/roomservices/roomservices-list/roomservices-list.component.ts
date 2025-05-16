import { Component, Inject } from '@angular/core';
import { finalize } from 'rxjs';
import { ROOMSERVICE_SERVICE } from '../../../../constants/injection/injection.constant';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IRoomserviceService } from '../../../../services/roomservice/roomservice.service.interface';
import { RoomServiceModel } from '../../../../models/roomservice/roomservice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roomservices-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './roomservices-list.component.html',
  styleUrl: './roomservices-list.component.css'
})
export class RoomservicesListComponent {
  roomServices: RoomServiceModel[] = [];
  roomId!: number;
  isLoading: boolean = false;
  error: string | null = null;

  displayedColumns: string[] = ['name', 'cost', 'unit', 'actions'];

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
    
    this.roomServiceService.getByRoomId(this.roomId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (services) => this.roomServices = services,
        error: (err) => this.error = err.message || 'Failed to load room services'
      });
  }

  editService(service: RoomServiceModel): void {
    // Implement edit logic, perhaps open a dialog
    console.log('Editing service:', service);
    // Example:
    // this.router.navigate(['/room-services/edit', service.id]);
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

  createService(): void {
    
  }

  getUnitName(unit: number): string {
    switch(unit) {
      case 1: return 'month';
      case 2: return 'day';
      case 3: return 'week';
      case 4: return 'year';
      default: return 'unit';
    }
  }
}
