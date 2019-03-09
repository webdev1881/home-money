import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { HMYEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'hmy-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  @Input() categories: Category[] = [];





  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  choice = 'outcome';

  date = moment();
 // '2013-01-08'
  today = moment();

  message: Message;

  constructor(private eventsService: EventsService,
              private billService: BillService) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
   // console.log( this.dt);
  }

  onChangeCategory(v) {
     const current = this.categories.find(c => {
       return  +c.id === +v;
      } );
    if ( current.name === 'ЗП' ) {
      this.choice = 'income';
    } else { this.choice = 'outcome'; }

  }

  dataChange( d ) {
    console. log( d )
  }


  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {

    let {amount, description, category, type, dt} = form.value;
    if (amount < 0) { amount *= -1; }

    console.log( this.date );
    console.log( dt );

    const event = new HMYEvent(
      type,
      amount,
      +category,
      moment(dt).format('DD.MM.YYYY HH:mm:ss'),
      description
    );
    console.log( event );

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`На счету недостаточно средств. Вам нехватает ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({value, currency: bill.currency})
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              dt: this.date,
              type: 'outcome'
            });
          });
          this.sub3 = this.eventsService.addEvent(event)
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              dt: this.date,
              type: 'outcome'
            });
          });
      });
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
    if (this.sub2) { this.sub2.unsubscribe(); }
    if (this.sub3) { this.sub3.unsubscribe(); }
  }

}
