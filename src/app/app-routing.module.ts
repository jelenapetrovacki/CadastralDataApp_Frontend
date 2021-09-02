import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnketaComponent } from './components/anketa/anketa.component';
import { FormaAComponent } from './components/forma-a/forma-a.component';
import { FormaBComponent } from './components/forma-b/forma-b.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { UtisciComponent } from './components/utisci/utisci.component';

const routes: Routes = [
  {path: 'pocetna', component: PocetnaComponent},
  {path: 'formaA', component: FormaAComponent},
  {path: 'formaB', component: FormaBComponent},
  {path: 'anketa', component: AnketaComponent},
  {path: 'utisci', component: UtisciComponent},
  {path: '', redirectTo: '/pocetna', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
