import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormaAService } from 'src/app/services/forma-a.service';

@Component({
  selector: 'app-forma-a',
  templateUrl: './forma-a.component.html',
  styleUrls: ['./forma-a.component.css']
})
export class FormaAComponent implements OnInit, OnDestroy {

  subscription:  Subscription;
  constructor(private formaaService: FormaAService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.loadData();
  }
  public loadData() {
    this.subscription = this.formaaService.getAllFormaA().subscribe(data => {
      console.log(data);
    }),
    (error: Error) => {console.log("greska");}
  }

}
