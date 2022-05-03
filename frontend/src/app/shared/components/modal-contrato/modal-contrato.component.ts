import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AgendamentoService } from '../../services/agendamento.service';
const moment = _moment;

export interface contratoModalData {
  psicologo: any,
  paciente: any,
  uuid: string,
}

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

@Component({
  selector: 'app-modal-contrato',
  templateUrl: './modal-contrato.component.html',
  styleUrls: ['./modal-contrato.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ModalContratoComponent implements OnInit {

  loading = false;
  minDate: Moment;
  contratoForm: FormGroup;

  inicioAtendimento!: Moment;
  finalAtendimento!: Moment;
  qntHorasAtendimento!: number;
  horarios: string[] = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalContratoComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: contratoModalData, private toastr: ToastrService, private agendamentoService: AgendamentoService) {
    this.minDate = moment();
    this.contratoForm = this.fb.group({
      inicioContrato: ["", Validators.required],
      finalContrato: ["", Validators.required],
      hour: ["", Validators.required],
      precoSessao: [this.modalData.psicologo.precoSessao, Validators.compose([Validators.required, Validators.min(30)])]
    });

    this.inicioAtendimento = moment().set({ 'hour': Number(this.modalData.psicologo.comecoAtendimento.split(':')[0]), 'minute': Number(this.modalData.psicologo.comecoAtendimento.split(':')[1]) });
    this.finalAtendimento = moment().set({ 'hour': Number(this.modalData.psicologo.finalAtendimento.split(':')[0]), 'minute': Number(this.modalData.psicologo.finalAtendimento.split(':')[1]) });

    this.qntHorasAtendimento = this.finalAtendimento.diff(this.inicioAtendimento, 'hours');
      
    for(let i = 0; i < this.qntHorasAtendimento; i++) {
      const horario = moment().set({ 'hour': Number(this.modalData.psicologo.comecoAtendimento.split(':')[0]), 'minute': Number(this.modalData.psicologo.comecoAtendimento.split(':')[1]) }).add(i, 'hours');
      this.horarios.push(horario.format('HH:mm'));
    }
  }

  ngOnInit(): void { }

  dateFilter = (date: Moment | null) => {
    return date?.weekday() === 0 || date?.weekday() === 6 ? false : true;
  };

  submit() {
    if(this.contratoForm.status === 'VALID') {
      this.loading = true;
      
      this.agendamentoService.postContrato(this.modalData.paciente.id, this.contratoForm.get('inicioContrato')?.value, this.contratoForm.get('finalContrato')?.value, this.contratoForm.get('precoSessao')?.value)
      .subscribe({
        next: (data) => {
          this.dialogRef.close(true);
          this.toastr.success('Contrato gerado com sucesso.');
        },
        error: () => {
          this.toastr.error('Não foi possível gerar o contrato.');
        }
      }).add(() => this.loading = false);
    }
  }

}
