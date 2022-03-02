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
  key: any;

  constructor(private appService: AppServicesService) { }

  ngOnInit(): void {
    this.appService.getData().pipe(
      tap(x => {
        this.key = Object.keys(x)
      })
    ).subscribe(
      (res: any) => {
        this.dados = Object.values(res);
        console.log(this.key);
      }
    )
    // .pipe(
    //   map(x => (Object as any).values(x)),
    // ).subscribe(
    //   (res: any) => {
    //     // console.log(res);
    //     this.dados = res;
    //   }
    // )
  }

  onDelete(key?: any) {
    this.appService.deleteData(key).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }

  onEdit() {

  }

}
