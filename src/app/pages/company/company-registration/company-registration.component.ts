import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { cnpj } from 'cpf-cnpj-validator';
import { Company } from 'src/app/models/company/company';
import { ZipCode } from 'src/app/models/ZIpCode/zipCode';
import { CompanyService } from 'src/app/services/company.service';
import { ZipCodeService } from 'src/app/services/zip-code.service';

interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css'],
})
export class CompanyRegistrationComponent implements OnInit {
  form!: FormGroup;
  dateFinal: Date = new Date();
  dateInicial: Date = new Date('01/01/1950');
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private state: State[] = [
    { value: 'AC', viewValue: 'Acre' },
    { value: 'AL', viewValue: 'Alagoas' },
    { value: 'AP', viewValue: 'Amapá' },
    { value: 'AM', viewValue: 'Amazonas' },
    { value: 'BA', viewValue: 'Bahia' },
    { value: 'CE', viewValue: 'Ceará' },
    { value: 'DF', viewValue: 'Distrito Federal' },
    { value: 'ES', viewValue: 'Espírito Santo' },
    { value: 'GO', viewValue: 'Goiás' },
    { value: 'MA', viewValue: 'Maranhão' },
    { value: 'MT', viewValue: 'Mato Grosso' },
    { value: 'MS', viewValue: 'Mato Grosso do Sul' },
    { value: 'MT', viewValue: 'Mato Grosso' },
    { value: 'MG', viewValue: 'Minas Gerais' },
    { value: 'PA', viewValue: 'Pará' },
    { value: 'PB', viewValue: 'Paraíba' },
    { value: 'PR', viewValue: 'Paraná' },
    { value: 'PE', viewValue: 'Pernambuco' },
    { value: 'PI', viewValue: 'Piauí' },
    { value: 'RJ', viewValue: 'Rio de Janeiro' },
    { value: 'RS', viewValue: 'Rio Grande do Sul' },
    { value: 'RN', viewValue: 'Rio Grande do Norte' },
    { value: 'RO', viewValue: 'Rondônia' },
    { value: 'RR', viewValue: 'Roraima' },
    { value: 'SC', viewValue: 'Santa Catarina' },
    { value: 'SP', viewValue: 'São Paulo' },
    { value: 'SE', viewValue: 'Sergipe' },
    { value: 'TO', viewValue: 'Tocantins' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private zipCodeService: ZipCodeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.createForm();
    this.getCEPField();
  }

  onExit(): void {
    this.form.reset();
    this.router.navigate(['company-login']);
  }

  OnSubmit(): void {
    if (this.form.valid && this.form.touched) {
      const model = this.getModel();
      console.log(model);
      this.companyService.add(model).subscribe(
        () => {
          this._snackBar.open('Empresa Cadastrada com sucesso!!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
          this.form.reset();
          this.router.navigate(['company-login']);
        },
        (error) => {
          this._snackBar.open(
            'Erro ao Cadastras empresa!! ' + error,
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
  }

  private createForm() {
    return (this.form = this.fb.group({
      cep: [
        '',
        Validators.compose([Validators.maxLength(8), Validators.required]),
      ],
      endereco: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      nome: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200)]),
      ],
      senha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200),
        ]),
      ],
      cnpj: [
        '',
        Validators.compose([
          Validators.maxLength(14),
          Validators.required,
          this.validateCnpj,
        ]),
      ],
      codigo: [''],
      nomeFantasia: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200)]),
      ],
    }));
  }

  private getModel(): Company {
    const model = new Company();
    const formvalue = this.form.getRawValue();
    model.cep = formvalue.cep as string;
    model.cnpj = formvalue.cnpj as string;
    model.codigo = formvalue.codigo as number;
    model.nomeFantasia = formvalue.nomeFantasia as string;
    model.senha = formvalue.senha as string;
    model.nome = formvalue.nome as string;
    model.endereco = formvalue.endereco as string;
    model.cidade = formvalue.cidade as string;
    model.estado = formvalue.estado as string;
    model.bairro = formvalue.bairro as string;
    return model;
  }

  private getCEPField(): void {
    this.form.controls.cep.valueChanges.subscribe((value) =>
      this.QueryCEP(value as string)
    );
  }

  private QueryCEP(cep: string): void {
    const validaCep = /^[0-9]{8}$/;
    if (validaCep.test(cep)) {
      this.resetForm();
      this.zipCodeService
        .get(cep)
        .subscribe((cep) => this.populateFormCep(cep));
    }
  }

  private resetForm(): void {
    this.form.patchValue({
      bairro: null,
      cidade: null,
      endereco: null,
      estado: null,
    });
  }

  private replaceState(estado: string): string {
    const state = this.state.find((a) => a.value === estado);
    if (state === undefined) return estado;
    return state!.viewValue;
  }

  private populateFormCep(zipcode: ZipCode): void {
    this.form.patchValue({
      bairro: zipcode.bairro,
      cidade: zipcode.localidade,
      endereco: zipcode.logradouro,
      estado: this.replaceState(zipcode.uf),
    });
  }

  private validateCnpj(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value as string;
    if (!value) return null;
    if (cnpj.isValid(value)) {
      return null;
    } else {
      this._snackBar.open('CNPJ inválido!!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
      return {
        validateCpf: 'CNPJ inválido',
      };
    }
  }
}
