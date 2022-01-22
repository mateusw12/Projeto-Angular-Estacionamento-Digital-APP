import { CompanyViewComponent } from './pages/company/company-view/company-view.component';
import { CompanyRegistrationComponent } from './pages/company/company-registration/company-registration.component';
import { CompanyLoginComponent } from './pages/company/company-login/company-login.component';
import { CompanyAccountChangeComponent } from './pages/company/company-view/company-account-change/company-account-change.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountChangeComponent } from './pages/user/home-view/account-change/account-change.component';
import { HomeViewComponent } from './pages/user/home-view/home-view.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/user/login/login.component';
import { UserRegistrationComponent } from './pages/user/user-registration/user-registration.component';
import { CompanyParkingRegistrationComponent } from './pages/company/company-view/company-parking-registration/company-parking-registration.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'user-login',
    component: LoginComponent,
  },
  {
    path: 'company-login',
    component: CompanyLoginComponent,
  },
  {
    path: 'user-registration',
    component: UserRegistrationComponent,
  },
  {
    path: 'home-view',
    component: HomeViewComponent,
  },
  {
    path: 'account-change',
    component: AccountChangeComponent,
  },
  {
    path: 'company-account-change',
    component: CompanyAccountChangeComponent,
  },
  {
    path: 'company-login',
    component: CompanyLoginComponent,
  },
  {
    path: 'company-home-view',
    component: CompanyLoginComponent,
  },
  {
    path: 'company-parking-registration',
    component: CompanyParkingRegistrationComponent,
  },
  {
    path: 'company-registration',
    component: CompanyRegistrationComponent,
  },
  {
    path: 'company-view',
    component: CompanyViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
