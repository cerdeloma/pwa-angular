import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formDados!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: AppServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formDados = this.fb.group({
      nome: null,
      sobrenome: null
    });
  }

  submitForm() {
    const body = {
      nome: this.formDados.get('nome')?.value,
      sobrenome: this.formDados.get('sobrenome')?.value
    }
    this.appService.postForm(body).subscribe(
      (res: any) => {
        // console.log(res);
        console.log('enviado com sucesso');
        this.formDados.reset();
        this.router.navigate(['listar']);
      }
    );
  }

}
