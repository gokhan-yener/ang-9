import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../../services/shared/categories.service';
import {CONSTANT} from '../../../shared/util/constant';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAll().subscribe((data: Category) => {
      this.categories = data;
    });
  }
}
