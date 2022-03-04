import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Dexie from 'dexie';
import { EMPTY, of } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppServicesService } from 'src/app/services/app-services.service';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formDados!: FormGroup;
  isEdit!: boolean;
  id!: string;
  tarefa: any;
  contadorId = 0;

  private db!: Dexie;
  private table!: Dexie.Table<any, any>;

  constructor(
    private fb: FormBuilder,
    private appService: AppServicesService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private onlineOfflineService: OnlineOfflineService,
  ) { }

  ngOnInit(): void {
    this.actRoute.params.pipe(
      mergeMap(params => !!params.id ? of(params.id) : EMPTY),
      tap((res: any) => {
        this.id = res;
        this.isEdit = true;
        // this.isLoading = true;
      }),
      switchMap(id => this.appService.getDataById(id))
    ).subscribe((res: any) => {
        this.tarefa = res;
        this.editForm(JSON.parse(JSON.stringify(this.tarefa)))
      }
    );

    this.formDados = this.fb.group({
      id: null,
      data: null,
      tarefa: null
    });
  }

  editForm(tarefa: any) {
    this.formDados.patchValue({
      id: this.id,
      data: tarefa.data,
      tarefa: tarefa.tarefa
    })
  }

  submitForm() {
    const body = {
      id: (Math.random() * (100 - 10) + 0),
      data: this.formDados.get('data')?.value,
      tarefa: this.formDados.get('tarefa')?.value
    }

    const tarefa = {
      data: this.formDados.get('data')?.value,
      tarefa: this.formDados.get('tarefa')?.value
    }

    if (this.isEdit) {
      this.appService.editData(this.id, tarefa).subscribe(
        () => {
          console.log('editado com sucesso');
          this.formDados.reset();
          this.router.navigate(['listar']);
        }
      );
    } else if (!this.isEdit && this.onlineOfflineService.isOnline) {
      this.appService.postForm(body).subscribe(
        () => {
          console.log('enviado com sucesso');
          this.formDados.reset();
          this.router.navigate(['listar']);
        }
      );
    } else {
      this.appService.salvarIndexedDb(body);
      this.formDados.reset();
      alert('enviado para banco de dados local');
    }
  }

  retornar() {
    this.router.navigate(['']);
  }

}
