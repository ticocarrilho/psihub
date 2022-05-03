import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
const moment = _moment;

export const DATE_PICKER_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-formacoes',
  templateUrl: './formacoes.component.html',
  styleUrls: ['./formacoes.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMATS },
  ]
})
export class FormacoesComponent implements OnInit {
  @Input() fg!: FormGroup;
  maxDate: Date;

  constructor(private fb: FormBuilder) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
  }

  removeFormacao(i: number) {
    this.getFormacoesFormArray().removeAt(i);
  }

  getFormacoesFormArray() {
    return (this.fg.get('formacoes') as FormArray);
  }

  isAddDisabled() {
    return (this.fg.get('formacoes') as FormArray).length >= 3;
  }

  createFormacao() {
    this.getFormacoesFormArray().push(
      this.fb.group({
        titulo: ["", Validators.required],
        universidade: ["", Validators.required],
        curso: ["", Validators.required],
        anoFormacao: [moment(), Validators.required]
      })
    );
  }

  chosenYearHandler(normalizedYear: Moment, anoPicker: MatDatepicker<Moment>, index: number) {
    const ctrlValue = this.getFormacoesFormArray().at(index).get('anoFormacao')?.value;
    ctrlValue.year(normalizedYear.year());

    this.getFormacoesFormArray().at(index).get('anoFormacao')?.setValue(ctrlValue);
    anoPicker.close();
  }

}
