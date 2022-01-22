import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Parking } from 'src/app/models/parking/parking';
import { ParkingService } from 'src/app/services/parking.service';

interface List {
  value: string;
}

export interface Vagas {
  edit: string;
  delete: number;
  numero: number;
  veiculo: string;
  classificacaoFisica: string;
  status: boolean;
}

@Component({
  selector: 'app-company-parking-registration',
  templateUrl: './company-parking-registration.component.html',
  styleUrls: ['./company-parking-registration.component.css'],
})
export class CompanyParkingRegistrationComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dataSource!: MatTableDataSource<Parking>;
  form!: FormGroup;
  displayedColumns: string[] = [
    'edit',
    'delete',
    'numero',
    'veiculo',
    'classificacaoFisica',
    'status',
  ];
  private parkings!: Parking[];
  private oldNumber = 0;
  private oldId = 0;
  veiculo: List[] = [
    { value: 'Carro' },
    { value: 'Caminhão' },
    { value: 'Moto' },
  ];

  classificacaoFisica: List[] = [
    { value: 'Normal' },
    { value: 'Deficiente' },
    { value: 'Idoso' },
  ];

  constructor(
    private fb: FormBuilder,
    private parkingService: ParkingService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.createForm();
    this.populateList();
  }

  onSubmit(): void {
    const model = this.getModel();
    const exists = model.codigo > 1;
    //const sequence = this.checkSequence(model.numero, model.codigo);
    if (!true) {
      this._snackBar.open('O número da vaga ja existe!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
      this.resetForm();
      return;
    }
    if (
      exists
        ? this.parkingService
            .update(model)
            .pipe()
            .subscribe(
              () => {
                this._snackBar.open('Vaga Alterada com sucesso!!', 'Fechar', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                });
                this.resetForm();
                this.populateList();
              },
              (error) => {
                this._snackBar.open(
                  'Erro ao atualizar a vaga. Verifique os dados!!',
                  'Fechar',
                  {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                  }
                );
                this.resetForm();
              }
            )
        : this.parkingService
            .add(model)
            .pipe()
            .subscribe(
              () => {
                this._snackBar.open('Vaga Cadastrada com sucesso!!', 'Fechar', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                });
                this.resetForm();
                this.populateList();
              },
              (error) => {
                this._snackBar.open(
                  'Erro ao cadastrar a vaga. Verifique os dados!! ' + error,
                  'Fechar',
                  {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                  }
                );
              }
            )
    )
      return;
  }

  onUpdate(element: Parking): void {
    this.oldNumber = element.numero;
    this.oldId = element.codigo;
    this.parkingService
      .findById(element)
      .pipe()
      .subscribe(
        (parking) => {
          this.populateForm(parking);
        },
        (error) => {
          this._snackBar.open('Erro ao encontrar a vaga!! ', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        }
      );
  }

  onRemove(element: Parking): void {
    this.parkingService.deleteById(element.codigo).subscribe(
      () => {
        this.populateList();
      },
      (error) => {
        this._snackBar.open('Erro ao excluir a vaga!! ', 'Fechar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private checkSequence(numero: number, codigo: number): boolean {
    const parking = this.parkings.find(
      (parking) =>
        parking.numero === this.oldNumber && parking.codigo === this.oldId
    );
    console.log(parking);
    if (parking) return true;
    return false;
  }

  private populateList(): void {
    this.parkingService
      .findAll()
      .pipe()
      .subscribe(
        (parking) => {
          this.dataSource = new MatTableDataSource(parking);
          this.parkings = parking;
        },
        (error) => {
          this._snackBar.open('Não há vagas para esta empresa!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        }
      );
  }

  private resetForm(): void {
    this.form.setValue({
      codigo: null,
      codEmpresa: null,
      classificacaoFisica: null,
      veiculo: null,
      numero: null,
      status: false,
    });
  }

  private getModel(): Parking {
    const model = new Parking();
    const formValue = this.form.getRawValue();
    model.classificacaoFisica = formValue.classificacaoFisica as string;
    model.numero = formValue.numero as number;
    model.veiculo = formValue.veiculo as string;
    model.codEmpresa = 2;
    model.codigo = formValue.codigo as number;
    model.status = formValue.status as boolean;
    return model;
  }

  private populateForm(parking: Parking): void {
    this.form.patchValue({
      numero: parking.numero,
      codEmpresa: parking.codEmpresa,
      codigo: parking.codigo,
      classificacaoFisica: parking.classificacaoFisica,
      veiculo: parking.veiculo,
      status: parking.status,
    });
  }

  private createForm() {
    return (this.form = this.fb.group({
      numero: [null, [Validators.required, Validators.min(0)]],
      veiculo: [null, Validators.required],
      classificacaoFisica: [null, Validators.required],
      codEmpresa: [null],
      codigo: [null],
      status: [false],
    }));
  }
}
