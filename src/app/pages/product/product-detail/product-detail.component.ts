import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/shared/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductDetail} from '../../../model/product';
import {UtilService} from '../../../services/shared/util.service';
import {environment} from '../../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: ProductDetail;
  baseUrl = environment.PUBLIC_BASE_PATH;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private utilService: UtilService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    this.route.paramMap.subscribe((params: ParamMap) => {

      const id = params.get('id');
      const category = params.get('category');

      if (id && category) {
        this.spinner.show();
        this.productService.getProductDetailByIdAndSlug(id, category).subscribe((data: ProductDetail) => {
          this.product = data;
        }, error => {
          this.spinner.hide();
        });
      }
    });
  }


  dateFormat(date: any) {
    return this.utilService.dateFormat(date);
  }

}
