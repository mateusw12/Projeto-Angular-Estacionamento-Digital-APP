import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/models/vehicle/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

interface Color {
  value: string;
}

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.css'],
})
export class VehicleRegistrationComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dataSource!: MatTableDataSource<Vehicle>;
  vehicles: Vehicle[] = [];
  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.createForm();
    this.populateList();
  }
  headers = [
    'edit',
    'delete',
    'NomeVeiculo',
    'Codigo',
    'Cor',
    'Renavam',
    'Placa',
    'Ano',
  ];
  cor: Color[] = [
    { value: 'Branco' },
    { value: 'Preto' },
    { value: 'Azul' },
    { value: 'Amarelo' },
    { value: 'Verde' },
    { value: 'Cinza' },
    { value: 'Prata' },
    { value: 'Vermelho' },
    { value: 'Roxo' },
    { value: 'Laranja' },
  ];

  onSubmit() {
    const model = this.getModel();
    const exists = model.codigo > 1;
    if (
      exists
        ? this.vehicleService.update(model).subscribe(
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
        : this.vehicleService.add(model).subscribe(
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

  onUpdate(element: Vehicle): void {
    this.vehicleService.findById(element).subscribe(
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

  onRemove(element: Vehicle): void {
    this.vehicleService.deleteById(element.codigo).subscribe(
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

  private createForm() {
    return (this.form = this.fb.group({
      veiculo: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(200)]),
      ],
      renavam: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(11)]),
      ],
      placa: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(7)]),
      ],
      cor: [null, Validators.required],
      ano: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(1980),
          Validators.maxLength(4),
        ]),
      ],
      codigo: [null],
    }));
  }

  private resetForm(): void {
    this.form.reset();
  }

  private getModel(): Vehicle {
    const model = new Vehicle();
    const formValue = this.form.getRawValue();
    model.cor = formValue.cor as string;
    model.veiculo = formValue.veiculo as string;
    model.placa = formValue.placa as string;
    model.renavam = formValue.renavam as string;
    model.ano = formValue.ano as number;
    model.codUsuario = 1;
    model.codigo = formValue.codigo as number;
    return model;
  }

  private populateList(): void {
    this.vehicleService.findAll().subscribe(
      (parking) => {
        this.dataSource = new MatTableDataSource(parking);
        this.vehicles = parking;
      },
      (error) => {
        this._snackBar.open(
          'Erro ao popular a tabela. Verifique a API ' + error,
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

  private populateForm(vehicle: Vehicle) {
    this.form.patchValue({
      cor: vehicle.cor,
      veiculo: vehicle.veiculo,
      placa: vehicle.placa,
      renavam: vehicle.renavam,
      ano: vehicle.ano,
      codigo: vehicle.codigo,
    });
  }
}
