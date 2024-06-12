import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    console.log(this.registerForm.getRawValue());
    const rawFormValue = this.registerForm.getRawValue();
    this.authService
      .register(
        rawFormValue.username,
        rawFormValue.email.trim(),
        rawFormValue.password
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => (this.errorMessage = error.message),
      });
  }
}
