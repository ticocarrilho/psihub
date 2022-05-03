import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalContratoComponent } from 'src/app/shared/components/modal-contrato/modal-contrato.component';
import { AgendamentoService } from 'src/app/shared/services/agendamento.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit, OnDestroy {
  sessionUUID!: string;
  paciente: any;
  psicologo: any;
  hasContrato = true;
  userType: string;
  routeIdSubscription: Subscription;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private agendamentoService: AgendamentoService, private authService: AuthService) {
    this.userType = this.authService.userType.getValue();

    this.routeIdSubscription = this.route.params.subscribe((params) => {
      this.agendamentoService.getConsultaById(params['id']).subscribe({
        next: (val) => {
          this.paciente = val.paciente;
          this.hasContrato = this.paciente.contrato !== null;
          this.psicologo = val.psicologo;
          this.sessionUUID = val.uuid;
        }
      });
   });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routeIdSubscription.unsubscribe();
  }

  openContratoModal() {
    let config: MatDialogConfig = {
      minWidth: '50vw',
      data: { paciente: this.paciente, psicologo: this.psicologo, uuid: this.sessionUUID }
    }

    const dialogRef = this.dialog.open(ModalContratoComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      this.hasContrato = result;
    });

  }

}
