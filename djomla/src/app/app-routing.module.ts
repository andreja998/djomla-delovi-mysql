import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { DeloviComponent } from './components/delovi/delovi.component';
import { DeoComponent } from './components/deo/deo.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { AddSubcategoryComponent } from './components/admin/add-subcategory/add-subcategory.component';
import { AddMarkComponent } from './components/admin/add-mark/add-mark.component';
import { AddModelComponent } from './components/admin/add-model/add-model.component';
import { AddPartComponent } from './components/admin/add-part/add-part.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'delovi', component: DeloviComponent },
  { path: 'deo', component: DeoComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-cat',
    component: AddCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-subcat',
    component: AddSubcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-mark',
    component: AddMarkComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-model',
    component: AddModelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-part',
    component: AddPartComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
