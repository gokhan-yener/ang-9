import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoriesService} from '../../../../services/shared/categories.service';
import {FruitVegetableService} from '../../../../services/shared/fruit-vegetable.service';
import {CityService} from '../../../../services/shared/city.service';
import {ProducerTypeService} from '../../../../services/shared/producer-type.service';
import {ProductionTypeService} from '../../../../services/shared/production-type.service';
import {TranslateService} from '@ngx-translate/core';
import {Category} from '../../../../model/category';
import {City} from '../../../../model/product';
import {UNITS} from '../../../../data/units';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/shared/product.service';
import {DANGER, ERROR, INFO, SUCCESS} from '../../../../data/data';
import {NgxSpinnerService} from 'ngx-spinner';
import {ModalService} from '../../../../services/modal.service';
import {Route} from '../../../../shared/util/route';
import * as moment from 'moment';
import {UtilService} from '../../../../services/shared/util.service';

const unit = UNITS;
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
};

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ProductAddComponent implements OnInit {

  categories: Category[];
  fruitAndVegetables = [];
  cities = [];
  citiesData: any;
  districts = [];
  harvestPeriod = [];
  producerType = [];
  productionTypes = [];
  query: any = {};
  messages = [];
  status: string;
  categoryParams: any = [];
  units = unit.unit;
  quantities = unit.quantity;
  pricePerQuantities = unit.pricePerQuantity;
  message = null;
  error = {
    fruitAndVegetable: null,
    city: null,
    producerType: null,
    productionType: null,
    district: null,
    security: false,
    files: null
  };
  submitted = false;
  fileCounter = 0;
  images = [];

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 5,
    autoReset: null,
    errorReset: null,
    cancelReset: 5000,
    addRemoveLinks: true,
    dictRemoveFile: null,
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
  };

  productForm: FormGroup;

  constructor(
    private categoryService: CategoriesService,
    private fruitAndVegetableService: FruitVegetableService,
    private cityService: CityService,
    private producerTypeService: ProducerTypeService,
    private productionTypeService: ProductionTypeService,
    private translateService: TranslateService,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private modalService: ModalService,
    private utilService: UtilService
  ) {
  }

  ngOnInit(): void {

    this.message = this.translateService.instant('Click or drag images here to upload');
    this.config.dictRemoveFile = this.translateService.instant('Delete');
    this.getProductForm();
    this.getFruitAndVegetables();
    this.getCity();
    this.getHarvestPeriod();
    this.getProducerType();
    this.getProductionType();
    this.getCategory();
  }

  getProductForm() {
    this.productForm = new FormGroup({
      fruitAndVegetable: new FormControl('-1', [Validators.required]),
      fruitAndVegetableDetail: new FormControl('', [Validators.required]),
      harvestStartDate: new FormControl('', [Validators.required]),
      harvestEndDate: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required]),
      totalAmountQuantity: new FormControl(this.quantities[0].item, [Validators.required]),
      squareMeter: new FormControl('', [Validators.required]),
      squareMeterUnit: new FormControl(this.units[1].item, [Validators.required]),
      address: new FormControl(''),
      city: new FormControl('-1', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      pricePerQuantity: new FormControl(this.pricePerQuantities[1].item, [Validators.required]),
      producerType: new FormControl('-1', [Validators.required]),
      productionType: new FormControl('-1', [Validators.required]),
      files: new FormControl('', [Validators.required]),
      security: new FormControl(false, [Validators.requiredTrue]),
      totalFile: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;
    const isValid = this.validateForm();
    if (!isValid) {
      this.spinner.show();
      this.productForm.get('harvestStartDate').setValue(
        this.utilService.dateFormat(new Date(this.productForm.get('harvestStartDate').value)));

      this.productService.setProduct(this.productForm.value).subscribe(data => {
        this.spinner.hide();
        this.handleResponse(data);
        this.modalService.showMessage(
          this.translateService.instant('Product Add'),
          this.translateService.instant('Adding products successfully completed'),
          SUCCESS,
          Route.PROFILE.PRODUCTS
        );
      }, error => {
        this.spinner.hide();
        this.handleError(error);
      });
    }

  }

  handleResponse(data) {
    this.messages = [];
    this.messages.push(this.translateService.instant('success_login'));
    if (data.status === SUCCESS) {
      this.status = INFO;
    } else if (data.status === ERROR) {
      this.status = DANGER;
    }
  }

  handleError(error) {
    this.messages = [];
    this.messages.push(this.translateService.instant('User email or password is wrong'));
    this.status = DANGER;
  }

  validateForm() {
    this.error = {
      fruitAndVegetable: null,
      city: null,
      producerType: null,
      productionType: null,
      district: null,
      security: false,
      files: null
    };

    let validate = false;

    if (this.productForm.get('fruitAndVegetable').value === '-1') {
      this.error.fruitAndVegetable = this.translateService.instant('Product is required.');
      validate = true;
    }
    if (this.productForm.get('city').value === '-1') {
      this.error.city = this.translateService.instant('City is required.');
      validate = true;
    }
    if (this.productForm.get('producerType').value === '-1') {
      this.error.producerType = this.translateService.instant('From Who is required.');
      validate = true;
    }
    if (this.productForm.get('productionType').value === '-1') {
      this.error.productionType = this.translateService.instant('Production Type is required.');
      validate = true;
    }
    if (this.productForm.get('district').value === '-1') {
      this.error.district = this.translateService.instant('District is required.');
      validate = true;
    }
    if (this.productForm.get('security').value === false) {
      this.error.security = this.translateService.instant('District is required.');
      validate = true;
    }
    if (this.productForm.get('files').value === null) {
      this.error.files = this.translateService.instant('Image is required.');
      validate = true;
    }
    return !!validate;
  }

  getCategory() {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  getFruitAndVegetables() {
    this.spinner.show();
    this.fruitAndVegetableService.getAll().subscribe((data: any[]) => {
      this.spinner.hide();
      this.fruitAndVegetables = data;
      this.fruitAndVegetables.unshift({id: -1, text: this.translateService.instant('Select')});
    }, error => {
      this.spinner.hide();
    });
  }

  getCity() {
    this.cityService.getAll().subscribe((data: City[]) => {
      this.citiesData = data;
      data.map(res => {
        this.cities.push({id: res.id, text: res.name});
      });
      this.cities.unshift({id: -1, text: this.translateService.instant('Select')});
    });

  }

  getDistrict(id: any) {
    const district = this.citiesData.filter(data => data.id === Number(id))[0].districts;
    district.map(res => {
      this.districts.push({id: res.id, text: res.name});
    });
    this.districts.unshift({id: -1, text: this.translateService.instant('Select')});
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
        this.productionTypes.push({id: res.slug, text: res.name, image: Route.PATH.PRODUCTION_TYPE + res.image});
      });
    });
  }

  valueChange($event: any, categoryName: string) {
    if (categoryName === 'city') {
      this.cities = this.cities.filter(data => data.id !== -1);
      this.productForm.get('city').setValue($event.id);
      this.districts = [];
      this.getDistrict($event.id);
    } else if (categoryName === 'district') {
      this.productForm.get('district').setValue($event.id);
    } else if (categoryName === 'fruitAndVegetable') {
      this.productForm.get('fruitAndVegetable').setValue($event.id);
    }

  }

  onUploadSuccess(args: any): void {
    this.fileCounter++;
    this.images.push(args[0]);
    this.productForm.get('files').setValue(this.images);
    this.productForm.get('totalFile').setValue(this.fileCounter);
  }

  removeFile($event) {
    this.fileCounter--;
    this.productForm.get('totalFile').setValue(this.fileCounter);
    this.images = this.images.filter(data => data.name !== $event.name);
    this.productForm.get('files').setValue(this.images);
  }


}
