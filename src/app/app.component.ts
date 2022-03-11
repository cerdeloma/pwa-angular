import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit() {
    const script = document.createElement('script');
    script.src = 'https://pwa-angular-e6732.web.app/rodape/main.js';
    document.body.appendChild(script);
  }

}
