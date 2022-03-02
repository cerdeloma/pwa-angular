import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NomeSobrenome } from 'src/app/models/Nome-Sobrenome';
import { AppServicesService } from 'src/app/services/app-services.service';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  dados: any;
  key: any;
  isEmpty = false;
  isLoading!: boolean;
  isOnline: boolean = this.onlineOfflineService.isOnline;

  constructor(
    private appService: AppServicesService,
    private router: Router,
    private onlineOfflineService: OnlineOfflineService
    ) { }

  ngOnInit(): void {
    this.getAll();
  }
  
  getAll() {
    this.isLoading = true;
    this.appService.getData().subscribe(
        (res: any) => {
          if (res) {
            this.key = Object.keys(res)
            this.dados = Object.values(res);
          } else {
            this.isEmpty = true;
          }

          this.isLoading = false;
      }
    );
  }

  onDelete(key?: any) {
    this.appService.deleteData(key).subscribe(
      () => window.location.reload()
    );
  }

  onEdit(key?: any, body?: any) {
    this.router.navigate(['edit', key]);
  }

}
