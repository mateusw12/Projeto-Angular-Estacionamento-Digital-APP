import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HelpComponent } from '../../help/help.component';
import { SupportComponent } from './../../support/support.component';
import { AccountChangeComponent } from './account-change/account-change.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent implements OnInit {
  navLinks = [
    { link: './vechile-registration', label: 'Cadastro de Veículo', index: 0 },
    { path: 'home-view/reserve-parking', label: 'Reserva de Vaga' },
  ];
  panelOpenState = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onExit() {
    this.router.navigate(['/user-login']);
  }
  onManageChange() {
    const dialogRef = this.dialog.open(AccountChangeComponent, {
      disableClose: true,
    });
  }

  onHelp() {
    const dialogRef = this.dialog.open(HelpComponent, {
      disableClose: true,
    });
  }
  onSupport() {
    const dialogRef = this.dialog.open(SupportComponent, {
      disableClose: true,
    });
  }
}
