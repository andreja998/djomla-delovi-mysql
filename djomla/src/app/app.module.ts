import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { PretrazivacComponent } from './components/pretrazivac/pretrazivac.component';
import { DeloviComponent } from './components/delovi/delovi.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaginationComponent,
    PocetnaComponent,
    PretrazivacComponent,
    DeloviComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
