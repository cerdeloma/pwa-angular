import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppServicesService } from 'src/app/services/app-services.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formDados!: FormGroup;
  isEdit!: boolean;
  id!: string;
  contato: any;

  constructor(
    private fb: FormBuilder,
    private appService: AppServicesService,
    private router: Router,
    private actRoute: ActivatedRoute
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
        this.contato = res;
        this.editForm(JSON.parse(JSON.stringify(this.contato)))
      }
    );

    this.formDados = this.fb.group({
      nome: null,
      sobrenome: null
    });
  }

  editForm(contato: any) {
    this.formDados.patchValue({
      nome: contato.nome,
      sobrenome: contato.sobrenome
    })
  }

  submitForm() {
    const body = {
      nome: this.formDados.get('nome')?.value,
      sobrenome: this.formDados.get('sobrenome')?.value
    }

    if (this.isEdit) {
      this.appService.editData(this.id, body).subscribe(
        () => {
          console.log('editado com sucesso');
          this.formDados.reset();
          this.router.navigate(['listar']);
        }
      );
    } else {
      this.appService.postForm(body).subscribe(
        () => {
          console.log('enviado com sucesso');
          this.formDados.reset();
          this.router.navigate(['listar']);
        }
      );
    }
  }

}
