import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { Company } from 'src/app/models/company/company';
import { Parking } from 'src/app/models/parking/parking';
import { CompanyService } from 'src/app/services/company.service';
import { ParkingService } from 'src/app/services/parking.service';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-reserve-parking',
  templateUrl: './reserve-parking.component.html',
  styleUrls: ['./reserve-parking.component.css'],
})
export class ReserveParkingComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private parkingService: ParkingService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  form!: FormGroup;
  companies: Company[] = [];
  parkings: Parking[] = [];
  parkingCompany: Parking[] = [];
  dataSource: Parking[] = [];
  mostrarTabela: boolean = false;
  headers = [
    'Reserve',
    'Codigo',
    'Numero',
    'Status',
    'Veiculo',
    'ClassificacaoFisica',
  ];

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.createForm();
    this.loadData();
    this.form.controls.empresa.valueChanges.subscribe((value) =>
      this.findParkingForCompany(value)
    );
    this.resetForm();
  }

  onReserve(parking: Parking) {
    const dialogRef = this.matDialog.open(PaymentComponent, {
      data: parking,
    });
  }

  private createForm() {
    return (this.form = this.fb.group({
      empresa: [null, [Validators.required]],
    }));
  }

  private resetForm() {
    this.form.setValue({
      empresa: null,
    });
  }

  private loadData() {
    forkJoin([this.companyService.findAll(), this.parkingService.findAll()])
      .pipe()
      .subscribe(
        ([company, parkings]) => {
          this.companies = company;
          this.parkings = parkings;
        },
        (error) => {
          this._snackBar.open(
            'Erro ao encontrar as empresas ou vagas!! ' + error,
            'Fechar',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
            }
          );
        }
      );
  }

  private findParkingForCompany(companyId: number) {
    const parkingList = this.parkings.filter(
      (parking) => parking.codEmpresa === companyId
    );
    this.dataSource = parkingList.filter((parking) => parking.status === false);
    this.mostrarTabela = true;
  }
}
