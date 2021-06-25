import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FORMAB_URL } from '../app.constants';
import { Formab } from '../models/Formab';

@Injectable({
  providedIn: 'root'
})
export class FormaBService {

  constructor(private httpClient: HttpClient) { }

  public getAllFormaB(): Observable<any> {
    return this.httpClient.get(`${FORMAB_URL}`);
  }
  public addFormaB(formab: Formab) : Observable<any> {
    formab.formabid = 0;
    return this.httpClient.post(`${FORMAB_URL}`, formab);
  }
  public updateFormaB(formab: Formab) : Observable<any> {
    return this.httpClient.put(`${FORMAB_URL}`, formab);
  }
}
