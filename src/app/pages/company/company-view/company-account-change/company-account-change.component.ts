import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { cnpj } from 'cpf-cnpj-validator';
import { Company } from 'src/app/models/company/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-account-change',
  templateUrl: './company-account-change.component.html',
  styleUrls: ['./company-account-change.component.css'],
})
export class CompanyAccountChangeComponent implements OnInit {
  form!: FormGroup;
  dateFinal: Date = new Date();
  dateInicial: Date = new Date('01/01/1950');
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }

  onSubmit(): void {
    if (this.form.valid === true) {
      const dialogRef = this.dialog.open(CompanyAccountChangeComponent, {
        disableClose: true,
      });
      const model = this.getModel();
      if (this.validateCnpj(model.cnpj)) {
        this.companyService.updateById(model).subscribe(
          () => {
            this._snackBar.open('Vaga Alterada com sucesso!!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
            });
            this.router.navigate(['/company-view']);
          },
          (error) => {
            this._snackBar.open(
              'Vaga Alterada com sucesso!!' + error,
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
  }

  ngOnDestroy(): void {}

  private createForm() {
    return (this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(200)]],
      nomeFantasia: ['', Validators.required, Validators.maxLength(200)],
      senha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200),
        ]),
      ],
      cnpj: ['', Validators.required, Validators.maxLength(11)],
      cep: ['', Validators.required, Validators.maxLength(11)],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      endereco: ['', Validators.required],
      estado: ['', Validators.required],
      codigo: [''],
    }));
  }

  private getModel(): Company {
    const model = new Company();
    const formValue = this.form.getRawValue();
    model.bairro = formValue.bairro as string;
    model.cep = formValue.cep as string;
    model.cidade = formValue.cidade as string;
    model.cnpj = formValue.cnpj as string;
    model.endereco = formValue.endereco as string;
    model.estado = formValue.estado as string;
    model.nome = formValue.nome as string;
    model.nomeFantasia = formValue.nomeFantasia as string;
    model.senha = formValue.senha as string;
    return model;
  }

  private async loadData(): Promise<void> {
    this.companyService
      .findById(1)
      .pipe()
      .subscribe(
        async (company) => {
          await this.populateForm(company);
        },
        (error) => {
          this._snackBar.open('Erro ao encontrar a empresa!! ', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        }
      );
  }

  private async populateForm(company: Company): Promise<void> {
    this.form.patchValue({
      nome: company.nome,
      nomeFantasia: company.nomeFantasia,
      senha: company.senha,
      cnpj: company.cnpj,
      cep: company.cep,
      cidade: company.cidade,
      bairro: company.bairro,
      endereco: company.endereco,
      estado: company.estado,
    });
  }

  private validateCnpj(control: String): boolean {
    const value: string = control as string;
    if (!value) return false;
    if (cnpj.isValid(value)) {
      return true;
    } else {
      this._snackBar.open('CNPJ inválido!!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
      return false;
    }
  }
}
