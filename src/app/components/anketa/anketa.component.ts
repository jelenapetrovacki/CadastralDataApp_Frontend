import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { StarosnaGrupaService } from 'src/app/services/starosna-grupa.service';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-anketa',
  templateUrl: './anketa.component.html',
  styleUrls: ['./anketa.component.css', './nicepage.css']
})
export class AnketaComponent implements OnInit {

  public korisnikNovi = new Korisnik();
  public sGrID: number;
  
  constructor(
    public korisnikService: KorisnikService,
    public starosnaGrupaService: StarosnaGrupaService,
    public router: Router,
    private stateService: StateService) { }

  ngOnInit(): void {
  }

  public add(): void {
    
    if (this.korisnikNovi.pol == "muški") {
      this.korisnikNovi.pol = 'm';
      this.korisnikNovi.izabranaforma = "formaA";
    } else {
      this.korisnikNovi.pol = 'z';
      this.korisnikNovi.izabranaforma = "formaB";
    }

    //this.korisnikNovi.starosnagrupa =1;
    //this.korisnikNovi.iskustvakatastar = 0;
    //this.korisnikNovi.svakodnevnokoriscenje =0;
    this.korisnikNovi.komentar = "";
  if(this.sGrID != null) {
    this.starosnaGrupaService.getStarosnaGrByID(this.sGrID).subscribe(starosnaGrupaVracena => {
      this.korisnikNovi.starosnagrupa = starosnaGrupaVracena;
      console.log(this.korisnikNovi.starosnagrupa);
      this.korisnikService.addKorisnik(this.korisnikNovi).subscribe(korisnikID  => {
        console.log(this.korisnikNovi);
        this.stateService.idKorisnik=korisnikID; 
      })
    })
  } else {
    this.korisnikService.addKorisnik(this.korisnikNovi).subscribe(korisnikID  => {
      this.stateService.idKorisnik=korisnikID; 
    })
  }
      

    

    if (this.korisnikNovi.izabranaforma == "formaA") {
      this.stateService.idKorisnik = this.korisnikNovi.korisnikid;
      this.stateService.polKorisnik = this.korisnikNovi.pol;
      console.log('Output: ' + this.korisnikNovi.korisnikid + ' ' + this.korisnikNovi.pol );
      this.router.navigate(['/formaA']);
    }
    else { 
      this.stateService.idKorisnik = this.korisnikNovi.korisnikid;
      this.stateService.polKorisnik = this.korisnikNovi.pol;
      console.log('Output: ' + this.korisnikNovi.korisnikid + ' ' + this.korisnikNovi.pol );
      this.router.navigate(['/formaB']);
    }

  }
}
