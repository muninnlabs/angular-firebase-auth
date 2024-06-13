import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  private auth = inject(Auth);
  router = inject(Router);

  public loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  ngOnInit() {}

  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
    // this.authService.loginWithGoogle();
  }

  onSubmit() {
    const rawFormValue = this.loginForm.getRawValue();
    this.authService
      .login(rawFormValue.email, rawFormValue.password)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => (this.errorMessage = error.message),
      });
  }
}
