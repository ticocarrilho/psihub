import { Component, Inject, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AgendamentoService } from '../../services/agendamento.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Subject } from 'rxjs';
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface agendamentoModalData {
  consulta?: any,
  updateSubject?: Subject<any>,
  userType?: string,
  psicologoId: number,
  psicologoNome: string,
  comecoAtendimento: string,
  finalAtendimento: string
}

@Component({
  selector: 'app-modal-agendamento',
  templateUrl: './modal-agendamento.component.html',
  styleUrls: ['./modal-agendamento.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ModalAgendamentoComponent implements OnInit {

  loading = false;
  datasAgendamentos = [];
  minDate: Moment;
  agendamentoForm: FormGroup;
  horarios: string[] = [];

  inicioAtendimento!: Moment;
  finalAtendimento!: Moment;
  qntHorasAtendimento!: number;

  dateFilter = (date: Moment | null): boolean => { return true; }

  constructor(private agendamentoService: AgendamentoService, private fb: FormBuilder, public dialogRef: MatDialogRef<ModalAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: agendamentoModalData, private toastr: ToastrService) {
      const currentDate = this.modalData?.consulta?.startDate || '';

      this.minDate = moment();

      this.agendamentoForm = this.fb.group({
        date: [currentDate, Validators.required],
        hour: ["", Validators.required]
      });
    }

  ngOnInit(): void {
    this.loading = true;

    this.inicioAtendimento = moment().set({ 'hour': Number(this.modalData.comecoAtendimento.split(':')[0]), 'minute': Number(this.modalData.comecoAtendimento.split(':')[1]) });
    this.finalAtendimento = moment().set({ 'hour': Number(this.modalData.finalAtendimento.split(':')[0]), 'minute': Number(this.modalData.finalAtendimento.split(':')[1]) });

    this.qntHorasAtendimento = this.finalAtendimento.diff(this.inicioAtendimento, 'hours');

    this.agendamentoService.getConsultasPsicologo(this.modalData.psicologoId, true)
      .subscribe({
        next: (data) => {
          this.datasAgendamentos = data.rows;
          this.dateFilter = this.filterDatesAgendamento;

          if(this.modalData.consulta) {
            this.selectedDateChange(this.agendamentoForm.get('date')?.value);
          }
        },
        error: () => {
          this.toastr.error('Não foi possível carregar a agenda do psicólogo.')
        }
      }).add(() => this.loading = false);
  }

  filterDatesAgendamento = (date: Moment | null) => {
    const agendamentos = this.datasAgendamentos.filter((agendamento: any) => {
      return date?.isSame(agendamento.startDate, 'day');
    });

    return moment().isAfter(date) && !moment().isSame(date, 'day') || agendamentos.length === this.qntHorasAtendimento || date?.weekday() === 0 || date?.weekday() === 6 ? false : true;
  };

  submit() {
    if(this.agendamentoForm.status === 'VALID') {
      this.loading = true;
      const [hour, minute] = this.agendamentoForm.get('hour')?.value.split(':');
      const horario = moment(this.agendamentoForm.get('date')?.value).set({ 'hour': Number(hour), 'minute': Number(minute) });

      if(this.modalData.consulta) {
        const updateBody = {
          startDate: horario,
          endDate: moment(horario).add(1, 'hours'),
          reagendada: true,
          ...(this.modalData?.userType === 'paciente' && {
            psicologoConfirmado: false
          }),
          ...(this.modalData?.userType === 'psicologo' && {
            pacienteConfirmado: false
          })
        };

        if(this.modalData.updateSubject) {
          this.modalData?.updateSubject.next(updateBody);
        }
        
        this.agendamentoService.updateConsulta(this.modalData.consulta.id, updateBody)
        .subscribe({
          next: (data) => {
            this.dialogRef.close();
            this.toastr.success('Consulta reagendada com sucesso.');
          },
          error: () => {
            this.toastr.error('Não foi possível reagendar a consulta.');
          }
        }).add(() => this.loading = false);
      } else {
        this.agendamentoService.postConsulta(this.modalData.psicologoId, horario)
        .subscribe({
          next: (data) => {
            this.dialogRef.close();
            this.toastr.success('Consulta agendada com sucesso.');
          },
          error: () => {
            this.toastr.error('Não foi possível agendar a consulta.');
          }
        }).add(() => this.loading = false);
      }
    }

  }

  selectedDateChange(date: Moment | null) {
    if(date) {
      this.horarios = [];
      const sameDaySessions: any[] = this.datasAgendamentos.filter((agendamento: any) => {
        return moment(agendamento.startDate).isSame(date, 'day');
      }) 
      
      for(let i = 0; i < this.qntHorasAtendimento; i++) {
        const horario = moment(date).set({ 'hour': Number(this.modalData.comecoAtendimento.split(':')[0]), 'minute': Number(this.modalData.comecoAtendimento.split(':')[1]) }).add(i, 'hours');

        const hasSessionSameHorario = sameDaySessions.some((session) => {
          return horario.isBetween(moment(session.startDate), moment(session.endDate), 'hours', '[)');
        });
        if(!hasSessionSameHorario && moment().isBefore(horario)) {
          this.horarios.push(horario.format('HH:mm'));
        }
      }

      this.agendamentoForm.get('date')?.setValue(date);
      this.agendamentoForm.updateValueAndValidity();
    }
  }

}
