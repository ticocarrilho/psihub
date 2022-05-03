import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsicologosComponent } from './psicologos.component';
import { routing } from './psicologos.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PsicologosComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ]
})
export class PsicologosModule { }
