import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {


  public data: any[] = [];
  public options: any;
  constructor() { }

  ngOnInit(): void {
    this.loadSelect2();

    this.options = { placeholder: 'Select', class: 'form-control select2-show-search  border-bottom-0' };
    const tempOpt = JSON.parse(JSON.stringify(this.options));
    tempOpt.placeholder = 'Select';
    this.options = tempOpt;
  }

  private loadSelect2(): void {
    this.data = [
      { id: 1, text: 'Hue' },
      { id: 2, text: 'Da Nang' },
      { id: 3, text: 'Vung Tau' },
    ];
    this.data.unshift({ id: -1, text: 'Select All' });
  }

  valueChange($event: any) {

  }
}
