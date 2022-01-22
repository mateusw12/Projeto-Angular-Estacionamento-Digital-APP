import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyLoginComponent } from './pages/company/company-login/company-login.component';
import { CompanyRegistrationComponent } from './pages/company/company-registration/company-registration.component';
import { CompanyAccountChangeComponent } from './pages/company/company-view/company-account-change/company-account-change.component';
import { CompanyParkingRegistrationComponent } from './pages/company/company-view/company-parking-registration/company-parking-registration.component';
import { CompanyViewComponent } from './pages/company/company-view/company-view.component';
import { HelpComponent } from './pages/help/help.component';
import { IndexComponent } from './pages/index/index.component';
import { InformationComponent } from './pages/information/information.component';
import { SupportComponent } from './pages/support/support.component';
import { AccountChangeComponent } from './pages/user/home-view/account-change/account-change.component';
import { HomeViewComponent } from './pages/user/home-view/home-view.component';
import { PaymentComponent } from './pages/user/home-view/reserve-parking/payment/payment.component';
import { ReserveParkingComponent } from './pages/user/home-view/reserve-parking/reserve-parking.component';
import { VehicleRegistrationComponent } from './pages/user/home-view/vehicle-registration/vehicle-registration.component';
import { LoginComponent } from './pages/user/login/login.component';
import { PaymentMethodsComponent } from './pages/user/payment-methods/payment-methods.component';
import { UserRegistrationComponent } from './pages/user/user-registration/user-registration.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    LoginComponent,
    HomeViewComponent,
    IndexComponent,
    VehicleRegistrationComponent,
    PaymentMethodsComponent,
    ReserveParkingComponent,
    AccountChangeComponent,
    SupportComponent,
    HelpComponent,
    InformationComponent,
    CompanyLoginComponent,
    CompanyRegistrationComponent,
    CompanyParkingRegistrationComponent,
    CompanyViewComponent,
    CompanyAccountChangeComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    ToastAllModule,
    ButtonAllModule,
    MatSnackBarModule,
    MatInputModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
