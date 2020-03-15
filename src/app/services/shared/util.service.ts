import {Injectable} from '@angular/core';
import * as moment from 'moment';
import { Logo } from 'src/app/shared/util/logo';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  dateFormat(date: any) {
    return moment(date).format('DD.MM.YYYY');
  }

}
