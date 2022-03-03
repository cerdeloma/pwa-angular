import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Contato } from 'src/app/models/contato';
import { AppServicesService } from 'src/app/services/app-services.service';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  dados$!: Observable<any>;
  key: any;
  isOnline!: boolean;

  constructor(
    private appService: AppServicesService,
    private router: Router,
    private onlineOfflineService: OnlineOfflineService
    ) {
    }

    ngOnInit(): void {
      this.getAll();
      this.ouvirStatusConexao();
      this.onlineOfflineService.atualizaStatusConexao();
  }

  getAll() {
    // this.isLoading = true;
    this.dados$ = this.appService.getAll();
    // this.isLoading = true;
    // this.appService.getData().subscribe(
    //     (res: any) => {
    //       if (res) {
    //         this.key = Object.keys(res)
    //         this.dados = Object.values(res);
    //       } else {
    //         this.isEmpty = true;
    //       }

    //       this.isLoading = false;
    //   }
    // );
  }

  onDelete(key?: any) {
    this.appService.deleteData(key).subscribe(
      () => window.location.reload()
    );
  }

  onEdit(key?: any, body?: any) {
    this.router.navigate(['edit', key]);
  }

  ouvirStatusConexao() {
    this.onlineOfflineService.statusConexao.subscribe(
      (online: any) => {
        console.log(online);
        if (online) {
          this.isOnline = true;
        } else {
          this.isOnline = false;
        }
      }
    );
  }

}
