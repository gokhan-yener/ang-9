export class Filter {
   city: number;
   fruitAndVegetable: string;
   harvestPeriod: string;
   productionType: string;
   producerType: string;

  constructor(data: any = {}) {
    this.city = data.city;
    this.fruitAndVegetable = data.fruitAndVegetable;
    this.harvestPeriod = data.harvestPeriod;
    this.productionType = data.productionType;
    this.producerType = data.producerType;
  }
}
