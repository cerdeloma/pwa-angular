import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
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
    this.dados$ = this.appService.getAll();
  }

  onDelete(key?: any) {
    this.appService.deleteData(key).subscribe(
      () => window.location.reload()
    );
  }

  onEdit(key?: any) {
    this.router.navigate(['edit', key]);
  }

  ouvirStatusConexao() {
    this.onlineOfflineService.statusConexao.subscribe(
      (online: any) => {
        if (online) {
          this.isOnline = true;
        } else {
          this.isOnline = false;
        }
      }
    );
  }

}
