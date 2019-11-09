import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { DeloviComponent } from './components/delovi/delovi.component';
import { DeloviDetailsComponent } from './components/delovi-details/delovi-details.component';

const routes: Routes = [
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'delovi', component: DeloviComponent },
  { path: 'detalji', component: DeloviDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
