import { Component, OnInit, OnDestroy } from '@angular/core';

import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'hmy-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subsAll: Subscription;
  subsCur: Subscription;

  bill: Bill;
  currency: any;
  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subsAll = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency())
        .subscribe( (data: [Bill, any]  ) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
    } );
  }

  onRefresh() {
    this.isLoaded = false;
    this.subsCur = this.billService.getCurrency()
      .subscribe( (currency: any) => {
      //  setTimeout( () => {      // test
          this.currency = currency;
      //    console.log(this.currency);
          this.isLoaded = true;
      //  }, 1000 );              // test

      } );
  }

  ngOnDestroy() {
    this.subsAll.unsubscribe();
    if (this.subsCur) 
      { this.subsCur.unsubscribe(); }
  }

}
