import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/shared/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {ProductDetail} from '../../../model/product_detail';
import {UtilService} from '../../../services/shared/util.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductDetail[];
  currentPage = 1;
  totalItems: number;
  baseUrl = environment.PUBLIC_BASE_PATH;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private utilService: UtilService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getProducts(1);
  }

  getProducts(pageNumber) {
    this.spinner.show();
    this.route.queryParams.subscribe((params: Params) => {

      this.productService.getAllProduct(params, pageNumber).subscribe((data: any) => {
        this.products = data.data;
        this.currentPage = data.paginator.current_page;
        this.totalItems = data.meta.total;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    });
  }

  setProducts($event) {
    this.products = $event.data.data;
    this.currentPage = $event.data.meta.current_page;
    this.totalItems = $event.data.meta.total;
  }

  pageChange(newPage: number) {
    this.router.navigate([], {
      queryParams: {
        page: newPage
      },
      queryParamsHandling: 'merge',
    });
  }

  dateFormat(date: any) {
    return this.utilService.dateFormat(date);
  }
}
