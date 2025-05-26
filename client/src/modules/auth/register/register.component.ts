import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../models/auth/register-request.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AUTH_SERVICE } from '../../../constants/injection/injection.constant';
import { IAuthService } from '../../../services/auth/auth.service.interface';
import { HeaderComponent } from "../../public/home/header/header.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      email: ['', [Validators.required, Validators.email]],
      servicePackageId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request = new RegisterRequest();
    request.username = this.registerForm.value.username;
    request.password = this.registerForm.value.password;
    request.fullName = this.registerForm.value.fullName;
    request.phoneNumber = this.registerForm.value.phoneNumber;
    request.email = this.registerForm.value.email;
    request.servicePackageId = Number(this.registerForm.value.servicePackageId);

    console.log('Request:', request);

    // TODO: Gọi API đăng ký ở đây
    this.authService.register(request).subscribe({
      next: (response) => {
        console.log("paymentUrl:", response.paymentUrl);
        window.location.href = response.paymentUrl;
        // this.authService.vnpayReturn(this.route.snapshot.queryParams).subscribe({
        //   next: (result) => {
        //     console.log('Xác nhận thanh toán thành công', result);
        //     this.router.navigate(['/login']);
        //   },
        //   error: (err) => {
        //     console.error('Thanh toán thất bại', err);
        //   }
        // });
        
      },
      error: (error) => {
        console.error('Đăng ký thất bại:', error);
      }
    });
  }
}

