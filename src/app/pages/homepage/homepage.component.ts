import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/shared/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {

  }

  getProduct() {
/*    return this.productService.getAll(12).subscribe(data => {
      console.log(data);
    });*/
  }
}
