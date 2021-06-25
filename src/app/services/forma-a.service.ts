import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FORMAA_URL } from '../app.constants';
import { Formaa } from '../models/Formaa';

@Injectable({
  providedIn: 'root'
})
export class FormaAService {

  constructor(private httpClient: HttpClient) { }

  public getAllFormaA(): Observable<any> {
    return this.httpClient.get(`${FORMAA_URL}`);
  }
  public addFormaA(formaa: Formaa) : Observable<any> {
    formaa.formaaid = 0;
    return this.httpClient.post(`${FORMAA_URL}`, formaa);
  }
  public updateFormaA(formaa: Formaa) : Observable<any> {
    return this.httpClient.put(`${FORMAA_URL}`, formaa);
  }
}
