import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['tr', 'en']);
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/tr|en/) ? browserLang : 'tr');
  }

  ngOnInit(): void {}

}
