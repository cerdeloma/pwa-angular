import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit() {
    const script = document.createElement('script');
    script.src = 'http://localhost:3000/rodape/main.js';
    document.body.appendChild(script);
  }

}
