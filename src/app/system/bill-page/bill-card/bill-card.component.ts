import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'hmy-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  constructor() { }

  // private LOGO = require('../img/logo/logo.svg');

  @Input() bill: Bill;
  @Input() currency: any;

//  UAH: number;
  USD: number;
  EUR: number;



  ngOnInit() {
    this.USD = this.bill.value / this.currency[0].sale;
    this.EUR = this.bill.value / this.currency[1].sale;
  }

}
