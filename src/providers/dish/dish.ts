import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { Dish } from '../../shared/dish';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: Http,
              private processHTTPMsgService: ProcessHttpmsgProvider,
              @Inject('BaseURL') private baseURL) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[]> {
    return this.http
      .get(this.baseURL + 'dishes')
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getDish(id: number): Observable<Dish> {
    return this.http
      .get(this.baseURL + 'dishes/'+ id)
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get(this.baseURL + 'dishes?featured=true')
      .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}
