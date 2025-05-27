import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAuthService } from '../../../services/auth/auth.service.interface';
import { AUTH_SERVICE } from '../../../constants/injection/injection.constant';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../../models/auth/login-request.model';
import { HeaderComponent } from "../../public/home/header/header.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password, rememberMe  } = this.loginForm.value;
    const loginRequest: LoginRequest = {
      username: username,
      password: password
    };
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(loginRequest, rememberMe).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if(res.userInfo.roles[0] === 'User')
        {
          this.router.navigate(['/admin/dashboard']); // điều hướng về trang chủ hoặc dashboard
        }

        if(res.userInfo.roles[0] === 'Admin')
        {
          this.router.navigate(['/webadmin/home']);
        }
        
      },
      error: err => {
        this.isSubmitting = false;
        this.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
        console.error('Login error', err);
      }
    });
  }
}
