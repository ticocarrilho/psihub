import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPsicologoComponent } from './dashboard-psicologo.component';
import { routing } from './dashboard-psicologo.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardPsicologoComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ]
})
export class DashboardPsicologosModule { }
