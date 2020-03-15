import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {Category} from '../../../../model/category';
import {CategoriesService} from '../../../../services/shared/categories.service';
import {FruitVegetableService} from '../../../../services/shared/fruit-vegetable.service';
import {TranslateService} from '@ngx-translate/core';
import {CityService} from '../../../../services/shared/city.service';
import {City} from '../../../../model/product';
import {ProducerTypeService} from '../../../../services/shared/producer-type.service';
import {ProductionTypeService} from '../../../../services/shared/production-type.service';
import {Filter} from '../../../../model/filter';
import {FilterService} from '../../../../services/shared/filter.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Output() products: EventEmitter<any> = new EventEmitter<any>();

  categories: Category[];
  fruitAndVegetables: any;
  cities = [];
  harvestPeriod = [];
  producerType = [];
  productionType = [];
  query: any = {};
  categoryParams: any = [];

  constructor(private categoryService: CategoriesService,
              private fruitAndVegetableService: FruitVegetableService,
              private cityService: CityService,
              private producerTypeService: ProducerTypeService,
              private productionTypeService: ProductionTypeService,
              private filterService: FilterService,
              private translateService: TranslateService,
              private router: Router,
              private route: ActivatedRoute,
              @Inject(DOCUMENT) document
  ) {

  }

  ngOnInit(): void {
    this.getCategory();
    this.getFruitAndVegetables();
    this.getCity();
    this.getHarvestPeriod();
    this.getProducerType();
    this.getProductionType();

  }

  getCategory() {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  getFruitAndVegetables() {
    this.fruitAndVegetableService.getAll().subscribe((data: any[]) => {
      this.fruitAndVegetables = data;
      this.fruitAndVegetables.unshift({id: -1, text: this.translateService.instant('Select')});
    });
  }

  getCity() {
    this.cityService.getAll().subscribe((data: City[]) => {
      data.map(res => {
        this.cities.push({id: res.id, text: res.name});
      });
      this.cities.unshift({id: -1, text: this.translateService.instant('Select')});
    });
  }

  getHarvestPeriod() {
    this.fruitAndVegetableService.getAllHarvestPeriod().subscribe((data: any[]) => {
      data.map(res => {
        this.harvestPeriod.push({id: res.period, text: res.name});
      });
      this.harvestPeriod.unshift({id: -1, text: this.translateService.instant('Select')});
    });
  }

  getProducerType() {
    this.producerTypeService.getAll().subscribe((data: any[]) => {
      data.map(res => {
        this.producerType.push({id: res.id, text: res.name});
      });
      this.producerType.unshift({id: -1, text: this.translateService.instant('Select')});
    });
  }

  getProductionType() {
    this.productionTypeService.getAll().subscribe((data: any[]) => {
      data.map(res => {
        this.productionType.push({id: res.slug, text: res.name});
      });
      this.productionType.unshift({id: -1, text: this.translateService.instant('Select')});
    });
  }

  valueChange($event: any, selectType: string) {

    switch (selectType) {
      case 'fruitAndVegetable':
        this.query.product = $event.id;
        if (this.query.product === '-1') {
          delete this.query.product;
        }
        break;
      case 'city':
        this.query.city = $event.id;
        if (this.query.city === '-1') {
          delete this.query.city;
        }
        break;
      case 'harvestPeriod':
        this.query.harvestPeriod = $event.id;
        if (this.query.harvestPeriod === '-1') {
          delete this.query.harvestPeriod;
        }
        break;
      case 'productionType':
        this.query.productionType = $event.id;
        if (this.query.productionType === '-1') {
          delete this.query.productionType;
        }
        break;
      case 'producerType':
        this.query.producerType = $event.id;
        if (this.query.producerType === '-1') {
          delete this.query.producerType;
        }
        break;
    }

    if (selectType === 'category') {
      this.categories.forEach(data => {
        if (data.slug === $event.target.value) {
          this.categoryParams[data.slug] = $event.target.checked;
          if (this.categoryParams[data.slug] === false) {
            delete this.categoryParams[data.slug];
          }
        }
      });
    }
  }

  applyFilter() {
    const cat = Object.keys(this.categoryParams).join();
    const filter = Object.assign({category: cat}, this.query);
    this.router.navigate(['/products/'], {queryParams: filter});
  }

}
