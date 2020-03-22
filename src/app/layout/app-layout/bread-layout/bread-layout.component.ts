import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-bread-layout',
  templateUrl: './bread-layout.component.html',
  styleUrls: ['./bread-layout.component.scss']
})
export class BreadLayoutComponent implements OnInit {

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['tr', 'en']);
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/tr|en/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

}
