import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date): string {
      let data = moment(value);
      let anos = moment().diff(data, 'years');
      let html: string = anos + " anos";

      return html;
  }

}