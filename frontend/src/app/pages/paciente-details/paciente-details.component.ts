import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalAnotacaoComponent } from 'src/app/shared/components/modal-anotacao/modal-anotacao.component';
import { ModalTarefaComponent } from 'src/app/shared/components/modal-tarefa/modal-tarefa.component';
import { PacientesService } from 'src/app/shared/services/pacientes.service';

@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.component.html',
  styleUrls: ['./paciente-details.component.scss']
})
export class PacienteDetailsComponent implements OnInit, OnDestroy {

  routeIdSubscription!: Subscription;
  userId!: number;
  userType = '';
  paciente!: any;
  anotacoesRefresh = new Subject<any>();
  tarefasRefresh = new Subject<any>();


  constructor(private route: ActivatedRoute, private pacientesService: PacientesService, private authService: AuthService, public dialog: MatDialog) {
    this.userType = this.authService.userType.getValue();

    if(this.userType === 'psicologo') {
      this.routeIdSubscription = this.route.params.subscribe((params) => {
        if(params['id']) {
          this.userId = Number(params['id']);
          this.pacientesService.getPacienteById(this.userId).subscribe((val) => {
            this.paciente = val;
          })
        }
      });
    }
  
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.routeIdSubscription) {
      this.routeIdSubscription.unsubscribe();
    }
  }

  openAnotacaoModal() {
    let config: MatDialogConfig = {
      minWidth: '50vw',
      data: { paciente: this.paciente }
    }

    const dialogRef = this.dialog.open(ModalAnotacaoComponent, config);

    dialogRef.afterClosed().subscribe(val => {
      this.anotacoesRefresh.next(true);
    });

  }

  openTarefaModal() {
    let config: MatDialogConfig = {
      minWidth: '50vw',
      data: { paciente: this.paciente }
    }

    const dialogRef = this.dialog.open(ModalTarefaComponent, config);

    dialogRef.afterClosed().subscribe(val => {
      this.tarefasRefresh.next(true);
    });

  }

}
