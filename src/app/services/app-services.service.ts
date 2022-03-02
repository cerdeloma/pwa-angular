import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Dexie from 'dexie';
import { map, tap } from 'rxjs/operators';
import { Contato } from '../models/contato';
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
    private onlineOfflineService: OnlineOfflineService,
    private angularFireDb: AngularFireDatabase
    ) {
      this.ouvirStatusConexao();
      this.iniciarIndexedDb();
    }

  insert(contato: Contato) {
    this.angularFireDb.list('contato').push(contato).then(
      (result: any) => {
        console.log(result);
      }
    );
  }

  update(contato: Contato, key: string) {
    this.angularFireDb.list('contato').update(key, contato);
  }

  getAll() {
    return this.angularFireDb.list('contato')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(data => ({key: data.payload.key, ...data.payload.val() as any}))
      })
    )
  }

  delete(key: string) {
    this.angularFireDb.object(`contato/${key}`).remove();
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
      (online: any) => {
        if (online) {
          this.enviarIndexedDbParaApi();
        } else {
          console.log('estou offline');
        }
      }
    );
  }

}
