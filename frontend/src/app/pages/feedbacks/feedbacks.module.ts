import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksComponent } from './feedbacks.component';
import { routing } from './feedbacks.routing';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FeedbacksComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ]
})
export class FeedbacksModule { }
