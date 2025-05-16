import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HOUSE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IHouseService } from '../../../../services/house/house.service.interface';

@Component({
  selector: 'app-house-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './house-create.component.html',
  styleUrl: './house-create.component.css'
})
export class HouseCreateComponent {
  public houseForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,
  ) {
    this.houseForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      description: [null],
      totalRooms: [1, [Validators.required, Validators.min(1)]],
      status: [1, Validators.required],
      userId: ['']
    });
  }

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInformation');
    
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      const userId = userInfo.id;
      if (userId) {
        this.houseForm.patchValue({ userId });
      }
    }
  }


  onSubmit(): void {
    if (this.houseForm.valid) {
      this.houseService.create(this.houseForm.value).subscribe({
        next: () => this.router.navigate(['/admin/house/' + this.houseForm.value.userId]),
        error: (error) => {
          console.error('Error creating house:', error);
        }
      });
    }
  }

  onCancel(): void {
    console.log('Form cancelled');
    // Có thể reset form hoặc điều hướng
    this.houseForm.reset();
  }

}
