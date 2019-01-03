
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {LeadSettings} from './../shared/lead-settings.model';
import {WorkOrderPdf} from './../shared/workorderpdf.model';
import {BankDetails} from './../shared/bankdetails.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient
    ) { }

    addLeadSource(data: any): Observable<any> {
      const addUrl = 'leadsource';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<LeadSettings[]>(url, data);
    }
    addLeadService(data: any): Observable<any> {
      const addUrl = 'services';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<LeadSettings[]>(url, data);
    }
    addLeadStatus(data: any): Observable<any> {
      const addUrl = 'leadstatus';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<LeadSettings[]>(url, data);
    }
    leadSource(): Observable<any> {
      const addUrl = 'leadsources';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.get<LeadSettings[]>(url);
    }
    deleteLeadSource(val): Observable<any> {
      const addUrl = 'leadsources/';
      const url: string = this.serviceUrl + addUrl + val;
      return this.httpClient.delete<LeadSettings[]>(url);
    }
    deleteLeadServices(val): Observable<any> {
      const addUrl = 'leadservices/';
      const url: string = this.serviceUrl + addUrl + val;
      return this.httpClient.delete<LeadSettings[]>(url);
    }
    deleteLeadStatus(val): Observable<any> {
      const addUrl = 'leadstatus/';
      const url: string = this.serviceUrl + addUrl + val;
      return this.httpClient.delete<LeadSettings[]>(url);
    }
    addGST(data: any): Observable<any> {
      const addUrl = 'workordergst';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<WorkOrderPdf[]>(url, data);
    }
    addSGST(data: any): Observable<any> {
      const addUrl = 'workordersgst';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<WorkOrderPdf[]>(url, data);
    }
    addCGST(data: any): Observable<any> {
      const addUrl = 'workordercgst';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<WorkOrderPdf[]>(url, data);
    }
    addTerms(data: any): Observable<any> {
      const addUrl = 'workorderterms';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<WorkOrderPdf[]>(url, data);
    }
    addDigitalTerms(data: any): Observable<any> {
      const addUrl = 'workorderdigitalterms';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<WorkOrderPdf[]>(url, data);
    }
    addBankDetails(data: any): Observable<any> {
      const addUrl = 'bankdetails';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<BankDetails[]>(url, data);
    }
    addCompanyDetails(data: any): Observable<any> {
      const addUrl = 'companydetails';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<BankDetails[]>(url, data);
    }
    addFooterDetails(data: any): Observable<any> {
      const addUrl = 'footerdetails';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<BankDetails[]>(url, data);
    }
    getPdfWorkOrderDetails(): Observable<any> {
      const addUrl = 'pdfworkorder';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.get<LeadSettings[]>(url);
    }
}
