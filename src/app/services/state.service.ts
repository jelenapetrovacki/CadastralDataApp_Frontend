import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public idKorisnik: number;
  public polKorisnik: string;
  constructor() { }
}
