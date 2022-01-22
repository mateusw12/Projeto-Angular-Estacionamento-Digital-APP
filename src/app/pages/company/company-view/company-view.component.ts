import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HelpComponent } from '../../help/help.component';
import { SupportComponent } from '../../support/support.component';
import { CompanyAccountChangeComponent } from './company-account-change/company-account-change.component';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.css'],
})
export class CompanyViewComponent implements OnInit, OnDestroy {
  navLinks = [
    { link: './vechile-registration', label: 'Cadastro de Veículo', index: 0 },
    { path: 'company-view/reserve-parking', label: 'Reserva de Vaga' },
  ];
  panelOpenState = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onExit() {
    this.router.navigate(['company-login']);
  }

  onManageChange(): void {
    const dialogRef = this.dialog.open(CompanyAccountChangeComponent, {
      disableClose: true,
    });
  }

  onHelp(): void {
    const dialogRef = this.dialog.open(HelpComponent, {
      disableClose: true,
    });
  }

  onSupport(): void {
    const dialogRef = this.dialog.open(SupportComponent, {
      disableClose: true,
    });
  }
}
