import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/shared/product.service';
import {CONSTANT} from '../../../shared/util/constant';
import {Product} from '../../../model/product';
import {environment} from '../../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  products: Product[];
  baseUrl = environment.PUBLIC_BASE_PATH;

  constructor(private productService: ProductService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.spinner.show();
    this.productService.getAll(CONSTANT.PRODUCT.GET_PRODUCT_ITEM).subscribe((data: Product[]) => {
      this.spinner.hide();
      this.products = data;
    }, error => {
      this.spinner.hide();
    });
  }


}
