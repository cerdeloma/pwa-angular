import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsloggedGuard implements CanActivate {

  user!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.obterUsuarioLogado().subscribe(
      (res: any) => {
        if (res.uid) {
          console.log(res);
          this.user = true;
        } else {
          this.user = false;
        }
      }
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.user === true) {
        this.router.navigate(['home']);
        return false;
      }
      return true;
  }

}
