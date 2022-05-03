import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from "@angular/forms";
import { Moment } from 'moment';
import * as _moment from 'moment';
import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
const moment = _moment;

@Directive({
  selector: 'input[availableDatesValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: AvailableDateValidatorDirective, multi: true}]
})
export class AvailableDateValidatorDirective implements Validator, OnChanges {
  @Input('availableDates') availableDates = [];
  private valFn = Validators.nullValidator;

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('valido')
    return this.valFn(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['availableDates'];
    if (change) {
      this.availableDates = change.currentValue;
      this.valFn = availableDate(this.availableDates);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }
}

function availableDate(dates: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('entrei aqui', dates)
    const available = dates.some((date) => {
      const startDate = moment(date.startDate), endDate = moment(date.endDate);
      console.log(date, startDate, endDate, control.value, control.value.isBetween(startDate, endDate))
      return control.value.isBetween(startDate, endDate);
    });
    return available ? { unavailableDate: {value: control.value }} : null;
  };
}