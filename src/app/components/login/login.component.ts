import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = {
    email: '',
    senha: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logar() {
    const {email, senha} = this.usuario;
    this.authService.login(email, senha);
  }

  entrarComGoogle() {
    const {email, senha} = this.usuario;
    this.authService.loginWithGoogle(email, senha)
    .then(() => {
      window.location.reload();
      this.router.navigate(['home']);
    });
  }

}
