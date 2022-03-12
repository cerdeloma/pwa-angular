import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService) {
    this.authService.obterUsuarioLogado();
  }

  ngOnInit() {
    const script = document.createElement('script');
    script.src = 'https://frog-footer-mfe.web.app/main.js';
    document.body.appendChild(script);
  }

}
