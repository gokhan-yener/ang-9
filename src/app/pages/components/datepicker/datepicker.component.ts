import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {UtilService} from '../../../services/shared/util.service';

const I18N_VALUES = {
  tr: {
    weekdays: ['Pzt', 'Sal', 'Crs', 'Per', 'Cum', 'Cmt', 'Paz'],
    months: ['Oca', 'Sub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Ekm', 'Kas', 'Ara'],
  }
  // other languages you would support
};

@Injectable()
export class I18n {
  language = 'tr';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  // tslint:disable-next-line:variable-name
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '.';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})

export class DatepickerComponent implements OnInit {

  model: NgbDateStruct;
  @Output() date: EventEmitter<any> = new EventEmitter<any>();
  @Input() datePickerData;

  constructor(private utilService: UtilService) {
  }

  ngOnInit(): void {
    if (this.datePickerData) {
      this.model = this.utilService.parse(this.datePickerData, '-');
    }
  }


  datePickerChange() {
    return this.date.emit(this.model);
  }

}
