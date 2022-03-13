import { SessionStorageService } from './../../services/session-storage/session-storage.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  emailUsuario: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ss: SessionStorageService
  ) {
  }

  ngOnInit(): void {
    this.emailUsuario = this.ss.getToSession('email');
  }

  logout() {
    this.authService.logout();
  }

}
