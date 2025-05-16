import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITenantService } from '../../../../services/tenant/tenant.service.interface';
import { TENANT_SERVICE } from '../../../../constants/injection/injection.constant';

@Component({
  selector: 'app-tenant-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-edit.component.html',
  styleUrl: './tenant-edit.component.css'
})
export class TenantEditComponent {
  tenantForm: FormGroup;
  tenantId!: number;
  roomId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(TENANT_SERVICE) private readonly tenantService: ITenantService
  ) {
    this.tenantForm = this.fb.group({
      id: [''],
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      email: ['', Validators.email],
      isRepresentative: [false],
      roomId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tenantId = +params.get('tenantId')!;

      if (this.tenantId) {
        this.loadTenantData(this.tenantId);
      }
    });
  }

  private loadTenantData(tenantId: number): void {
    this.tenantService.getById(tenantId).subscribe({
      next: (tenant) => {
        this.tenantForm.patchValue({
          id: tenant.id,
          fullName: tenant.fullName,
          phoneNumber: tenant.phoneNumber,
          email: tenant.email,
          isRepresentative: tenant.isRepresentative,
          roomId: tenant.roomId
        });
        this.roomId = tenant.roomId;
      },
      error: (err) => {
        console.error('Failed to load tenant data', err);
        // Handle error (redirect or show message)
      }
    });
  }

  onSubmit(): void {
    if (this.tenantForm.valid && this.tenantForm.dirty) {
      this.tenantService.update(this.tenantId, this.tenantForm.value).subscribe({
        next: () => {
          this.router.navigate([`/admin/tenant/room/${this.roomId}`]);
        },
        error: (err) => {
          console.error('Failed to update tenant', err);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate([`/admin/tenant/room/${this.roomId}`]);
  }
}
