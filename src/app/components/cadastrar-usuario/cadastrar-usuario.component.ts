import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {

  usuario = {
    email: '',
    senha: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  cadastrar() {
    this.authService.cadastrar(this.usuario.email, this.usuario.senha).then(
      () => {
        this.router.navigate(['login']);
      }
    );
  }

  voltar() {
    this.router.navigate(['login']);
  }

}
