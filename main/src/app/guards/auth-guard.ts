import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = Inject(Router);
  const token = localStorage.getItem("userId");

  if(token){
    return true;
  }

  router.navigate(['/inicioSesion']);
  return false;
};
