import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormaAComponent } from './components/forma-a/forma-a.component';
import { FormaBComponent } from './components/forma-b/forma-b.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { AnketaComponent } from './components/anketa/anketa.component';
import { UtisciComponent } from './components/utisci/utisci.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormaAComponent,
    FormaBComponent,
    PocetnaComponent,
    AnketaComponent,
    UtisciComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
