import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  dateFormat(date: any) {
    return moment(date).format('DD.MM.YYYY');
  }

  dateFormatToReverse(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  parse(value: string, DELIMITER: string) {
    if (value) {
      const date = value.split(DELIMITER);
      return {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10)
      };
    }
    return null;
  }

}
