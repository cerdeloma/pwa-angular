import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { map, tap } from 'rxjs/operators';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  private API = 'https://pwa-angular-e6732-default-rtdb.firebaseio.com/';
  private db!: Dexie;
  private table!: Dexie.Table<any, any>;

  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService
    ) {
      this.ouvirStatusConexao();
      this.iniciarIndexedDb();
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

  private iniciarIndexedDb(){
    this.db = new Dexie('db-contato');
    this.db.version(1).stores({
      contato: 'id'
    });
    this.table = this.db.table('contato');
  }

  public async salvarIndexedDb(body: any) {
    try {
      await this.table.add(body);
      // const todosContatos = await this.table.toArray();
      // console.log('seguro foi salvo com indexedDb', todosContatos);
    } catch (error) {
      console.log('erro ao cadastrar contato no indexedDb', error);
    }
  }

  private async enviarIndexedDbParaApi() {
    const todosContatos = await this.table.toArray();
    for (const contato of todosContatos) {
      this.postForm(contato).subscribe();
      await this.table.delete(contato?.id);
      // console.log(`Seguro com o id ${contato?.id} foi excluido com sucesso`)
    }
  }

  private ouvirStatusConexao() {
    this.onlineOfflineService.statusConexao.subscribe(
      (online) => {
        if (online) {
          this.enviarIndexedDbParaApi();
        } else {
          console.log('estou offline');
        }
      }
    );
  }

}
