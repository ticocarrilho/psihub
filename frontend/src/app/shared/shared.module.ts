import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputTrimModule } from 'ng2-trim-directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { PsicologosListComponent } from './components/psicologos-list/psicologos-list.component';
import { FormacoesComponent } from './components/formacoes/formacoes.component';
import { ModalAgendamentoComponent } from './components/modal-agendamento/modal-agendamento.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConsultaListComponent } from './components/consulta-list/consulta-list.component';
import { AvailableDateValidatorDirective } from './validators/available-date-validator.directive';
import { MatSelectModule } from '@angular/material/select';
import { JitsiComponent } from './components/jitsi/jitsi.component';
import { RouterModule } from '@angular/router';
import { ModalContratoComponent } from './components/modal-contrato/modal-contrato.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { ModalAnotacaoComponent } from './components/modal-anotacao/modal-anotacao.component';
import { AgePipe } from './pipes/AgePipe.pipe';
import { ModalTarefaComponent } from './components/modal-tarefa/modal-tarefa.component';
import { ModalFeedbackComponent } from './components/modal-feedback/modal-feedback.component';
import { AnotacoesListComponent } from './components/anotacoes-list/anotacoes-list.component';
import { TarefasListComponent } from './components/tarefas-list/tarefas-list.component';
import { FeedbacksListComponent } from './components/feedbacks-list/feedbacks-list.component';

@NgModule({
  declarations: [
    PsicologosListComponent,
    FormacoesComponent,
    ModalAgendamentoComponent,
    ConsultaListComponent,
    AvailableDateValidatorDirective,
    JitsiComponent,
    ModalContratoComponent,
    PacientesListComponent,
    ModalAnotacaoComponent,
    AgePipe,
    ModalTarefaComponent,
    ModalFeedbackComponent,
    AnotacoesListComponent,
    TarefasListComponent,
    FeedbacksListComponent
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    InputTrimModule,
    FormacoesComponent,
    PsicologosListComponent,
    ConsultaListComponent,
    JitsiComponent,
    PacientesListComponent,
    AvailableDateValidatorDirective,
    AgePipe,
    TarefasListComponent,
    AnotacoesListComponent,
    FeedbacksListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    InputTrimModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    NgxCurrencyModule,
    NgxMatDatetimePickerModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule
  ]
})
export class SharedModule { }