import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  private API = 'https://pwa-angular-e6732-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  postForm(body: any) {
    return this.http.post(`${this.API}contato.json`, body);
  }

  getData() {
    return this.http.get(`${this.API}contato.json`);
  }

  getDataById(id: any) {
    return this.http.get(`${this.API}contato/${id}.json`)
  }

  deleteData(id: any) {
    return this.http.delete(`${this.API}contato/${id}.json`);
  }

  editData(id: any, body: any) {
    return this.http.patch(`${this.API}contato/${id}.json`, body);
  }
}
