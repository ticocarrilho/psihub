import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { AgendamentoService } from '../../services/agendamento.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalAgendamentoComponent } from '../modal-agendamento/modal-agendamento.component';
import { Observable, Subject, Subscription, timer } from 'rxjs';
const moment = _moment;

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.scss']
})
export class ConsultaListComponent implements OnInit, OnDestroy {

  @Input() scrollDisabled = false;
  loading = false;
  currentPage = 1;
  totalPages = 0;
  throttle = 0;
  distance = 2;
  consultas: any[] = [];
  userType = '';
  loadingArray: boolean[] = [];

  showHistorico: FormControl = new FormControl(false);
  orderBy: FormControl = new FormControl('startDate');

  nowMoment: Moment = moment();
  timer: Observable<number>;
  timerSubscription: Subscription;

  constructor(private agendamentoService: AgendamentoService, private toastr: ToastrService, public dialog: MatDialog, private authService: AuthService) {
    this.showHistorico.valueChanges.subscribe((value) => {
      this.consultas = [];
      this.currentPage = 1;
      this.totalPages = 0;
      this.getConsultas();
    });

    this.orderBy.valueChanges.subscribe((value) => {
      this.consultas = [];
      this.currentPage = 1;
      this.totalPages = 0;
      this.getConsultas();
    });

    this.timer = timer(1000, 10000);
    this.timerSubscription = this.timer.subscribe((val) => {
      this.nowMoment = moment();
    });
  }

  ngOnInit(): void {
    this.userType = this.authService.userType.getValue();
    this.getConsultas();
  }

  ngOnDestroy(): void {
      this.timerSubscription.unsubscribe();
  }

  isSessionTime(consulta: any) {
    if(!consulta.psicologoConfirmado || !consulta.pacienteConfirmado) {
      return false;
    } else if(this.nowMoment.isBetween(moment(consulta.startDate), moment(consulta.endDate), undefined, '[)')) {
      return true;
    }
    return false;
  }

  getConsultas() {
    this.loading = true;
    this.agendamentoService.getConsultas(this.currentPage, this.userType, this.showHistorico.value, this.orderBy.value)
      .subscribe({
        next: (data) => {
          this.totalPages = Math.ceil(data.count/10)
          this.consultas = data.rows;
        },
        error: (err) => {
          this.toastr.error('Não foi carregar as consultas.')
        }
      }).add(() => this.loading = false);
  }

  onScroll() {
    this.currentPage++;
    this.agendamentoService.getConsultas(this.currentPage, this.authService.userType.getValue(), this.showHistorico.value, this.orderBy.value)
      .subscribe({
        next: (data: any) => {
          this.consultas.push(...data.rows);
        },
        error: () => {
          this.toastr.error('Não foi possível carregar as consultas.')
        }
      });
  }

  getStatus(consulta: any) {
    if(consulta.pacienteConfirmado && consulta.psicologoConfirmado) {
      return 'Confirmada';
    } else if(!consulta.psicologoConfirmado && !consulta.pacienteConfirmado) {
      return 'Não confirmada pelo Paciente e Psicólogo';
    } else if(!consulta.psicologoConfirmado) {
      return 'Não confirmada pelo Psicólogo';
    } else if(!consulta.pacienteConfirmado) {
      return 'Não confirmada pelo Paciente';
    }
    return '';
  }

  cancelConsulta(body: any, index: number) {
    this.loadingArray[body.id] = true;

    this.agendamentoService.updateConsulta(body.id, {
      ...body,
      ...(this.userType === 'paciente' && {
        pacienteConfirmado: false
      }),
      ...(this.userType === 'psicologo' && {
        psicologoConfirmado: false
      })
    }).subscribe({
      next: (data: any) => {
        this.consultas[index] = {
          ...this.consultas[index],
          ...(this.userType === 'paciente' && {
            pacienteConfirmado: false
          }),
          ...(this.userType === 'psicologo' && {
            psicologoConfirmado: false
          })
        };
        this.toastr.success('A consulta foi cancelada com sucesso.');
      },
      error: () => {
        this.toastr.error('Não foi possível cancelar a consulta.');
      }
    }).add(() => this.loadingArray[body.id] = false);
  }

  confirmConsulta(body: any, index: number) {
    this.loadingArray[body.id] = true;

    this.agendamentoService.updateConsulta(body.id, {
      ...body,
      ...(this.userType === 'paciente' && {
        pacienteConfirmado: true
      }),
      ...(this.userType === 'psicologo' && {
        psicologoConfirmado: true
      })
    }).subscribe({
      next: (data: any) => {
        this.consultas[index] = {
          ...this.consultas[index],
          ...(this.userType === 'paciente' && {
            pacienteConfirmado: true
          }),
          ...(this.userType === 'psicologo' && {
            psicologoConfirmado: true
          })
        };
        this.toastr.success('A consulta foi confirmada com sucesso.');
      },
      error: () => {
        this.toastr.error('Não foi possível confirmar a consulta.');
      }
    }).add(() => this.loadingArray[body.id] = false);
  }

  openAgendamentoModal(consulta: any, index: number) {
    const updateSubject = new Subject<any>();
    let config: MatDialogConfig = {
      minWidth: '50vw',
      data: { consulta, updateSubject, userType: this.userType, psicologoId: consulta.psicologo.id, psicologoNome: consulta.psicologo.usuario.nome, comecoAtendimento: consulta.psicologo.comecoAtendimento, finalAtendimento: consulta.psicologo.finalAtendimento }
    }

    const dialogRef = this.dialog.open(ModalAgendamentoComponent, config);

    updateSubject.subscribe((updated: any) => {
      this.consultas[index] = {
        ...this.consultas[index],
        ...updated
      }
    })

  }

}
