import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth } from '@firebase/auth';
import { FirebaseApp } from '@angular/fire/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebase: AngularFireAuth
    ) {
      this.authService.obterUsuarioLogado().subscribe(
        (res: any) => {
          if (res?.uid) {
            this.user = true;
          } else {
            this.user = false;
          }
        }
      )
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.user === true) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
}
