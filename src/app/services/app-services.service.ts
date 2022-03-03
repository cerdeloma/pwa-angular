import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import Dexie from 'dexie';
import { map, tap } from 'rxjs/operators';
import { Contato } from '../models/contato';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService extends BaseService<Contato> {

  private API = 'https://pwa-angular-e6732-default-rtdb.firebaseio.com/';

  constructor(
    protected injector: Injector
  ) {
    super(injector, 'contato', 'contato', 'https://pwa-angular-e6732-default-rtdb.firebaseio.com/');
  }

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
