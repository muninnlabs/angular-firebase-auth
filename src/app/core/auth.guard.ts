import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const AuthGuard = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('canActivate', authService.currentUserSig());
  if (authService.currentUserSig()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
