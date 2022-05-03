import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteDetailsComponent } from './paciente-details.component';
import { routing } from './paciente-detail.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PacienteDetailsComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class PacienteDetailsModule { }
