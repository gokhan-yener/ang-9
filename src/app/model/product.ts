var x; // tslint:disable
export class Product {
  id: number;
  fruit_and_vegetable_sub_group_id: number;
  producer_address_id: number;
  producer_type_id: number;
  detailed_name: string;
  description: string;
  total_amount: number;
  total_amount_quantity: number;
  harvest_start: string;
  harvest_end: string;
  square_meter: number;
  square_meter_unit: string;
  price_per_quantity?: string;
  production_type_id: number;
  price?: string;
  unit?: string;
  created_at?: string;
  updated_at?: string;
  detailed_name_slug?: string;
  document?: Document;
  producer_address?: ProducerAddress;
  production_type: ProductionType;
  fruit_and_vegetable_sub_group: FruitAndVegetableSubGroup;
  path?: string;
  city_name?: string;
  district_name?: string;
  producer_name?: string;
  producer_type_name: string;
  category_name: string;
  parent_name: string;
}

export class Document {

  producer_address_id: number;
  path: string;
}

export class ProducerAddress {
  id: number;
  producer_id: number;
  short_name: string;
  city_id: number;
  district_id: number;
  address: string;
  square_meter: string;
  type_id: number;
  city_name: string;
  district_name: string;
  producer_name: string;
  created_by_user: string;
  updated_by_user: string;
  city: City;
  district: District;
  producer_address_pivot: ProducerAddressPivot;
  producer: Producer;
}

export class Producer {
  mobile: string;
  email: string;
}

export class City {
  id: number;
  name: string;

  city_name_slug: string;
}

export class District {
  id: number;
  name: string;
  code: number;

  city_id: number;
}

export class ProductionType {
  id: number;
  name: string;
  slug: string;
}

export class FruitAndVegetableSubGroup {
  id: number;

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

  category_id: number;
}

export class ProductDetail {
  id: number;
  fruit_and_vegetable_id: number;
  name: string;
  slug: string;
  parent: FruitAndVegetable;
  producer_addresses: ProducerAddress[];
  doc: Document[];
  user: User
}

export class ProducerAddressPivot {
  fruit_and_vegetable_sub_group_id: number;
  total_amount: number;
  total_amount_quantity: string;
  harvest_start: string;
  harvest_end: string;
  square_meter: string;
  square_meter_unit: string;
  production_type_id: number;
  price: string;
  detailed_name: string;
  description: string;
  price_per_quantity: string;
  created_at: string;
  production_type: ProductionType;
  producer_type: ProducerType;

}

export class User {
  name:string;
  email: string;
}

export class ProducerType {
  name: string;
  slug: string;
}
