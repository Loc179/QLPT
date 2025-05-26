import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomServiceModel } from '../../../../models/roomservice/roomservice.model';
import { ROOMSERVICE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IRoomserviceService } from '../../../../services/roomservice/roomservice.service.interface';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roomservices-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roomservices-edit.component.html',
  styleUrl: './roomservices-edit.component.css'
})
export class RoomservicesEditComponent {
  roomServiceForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  @Input() serviceToEdit!: RoomServiceModel | null;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<RoomServiceModel>();

  unitOptions = [
    { value: 1, label: 'Theo phòng' },
    { value: 2, label: 'Theo chỉ số' },
    { value: 3, label: 'Theo người' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    @Inject(ROOMSERVICE_SERVICE) private readonly roomServiceService: IRoomserviceService,

  ) {
    this.roomServiceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      cost: ['', [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serviceToEdit'] && this.serviceToEdit) {
      this.roomServiceForm.patchValue({
        name: this.serviceToEdit.name,
        cost: this.serviceToEdit.cost,
        unit: this.serviceToEdit.unit,
      });
    }
  }

  onSubmit(): void {
    if (this.roomServiceForm.invalid || !this.serviceToEdit) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const updatedService: RoomServiceModel = {
      ...this.serviceToEdit,
      ...this.roomServiceForm.value,
      updatedAt: new Date(),
    };

    this.roomServiceService.update(updatedService.id,updatedService).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Cập nhật dịch vụ phòng thành công');
        this.updated.emit(updatedService);
        this.close.emit();
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('Cập nhật dịch vụ phòng thất bại');
        this.error = err.message || 'Failed to update room service';
      }
    });
  }

  onCancel(): void {
    this.close.emit();
  }
}
