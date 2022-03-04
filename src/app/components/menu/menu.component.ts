import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  emailUsuario!: any;
  userId!: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.emailUsuario = window.sessionStorage.getItem('emailUser');
    this.userId = window.sessionStorage.getItem('idToken');
  }

  ngOnInit(): void {
  }

  logout() {
    window.sessionStorage.removeItem('idToken');
    window.sessionStorage.removeItem('emailUser');
    this.userId = null;
    this.emailUsuario = null;
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
