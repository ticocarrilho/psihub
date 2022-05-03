import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesComponent } from './pacientes.component';
import { routing } from './pacientes.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PacientesComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PacientesModule { }
