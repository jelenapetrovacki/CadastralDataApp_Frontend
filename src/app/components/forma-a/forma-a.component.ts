import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Formaa } from 'src/app/models/Formaa';
import { FormaAService } from 'src/app/services/forma-a.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-forma-a',
  templateUrl: './forma-a.component.html',
  styleUrls: ['./forma-a.component.css', './nicepage.css']
})
export class FormaAComponent implements OnInit, OnDestroy {

  public formaaNova = new Formaa();
  counter: number;
  timerRef: any;
  running: boolean = false;
  startText = 'Start';

  //Da bih preuzela vrednosti za id i pol korisnika: 
  korisnikid : number;
  pol : string; 

  subscription: Subscription;
  constructor(private formaaService: FormaAService,
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
   console.log('input u formu A : ' + this.korisnikid + ' ' + this.pol );

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

  public addFormaA() {

    this.formaaNova.vremepopunjavanja = (this.counter / 1000) + ' s';

    this.korisnikid=this.stateService.idKorisnik;
    this.stateService.idKorisnik=this.korisnikid;


    this.korisnikService.getKorisnikByID(this.korisnikid).subscribe((korisnikVracenPoIDu)=>{
      this.formaaNova.korisnik=korisnikVracenPoIDu;
      this.formaaService.addFormaA(this.formaaNova).subscribe(forma => {
        console.log(forma);
      });
    }); 

  
    console.log(this.counter);
    this.clearTimer();
    console.log('A potvrda - Korisnik ID: ' + this.korisnikid);
    if(this.pol == 'm' || this.pol == 'M') {
      this.stateService.idKorisnik = this.korisnikid;
      //this.stateService.polKorisnik = 'z';
      console.log('Input iz A u B: ' + this.stateService.idKorisnik + ' ' + this.stateService.polKorisnik);
      this.router.navigate(['/formaB']);
    } else if(this.pol == 'z' || this.pol == 'Z') {
      this.router.navigate(['/utisci']);
    }
    
  }



}
