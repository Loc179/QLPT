import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { HOUSE_SERVICE } from '../../../../constants/injection/injection.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './house-edit.component.html',
  styleUrl: './house-edit.component.css'
})
export class HouseEditComponent {
  public houseForm!: FormGroup;
  private houseId!: number;
  public houseStatuses = [
    { value: 0, display: 'Inactive' },
    { value: 1, display: 'Active' },
    { value: 2, display: 'Under Maintenance' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,
  ) {
    this.houseForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      description: [null],
      totalRooms: [1, [Validators.required, Validators.min(1)]],
      status: [0, Validators.required],
      userId: ['']
    });
  }

  ngOnInit(): void {
    // Get house ID from route parameters
    this.houseId = this.route.snapshot.params['houseId'];
    
    // Get user ID from local storage
    const userInfoString = localStorage.getItem('userInformation');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      const userId = userInfo.id;
      if (userId) {
        this.houseForm.patchValue({ userId });
      }
    }

    // Load house data
    if (this.houseId) {
      this.houseService.getById(this.houseId).subscribe({
        next: (house) => {
          this.houseForm.patchValue(house);
          // Ensure the ID is set in the form
          this.houseForm.patchValue({ id: this.houseId });
        },
        error: (error) => {
          console.error('Error loading house:', error);
          // Handle error (e.g., redirect or show message)
        }
      });
    }
  }

  onSubmit(): void {
    if (this.houseForm.valid && this.houseForm.dirty) {
      this.houseService.update(this.houseId, this.houseForm.value).subscribe({
        next: () => {
          // Redirect back to house list or detail page
          this.router.navigate(['/admin/house/' + this.houseForm.value.userId]);
        },
        error: (error) => {
          console.error('Error updating house:', error);
        }
      });
    }
  }

  onCancel(): void {
    // Navigate back without saving
    this.router.navigate(['/admin/house/' + this.houseForm.value.userId]);
  }

  getStatus(status: number): string {
    const statusObj = this.houseStatuses.find(s => s.value === status);
    return statusObj ? statusObj.display : 'Unknown';
  }
}
