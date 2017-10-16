import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { Promotion } from '../../shared/promotion';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: Http,
              private processHTTPMsgService: ProcessHttpmsgProvider,
              @Inject('BaseURL') private baseURL) {
    console.log('Hello PromotionProvider Provider');
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http
      .get(this.baseURL + 'promotions')
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http
      .get(this.baseURL + 'promotions/'+ id)
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http
      .get(this.baseURL + 'promotions?featured=true')
      .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}
