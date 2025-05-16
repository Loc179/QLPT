import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROOMSERVICE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IRoomserviceService } from '../../../../services/roomservice/roomservice.service.interface';
import { RoomServiceModel } from '../../../../models/roomservice/roomservice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roomservices-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roomservices-create.component.html',
  styleUrl: './roomservices-create.component.css'
})
export class RoomservicesCreateComponent {
  roomServiceForm: FormGroup;
  roomId!: number;
  isLoading = false;
  error: string | null = null;

  // Unit options for dropdown
  unitOptions = [
    { value: 1, label: 'Theo phòng' },
    { value: 2, label: 'Theo chỉ số' },
    { value: 3, label: 'Theo người' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(ROOMSERVICE_SERVICE) private readonly roomServiceService: IRoomserviceService,
  ) {
    this.roomServiceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      cost: ['', [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('roomId');
      if (idParam) {
        this.roomId = +idParam;
        console.log('Room ID:', this.roomId);
      }
    });
  }

  onSubmit(): void {
    if (this.roomServiceForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const newService: RoomServiceModel = {
      ...this.roomServiceForm.value,
      createdAt: new Date(),
      roomId: this.roomId,
    };

    this.roomServiceService.create(newService).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/admin/roomservice/' + this.roomId]);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.message || 'Failed to create room service';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/roomservice/' + this.roomId]);
  }
}
