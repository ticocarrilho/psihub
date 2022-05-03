import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefasComponent } from './tarefas.component';
import { routing } from './tarefas.routing';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TarefasComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ]
})
export class TarefasModule { }
