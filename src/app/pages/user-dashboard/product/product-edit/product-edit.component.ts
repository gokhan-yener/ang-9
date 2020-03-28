import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriesService} from '../../../../services/shared/categories.service';
import {FruitVegetableService} from '../../../../services/shared/fruit-vegetable.service';
import {CityService} from '../../../../services/shared/city.service';
import {ProducerTypeService} from '../../../../services/shared/producer-type.service';
import {ProductionTypeService} from '../../../../services/shared/production-type.service';
import {TranslateService} from '@ngx-translate/core';
import {Category} from '../../../../model/category';
import {City, ProductDetail} from '../../../../model/product';
import {UNITS} from '../../../../data/units';
import {DROPZONE_CONFIG, DropzoneAcceptFunction, DropzoneConfigInterface, DropzoneInitFunction} from 'ngx-dropzone-wrapper';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/shared/product.service';
import {DANGER, ERROR, INFO, SUCCESS} from '../../../../data/data';
import {NgxSpinnerService} from 'ngx-spinner';
import {ModalService} from '../../../../services/modal.service';
import {Route} from '../../../../shared/util/route';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {environment} from '../../../../../environments/environment';

const unit = UNITS;
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
};

@Component({
  selector: 'app-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ProductEditComponent implements OnInit {
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
  product: ProductDetail;
  removeFiles = [];

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
    private route: ActivatedRoute,
  ) {
  }

  // http://www.ciftcipazaryeri.com/api/
  // fruits-and-vegetables-sub-groups/get-detail?producerAddressId=340&productSlug=anason
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
          this.productForm.get('fruitAndVegetable').setValue(this.product.slug);
          this.productForm.get('fruitAndVegetableDetail').setValue(this.product.producer_addresses[0].producer_address_pivot.detailed_name);
          this.productForm.get('harvestStartDate').setValue(this.product.producer_addresses[0].producer_address_pivot.harvest_start);
          this.productForm.get('harvestEndDate').setValue(this.product.producer_addresses[0].producer_address_pivot.harvest_end);
          this.productForm.get('totalAmount').setValue(this.product.producer_addresses[0].producer_address_pivot.total_amount);
          this.productForm.get('totalAmountQuantity').setValue(this.product.producer_addresses[0].producer_address_pivot.total_amount_quantity);
          this.productForm.get('squareMeter').setValue(this.product.producer_addresses[0].producer_address_pivot.square_meter);
          this.productForm.get('squareMeterUnit').setValue(this.product.producer_addresses[0].producer_address_pivot.square_meter_unit);
          this.productForm.get('address').setValue(this.product.producer_addresses[0].address);
          this.productForm.get('city').setValue(this.product.producer_addresses[0].city_id);
          this.productForm.get('description').setValue(this.product.producer_addresses[0].producer_address_pivot.detailed_name);
          this.productForm.get('price').setValue(this.product.producer_addresses[0].producer_address_pivot.price);
          this.productForm.get('pricePerQuantity').setValue(this.product.producer_addresses[0].producer_address_pivot.price_per_quantity);
          this.productForm.get('producerType').setValue(this.product.producer_addresses[0].producer_address_pivot.producer_type_id);
          this.productForm.get('files').setValue([this.product.doc]);
          this.productForm.get('producerAddressId').setValue(id);
          this.productForm.get('productionType').setValue(this.product.producer_addresses[0].producer_address_pivot.production_type.slug);

          this.getDistrict(this.product.producer_addresses[0].city_id);
          this.productForm.get('district').setValue(this.product.producer_addresses[0].district.id);

          console.log(this.productForm.get('files').value);
          this.images.push(this.product.doc);

          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          this.modalService.showMessage(
            this.translateService.instant(''),
            this.translateService.instant('Something went wrong. Please try again later'),
            'error'
          );
        });
      }
    });
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
      producerAddressId: new FormControl('', [Validators.required]),
      city: new FormControl('-1', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      pricePerQuantity: new FormControl(this.pricePerQuantities[1].item, [Validators.required]),
      producerType: new FormControl('-1', [Validators.required]),
      productionType: new FormControl('-1', [Validators.required]),
      files: new FormControl('', [Validators.required]),
      security: new FormControl(false, [Validators.requiredTrue]),
      removeFile: new FormControl(null),
    });
  }

  onSubmit() {
    this.submitted = true;
    const isValid = this.validateForm();
    if (!isValid) {
      this.spinner.show();
      this.productService.updateProduct(this.productForm.value).subscribe(data => {
        this.spinner.hide();
        let message = null;
        let status = null;
        if (data.success) {
          message = this.translateService.instant('Updating products successfully completed');
          status = SUCCESS;
        } else {
          message = this.translateService.instant('There was an error updating the product. Please try again later');
          status = ERROR;
        }
        this.modalService.showMessage(
          this.translateService.instant('Product Update'),
          message,
          status,
          Route.PROFILE.PRODUCTS
        );
        this.handleResponse(data);

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
    console.log(this.productForm.get('files').value);
  }

  removeFile($event) {
    console.log($event);
    console.log(this.images);
    if ($event.url && $event.url !== '') {
      console.log(this.images[0]);
      this.images[0] = this.images[0].filter(data => data.path !== $event.url);
      if (this.images[0].length > 0) {
        this.removeFiles.push($event.url);
        this.productForm.get('removeFile').setValue(this.removeFiles);
        this.productForm.get('files').setValue(this.images);
      } else {
        this.removeFiles.push($event.url);
        this.productForm.get('removeFile').setValue(this.removeFiles);
        this.images.shift();
      }

      console.log(this.images);
      return false;
    }

    this.fileCounter--;
    this.images = this.images.filter(data => data.name !== $event.name);
    this.productForm.get('files').setValue(this.images);
    // this.productForm.get('removeFile').setValue(this.images);
  }

  setFiles($event) {

    const files: [] = this.productForm.get('files').value;
    const dropzone = $event;
    files.forEach((file: any) => {
      const mockFile = {name: '', accepted: true, kind: 'image', type: 'image/*', url: file.path};
      dropzone.emit('addedfile', mockFile);
      dropzone.emit('thumbnail', mockFile, environment.PUBLIC_BASE_PATH + '/' + file.path);
      dropzone.emit('complete', mockFile);
    });


    /*
    console.log($event);
    $event.files.push({file: 'https://via.placeholder.com/150'});*/
  }

}
