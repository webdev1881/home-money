import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Observable } from 'rxjs';
import { HMYEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: HMYEvent): Observable<HMYEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<HMYEvent[]> {
    return this.get('events');
  }




}


