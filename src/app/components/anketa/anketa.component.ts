import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { StarosnaGrupaService } from 'src/app/services/starosna-grupa.service';


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
    public router: Router) { }

  ngOnInit(): void {
  }

  public add(): void {
    console.log(this.korisnikNovi);
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
    this.starosnaGrupaService.getStarosnaGrByID(this.sGrID).subscribe(starosnaGrupaVracena => {
      this.korisnikNovi.starosnagrupa = starosnaGrupaVracena;
      console.log(this.korisnikNovi.starosnagrupa);
    })

    this.korisnikService.addKorisnik(this.korisnikNovi).subscribe(() => {
      console.log(this.korisnikNovi);
    }),
      (error: Error) => {

      }
    if (this.korisnikNovi.izabranaforma == "formaA") {
      this.router.navigate(['/formaA'])
    }
    else { this.router.navigate(['/formaB']) }

  }
}
