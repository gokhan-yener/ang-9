import {Component, OnInit} from '@angular/core';
import {Page} from '../../shared/pagination/page';
import {ProductService} from '../../services/shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  getProduct() {
  }
}
