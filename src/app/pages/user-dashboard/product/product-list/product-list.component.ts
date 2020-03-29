import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/shared/product.service';
import {Product} from '../../../../model/product';
import {environment} from '../../../../../environments/environment';
import {UtilService} from '../../../../services/shared/util.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  baseUrl = environment.PUBLIC_BASE_PATH;

  constructor(private productService: ProductService,
              private utilService: UtilService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.spinner.show();
    this.productService.getAllUserProducts().subscribe(data => {
      this.spinner.hide();
      this.products = data;
    }, error => {
      this.spinner.hide();
    });
  }

  dateFormat(date: string) {
    return this.utilService.dateFormat(date);
  }
}
