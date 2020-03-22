import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/shared/product.service';
import {Product} from '../../../../model/product';
import {environment} from '../../../../../environments/environment';
import {UtilService} from '../../../../services/shared/util.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products: Product[];
  baseUrl = environment.PUBLIC_BASE_PATH;

  constructor(private productService: ProductService,
              private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllUserProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }

  dateFormat(date: string) {
    return this.utilService.dateFormat(date);
  }
}
