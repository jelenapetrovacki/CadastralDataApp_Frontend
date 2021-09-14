import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KORISNIK_ID_URL } from '../app.constants';
import { Korisnik } from '../models/Korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {


  constructor(private httpClient: HttpClient) { }

  public addKorisnik(korisnik: Korisnik) : Observable<any> {
    korisnik.korisnikid = 0;
    return this.httpClient.post(`${KORISNIK_ID_URL}`, korisnik);
  }

  public getKorisnikByID(korisnikid: number) : Observable<any> {
    return this.httpClient.get(`${KORISNIK_ID_URL}/${korisnikid}`);
  }
  
}
