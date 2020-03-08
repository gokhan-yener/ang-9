export class Product {
  id: number;
  // tslint:disable-next-line:variable-name
  fruit_and_vegetable_sub_group_id: number;
  // tslint:disable-next-line:variable-name
  producer_address_id: number;
  // tslint:disable-next-line:variable-name
  producer_type_id: number;
  // tslint:disable-next-line:variable-name
  detailed_name: string;
  // tslint:disable-next-line:variable-name
  description: string;
  // tslint:disable-next-line:variable-name
  total_amount: number;
  // tslint:disable-next-line:variable-name
  total_amount_quantity: number;
  // tslint:disable-next-line:variable-name
  harvest_start: string;
  // tslint:disable-next-line:variable-name
  harvest_end: string;
  // tslint:disable-next-line:variable-name
  square_meter: number;
  // tslint:disable-next-line:variable-name
  square_meter_unit: string;
  // tslint:disable-next-line:variable-name
  price_per_quantity: string;
  // tslint:disable-next-line:variable-name
  production_type_id: number;
  price: string;
  unit: string;
  // tslint:disable-next-line:variable-name
  created_at: string;
  // tslint:disable-next-line:variable-name
  updated_at: string;
  // tslint:disable-next-line:variable-name
  detailed_name_slug: string;
  document?: Document;
  // tslint:disable-next-line:variable-name
  producer_address: ProducerAddress;
  // tslint:disable-next-line:variable-name
  production_type: ProductionType;
  // tslint:disable-next-line:variable-name
  fruit_and_vegetable_sub_group: FruitAndVegetableSubGroup;


}

export class Document {
  // tslint:disable-next-line:variable-name
  producer_address_id: number;
  path: string;
}

export class ProducerAddress {
  id: number;
  // tslint:disable-next-line:variable-name
  producer_id: number;
  // tslint:disable-next-line:variable-name
  short_name: string;
  // tslint:disable-next-line:variable-name
  city_id: number;
  // tslint:disable-next-line:variable-name
  district_id: number;
  // tslint:disable-next-line:variable-name
  address: string;
  // tslint:disable-next-line:variable-name
  square_meter: string;
  // tslint:disable-next-line:variable-name
  type_id: number;
  // tslint:disable-next-line:variable-name
  city_name: string;
  // tslint:disable-next-line:variable-name
  district_name: string;
  // tslint:disable-next-line:variable-name
  producer_name: string;
  // tslint:disable-next-line:variable-name
  created_by_user: string;
  // tslint:disable-next-line:variable-name
  updated_by_user: string;
  // tslint:disable-next-line:variable-name
  city: City;
  district: District;
}

export class City {
  id: number;
  name: string;
  // tslint:disable-next-line:variable-name
  city_name_slug: string;
}

export class District {
  id: number;
  name: string;
  code: number;
  // tslint:disable-next-line:variable-name
  city_id: number;
}

export class ProductionType {
  id: number;
  name: string;
  slug: string;
}

export class FruitAndVegetableSubGroup {
  id: number;
  // tslint:disable-next-line:variable-name
  fruit_and_vegetable_id: number;
  name: string;
  slug: string;
  description: string;
  parent: FruitAndVegetable;
}

export class FruitAndVegetable {
  id: number;
  name: string;
  slug: string;
  description: string;
  // tslint:disable-next-line:variable-name
  category_id: number;
}
