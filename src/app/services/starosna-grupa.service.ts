import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STAROSNAGRUPA_ID_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class StarosnaGrupaService {

  constructor(private httpClient: HttpClient) { }

  public getStarosnaGrByID(id : number): Observable<any> {
    return this.httpClient.get(`${STAROSNAGRUPA_ID_URL}/${id}`);
  }

// get starosna grupa id by prosledjena vrednost 
//proveriti na backendu da li postoji metoda za to 
}
