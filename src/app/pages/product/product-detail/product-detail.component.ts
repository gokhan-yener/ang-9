import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  breadcrumb: [] = [];

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    // @ts-ignore
    this.breadcrumb.push({text: this.translate.instant('Product'), link: '/products'});
  }
}
