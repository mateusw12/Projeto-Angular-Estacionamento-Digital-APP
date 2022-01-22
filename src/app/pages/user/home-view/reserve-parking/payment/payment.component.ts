import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Parking } from 'src/app/models/parking/parking';
import { CompanyService } from 'src/app/services/company.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Reserve } from '../../../../../models/reserve/reserve';
import { User } from '../../../../../models/user/user';
import { ReserveService } from '../../../../../services/reserve.service';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  form!: FormGroup;
  user: User[] = [];
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private vechicleService: VehicleService,
    private reserService: ReserveService,
    @Inject(MAT_DIALOG_DATA) public data: { data: Reserve }
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.populateForm(this.data);
    this.createForm();
  }

  private createForm() {
    return (this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      veiculo: ['', Validators.required],
      classificacaoFisica: ['', Validators.required],
      codigoVaga: ['', Validators.required],
      numero: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      codigo: [''],
      agencia: ['', Validators.required],
      numeroCartao: ['', Validators.required],
      ccv: ['', Validators.required],
      validadeCartao: ['', Validators.required],
    }));
  }

  private populateForm(reserve: any): void {
    const model = reserve as Parking;
    forkJoin([
      this.userService.findById(1),
      this.vechicleService.findByUserId(1),
    ])
      .pipe()
      .subscribe(([user, vechicle]) => {
        this.form.patchValue({
          nome: user.nomeUsuario,
          cpf: user.cpf,
          veiculo: model.veiculo,
          numero: model.numero,
          classificacaoFisica: model.classificacaoFisica,
          codigoVaga: model.codigo,
        });
      });
  }

  private getModel(): Reserve {
    const model = new Reserve();
    const formValue = this.form.getRawValue();
    model.codigo = 0;
    model.codUsuario = 1;
    model.codEmpresa = 1;
    model.codVeiculo = formValue.codigoVeiculo as number;
    model.dataInicio = formValue.dataInicio as Date;
    model.dataFim = formValue.dataFim as Date;
    return model;
  }

  onSubmit() {
    const model = this.getModel();
  }
}
