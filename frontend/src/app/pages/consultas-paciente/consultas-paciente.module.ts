import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultasPacienteComponent } from './consultas-paciente.component';
import { routing } from './consultas-paciente.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ConsultasPacienteComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ]
})
export class ConsultasPacienteModule { }
