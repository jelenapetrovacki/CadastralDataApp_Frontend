import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KORISNIK_ID_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private httpClient: HttpClient) { }


}
