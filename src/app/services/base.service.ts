import { OnlineOfflineService } from 'src/app/services/online-offline.service';
import { HttpClient } from '@angular/common/http';
import { Dexie } from 'dexie';
import { Inject, Injectable, Injector } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends {id: any}> {

  private db!: Dexie;
  private table!: Dexie.Table<T, any>;

  protected http!: HttpClient;
  protected onlineOfflineService!: OnlineOfflineService;
  protected angularFireDb!: AngularFireDatabase;


  constructor(
    // injeta os serviços no construtor via injector
    protected injector: Injector,
    @Inject(String) protected nomeTabela: string,
    @Inject(String) protected apiDb: string,
    @Inject(String) protected urlApi: string,
  ) {
    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);
    this.angularFireDb = this.injector.get(AngularFireDatabase);
    this.ouvirStatusConexao();
    this.iniciarIndexedDb();
  }

  iniciarIndexedDb() {
    this.db = new Dexie('db-local');
    this.db.version(1).stores({
      [this.nomeTabela]: 'id'
    });
    this.table = this.db.table(this.nomeTabela);
  }

  insert(tabela: any) {
    this.angularFireDb.list('tabela').push(tabela).then(
      (result: any) => {
        console.log(result);
      }
    );
  }

  update(tabela: any, key: string) {
    this.angularFireDb.list(this.apiDb).update(key, tabela);
  }

  getAll() {
    return this.angularFireDb.list(this.apiDb)
    .snapshotChanges()
    .pipe(
      tap(x => x.reverse()),
      map((changes: any) => {
        return changes.map((data: any) => ({key: data.payload.key, ...data.payload.val() as any}))
      })
    )
  }

  delete(key: string) {
    this.angularFireDb.object(`tabela/${key}`).remove();
  }

  public async salvarIndexedDb(tabela: any) {
    try {
      await this.table.add(tabela);
      // const todasTarefas = await this.table.toArray();
      // console.log('seguro foi salvo com indexedDb', todasTarefas);
    } catch (error) {
      console.log('erro ao cadastrar tarefa no indexedDb', error);
    }
  }

  private async enviarIndexedDbParaApi() {
    const todosDados = await this.table.toArray();
    for (const dado of todosDados) {
      this.postForm(dado).subscribe();
      await this.table.delete(dado?.id);
      // console.log(`Seguro com o id ${tarefa?.id} foi excluido com sucesso`)
    }
  }

  postForm(tabela: any) {
    return this.http.post(`${this.urlApi}`, tabela);
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
