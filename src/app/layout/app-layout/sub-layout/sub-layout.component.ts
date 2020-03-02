import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sub-layout',
  templateUrl: './sub-layout.component.html',
  styleUrls: ['./sub-layout.component.scss']
})
export class SubLayoutComponent implements OnInit {

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['tr', 'en']);
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/tr|en/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

}
