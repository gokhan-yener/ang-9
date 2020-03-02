import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public data: any[] = [];
  public options: any;

  constructor() { }

  ngOnInit(): void {
    this.loadSelect2();

    this.options = { placeholder: 'en-us' }
    const tempOpt = JSON.parse(JSON.stringify(this.options))
    tempOpt.placeholder = 'Không tìm thấy';
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

}
