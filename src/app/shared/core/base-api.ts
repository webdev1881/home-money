import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseApi {
  private baseUrl = 'http://localhost:3000/';

  constructor(public http: HttpClient) {
  }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get(url: string = '') {
    return this.http.get<any>(this.getUrl(url), {observe: 'body'});
  }

  public post(url: string = '', data: any = {}) {
    return this.http.post<any>(this.getUrl(url), data, {observe: 'body'});
  }

  public put(url: string = '', data: any = {}) {
    return this.http.put<any>(this.getUrl(url), data, {observe: 'body'});
  }

  public delete(url: string = '', data: any = {}) {
    return this.http.delete<any>(this.getUrl(url), data);
  }



}
