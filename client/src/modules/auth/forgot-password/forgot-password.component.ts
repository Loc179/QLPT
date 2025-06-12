import { Component, Inject } from '@angular/core';
import { AUTH_SERVICE } from '../../../constants/injection/injection.constant';
import { IAuthService } from '../../../services/auth/auth.service.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  public forgetPasswordForm!: FormGroup;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.invalid) {
      this.toastr.warning("Please enter a valid email address.", "Warning");
      return;
    }

    const requestData = { email: this.forgetPasswordForm.value.email };
    this.authService.forgotPassword(requestData).subscribe({
      next: () => {
        this.toastr.success("A password reset link has been sent to your email.", "Success");
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: () => {
        this.toastr.error("Failed to send password reset email. Please try again.", "Error");
      }
    });
  }
}
