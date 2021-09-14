import { unsupported } from '@angular/compiler/src/render3/view/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formab } from 'src/app/models/Formab';
import { FormaBService } from 'src/app/services/forma-b.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-forma-b',
  templateUrl: './forma-b.component.html',
  styleUrls: ['./forma-b.component.css', './nicepage.css']
})
export class FormaBComponent implements OnInit, OnDestroy {

  public formabNova = new Formab();
  public preuzetDan : number;
  public preuzetMesec : number;
  public preuzetaGodina : number;

  counter: number;
  timerRef: any;
  running: boolean = false;
  startText = 'Start';

  //Da bih preuzela vrednosti za id i pol korisnika: 
  korisnikid : number;
  pol : string; 

  constructor(private formabService: FormaBService,
    public router: Router,
    private stateService: StateService,
    private korisnikService: KorisnikService) { }

  ngOnDestroy(): void {
    clearInterval(this.timerRef);
  }

  ngOnInit(): void {
    this.startTimer();

    this.korisnikid = this.stateService.idKorisnik;
    this.pol = this.stateService.polKorisnik;

  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = 0;
    clearInterval(this.timerRef);
  }
  public addFormaB() {
    this.formabNova.vremepopunjavanja = (this.counter / 1000) + ' s';
    if(this.preuzetDan == undefined) this.preuzetDan = 0 
    if (this.preuzetMesec == undefined) this.preuzetMesec = 0;
    if (this.preuzetaGodina == undefined) this.preuzetaGodina = 0;
    this.formabNova.datumazurnosti = this.preuzetDan + '.' + this.preuzetMesec + '.' + this.preuzetaGodina + '.'; 
    console.log(this.formabNova.datumazurnosti + ' datum');

    this.korisnikid=this.stateService.idKorisnik;
    this.stateService.idKorisnik=this.korisnikid;

    
    this.korisnikService.getKorisnikByID(this.korisnikid).subscribe((korisnikVracenPoIDu)=>{
      this.formabNova.korisnik=korisnikVracenPoIDu;
      this.formabService.addFormaB(this.formabNova).subscribe(forma => {
        console.log(forma);
      });
    }); 

    console.log(this.counter);
    this.clearTimer();

    if(this.pol == 'm' || this.pol == 'M') {
      this.router.navigate(['/utisci']);
    } else if(this.pol == 'z' || this.pol == 'Z') {
      this.stateService.idKorisnik = this.korisnikid;
     // this.stateService.polKorisnik = 'm';
      this.router.navigate(['/formaA']);
    }
  }

}
