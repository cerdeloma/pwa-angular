import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      () => {console.log('enviado com sucesso')}
    );
    console.log(this.formDados.value);
  }

}
