import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/shared/product.service';
import {CONSTANT} from '../../../shared/util/constant';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
        return this.productService.getAll(CONSTANT.PRODUCT.GET_PRODUCT_ITEM).subscribe(data => {
          console.log(data);
        });
  }


}
