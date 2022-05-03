import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from './signup.component';
import { routing } from './signup.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDatepickerModule,
    NgxMatFileInputModule,
    MatMomentDateModule,
    MatSelectModule,
    MatIconModule,
    NgxCurrencyModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule, 
  ]
})
export class SignupModule { }
