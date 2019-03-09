import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill>  {
    return this.get( `bill`);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  getCurrency(): Observable<any> {
    return this.http.get( `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`);
  }
}

