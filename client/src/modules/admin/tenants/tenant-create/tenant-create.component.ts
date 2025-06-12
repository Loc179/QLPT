import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTH_SERVICE, TENANT_SERVICE } from '../../../../constants/injection/injection.constant';
import { ITenantService } from '../../../../services/tenant/tenant.service.interface';
import { CommonModule } from '@angular/common';
import { IAuthService } from '../../../../services/auth/auth.service.interface';

@Component({
  selector: 'app-tenant-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-create.component.html',
  styleUrl: './tenant-create.component.css'
})
export class TenantCreateComponent {
  tenantForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    @Inject(TENANT_SERVICE) private readonly tenantService: ITenantService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly router: Router
  ) {
    this.tenantForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      email: ['', Validators.email],
      isRepresentative: [false],
      roomId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const roomId = params.get('roomId');
      if (roomId) {
        this.tenantForm.patchValue({ roomId });
      }
    });
  }


  onSubmit(): void {
    if (this.tenantForm.valid) {
      this.tenantService.create(this.tenantForm.value).subscribe({
        next: () => this.router.navigate([`/admin/tenant/room/${this.tenantForm.value.roomId}`]),
        error: (err) => console.error('Failed to create tenant', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['admin/tenant/user', this.authService.getUserId]);
  }
}
