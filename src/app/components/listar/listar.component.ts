import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { NomeSobrenome } from 'src/app/models/Nome-Sobrenome';
import { AppServicesService } from 'src/app/services/app-services.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  dados: any;

  constructor(private appService: AppServicesService) { }

  ngOnInit(): void {
    this.appService.getData().pipe(
      tap(y => y),
      map(x => (Object as any).values(x))
    ).subscribe(
      (res: any) => {
        // console.log(res);
        this.dados = res;
      }
    )
  }

  onDelete(i?: any) {
    this.appService.deleteData(i).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }

  onEdit() {

  }

}
