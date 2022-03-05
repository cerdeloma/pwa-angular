import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
    ) {
    this.authService.obterUsuarioLogado();
    setTimeout(() => {
      window.location.reload();
    }, 10);
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
  }

}
