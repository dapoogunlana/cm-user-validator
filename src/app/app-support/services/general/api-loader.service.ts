import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { routeConstants } from '../../constants/core-constants';

@Injectable({
  providedIn: 'root'
})
export class ApiLoaderService {

  rootURL: string = environment.baseUrl;
  rootAdminURL: string = environment.baseAdminUrl;
  rootAuthURL: string = environment.baseAuthUrl;
  rootNfrURL: string = environment.baseNfrUrl;
  rootURLV1: string = environment.baseUrlV1;
  rootAdminURLV1: string = environment.baseAdminUrlV1;
  rootAuthURLV1: string = environment.baseAuthUrlV1;
  rootNfrURLV1: string = environment.baseNfrUrlV1;
  rootCoachURLV1: string = environment.baseCoachUrlV1;
  rootPaymentURL: string = environment.basePaymentUrl;

  constructor(private http: HttpClient) {}

  load(config): Observable<any> {
    if (!config) {
      throw new Error('Config is required to make a request');
    }
    let reqHeaders;
    if (config.headers) {
      reqHeaders = new HttpHeaders({ ...config.headers });
    } else {
      reqHeaders = new HttpHeaders({
        'content-type': 'application/json',
        accept: 'application/json',
      });
    }
    let rootURL;
    switch (config.route) {
      case routeConstants.ADMINV1:
        rootURL = this.rootAdminURLV1;
        break;
      case routeConstants.AUTHV1:
        rootURL = this.rootAuthURLV1;
        break;
      case routeConstants.NFRV1:
        rootURL = this.rootNfrURLV1;
        break;
      case routeConstants.MARKETINGV1:
        rootURL = this.rootURLV1;
        break;
      case routeConstants.ADMIN:
        rootURL = this.rootAdminURL;
        break;
      case routeConstants.AUTH:
        rootURL = this.rootAuthURL;
        break;
      case routeConstants.NFR:
        rootURL = this.rootNfrURL;
        break;
      case routeConstants.COACHV1:
        rootURL = this.rootCoachURLV1;
        break;
      case routeConstants.PAYMENT:
        rootURL = this.rootPaymentURL;
        break;
      default:
        rootURL = this.rootURL;
        break;
    }
    if (config.method === 'POST FILE') {
        return this.http.post(rootURL + config.url, config.data);
    } else if (config.method === 'POST') {
        return this.http.post(rootURL + config.url, config.data, { headers: reqHeaders });
    } else if (config.method === 'PUT') {
        return this.http.put(rootURL + config.url, config.data, { headers: reqHeaders });
    } else if (config.method === 'DELETE') {
        return this.http.delete(rootURL + config.url, { headers: reqHeaders });
    } else {
        return this.http.get(rootURL + config.url, { headers: reqHeaders });
    }
  }

}
