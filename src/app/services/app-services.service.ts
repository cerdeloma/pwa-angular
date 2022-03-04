import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import Dexie from 'dexie';
import { map, tap } from 'rxjs/operators';
import { Tarefas } from '../models/tarefas';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService extends BaseService<Tarefas> {

  private API = 'https://pwa-angular-e6732-default-rtdb.firebaseio.com/';

  constructor(
    protected injector: Injector
  ) {
    super(injector, 'tarefa', 'tarefa', 'https://pwa-angular-e6732-default-rtdb.firebaseio.com/');
  }

  postForm(body: any) {
    return this.http.post(`${this.API}tarefa.json`, body);
  }

  getData() {
    return this.http.get(`${this.API}tarefa.json`);
  }

  getDataById(id: any) {
    return this.http.get(`${this.API}tarefa/${id}.json`)
  }

  deleteData(id: any) {
    return this.http.delete(`${this.API}tarefa/${id}.json`);
  }

  editData(id: any, body: any) {
    return this.http.patch(`${this.API}tarefa/${id}.json`, body);
  }


}
