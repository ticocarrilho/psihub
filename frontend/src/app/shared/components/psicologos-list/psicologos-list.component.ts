import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalAgendamentoComponent } from '../modal-agendamento/modal-agendamento.component';
import { PsicologoListService } from './psicologo-list.service';

@Component({
  selector: 'app-psicologos-list',
  templateUrl: './psicologos-list.component.html',
  styleUrls: ['./psicologos-list.component.scss']
})
export class PsicologosListComponent implements OnInit {

  loading = false;
  psicologos: any = [];
  currentPage = 1;
  totalPages = 0;
  throttle = 0;
  distance = 2;
  isLoggedIn = new Observable<boolean>();

  constructor(private psicologoListService: PsicologoListService, private toastr: ToastrService, public dialog: MatDialog, private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn.asObservable();
    this.getPsicologos();
  }

  getPsicologos() {
    this.loading = true;
    this.psicologoListService.getPsicologos(this.currentPage)
      .subscribe({
        next: (data: any) => {
          this.totalPages = Math.ceil(data.count/10)
          this.psicologos = data.rows.map((psicologo: any) => {
            let binary = '';
            let bytes = new Uint8Array(psicologo.imagem.data);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
               binary += String.fromCharCode(bytes[i]);
            }
            return {
              ...psicologo,
              imagem: this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + window.btoa(binary))
            }
          });
        },
        error: () => {
          this.toastr.error('Não foi possível carregar os psicólogos.');
        }
      }).add(() => this.loading = false);
  }

  onScroll() {
    this.currentPage++;
    this.psicologoListService.getPsicologos(this.currentPage)
      .subscribe({
        next: (data: any) => {
          this.psicologos.push(...data.rows);
        },
        error: () => {
          this.toastr.error('Não foi possível carregar os psicólogos.')
        }
      });
  }

  openAgendamentoModal(id: number, nome: string, comecoAtendimento: string, finalAtendimento: string) {
    let config: MatDialogConfig = {
      minWidth: '50vw',
      data: { psicologoId: id, psicologoNome: nome, comecoAtendimento, finalAtendimento }
    }

    const dialogRef = this.dialog.open(ModalAgendamentoComponent, config);

  }

}
