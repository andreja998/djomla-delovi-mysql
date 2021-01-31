import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { PretrazivacComponent } from './components/pretrazivac/pretrazivac.component';
import { DeloviComponent } from './components/delovi/delovi.component';
import { DeoComponent } from './components/deo/deo.component';
import { SadrzajComponent } from './components/delovi/sadrzaj/sadrzaj.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AddMarkComponent } from './components/admin/add-mark/add-mark.component';
import { AddModelComponent } from './components/admin/add-model/add-model.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { AddSubcategoryComponent } from './components/admin/add-subcategory/add-subcategory.component';
import { AddPartComponent } from './components/admin/add-part/add-part.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { DrahDropUploadDirective } from './components/admin/drah-drop-upload.directive';
import { HesitateDirective } from './hesitate.directive';
import { ListaDelovaComponent } from './components/lista-delova/lista-delova.component';

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PocetnaComponent,
    PretrazivacComponent,
    DeloviComponent,
    DeoComponent,
    SadrzajComponent,
    AdminComponent,
    AddMarkComponent,
    AddModelComponent,
    AddCategoryComponent,
    AddSubcategoryComponent,
    AddPartComponent,
    LoginComponent,
    DrahDropUploadDirective,
    HesitateDirective,
    ListaDelovaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {}

