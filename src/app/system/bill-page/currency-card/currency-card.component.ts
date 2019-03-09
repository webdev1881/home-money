import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'hmy-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;

  date = new Date();

  UAH: number;
  USD: number;
  EUR: number;
  currencies: ['доллар', 'евро'];

  constructor() { }

  ngOnInit() {
    this.USD = this.currency[0].sale;
    this.EUR = this.currency[1].sale;
  }

}




