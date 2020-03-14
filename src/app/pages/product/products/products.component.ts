import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../services/shared/product.service';
import {Product} from '../../../model/product';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  currentPage = 1;
  totalItems: number;


  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts(1);
  }

  getProducts(pageNumber) {
    this.route.queryParams.subscribe((params: Params) => {
      this.productService.getAllProduct(params, pageNumber).subscribe((data: any) => {
        this.products = data.data;
        this.currentPage = data.paginator.current_page;
        this.totalItems = data.meta.total;
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
}
