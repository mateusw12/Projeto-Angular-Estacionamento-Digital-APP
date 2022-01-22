import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-change',
  templateUrl: './account-change.component.html',
  styleUrls: ['./account-change.component.css'],
})
export class AccountChangeComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  dateFinal: Date = new Date();
  dateInicial: Date = new Date('01/01/1950');
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }

  createForm() {
    return (this.form = this.fb.group({
      email: ['', [Validators.email]],
      senha: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required, this.validateCpf],
      dataNasc: ['', Validators.required],
      nomeUsuario: ['', Validators.required],
      codigo: [''],
    }));
  }

  onSubmit() {
    if (!this.form.valid) return;
    const model = this.getModel();
    this.userService.updateById(model).subscribe(
      () => {
        this._snackBar.open('Conta Alterada com sucesso!!', 'Fechar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
        this.router.navigate(['/home-view']);
      },
      (error) => {
        this._snackBar.open(
          'Erro ao alterar a conta. Verifique os Dados!!',
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

  ngOnDestroy(): void {}

  private validateCpf(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value as string;
    if (!value) return null;
    if (cpf.isValid(value)) {
      return null;
    } else {
      this._snackBar.open('CPF inválido!!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
      return {
        validateCpf: 'CPF inválido',
      };
    }
  }

  private getModel(): User {
    const model = new User();
    const formValue = this.form.getRawValue();
    model.cpf = formValue.cpf as string;
    model.dataNasc = formValue.dataNasc as Date;
    model.email = formValue.email as string;
    model.nome = formValue.nome as string;
    model.senha = formValue.senha as string;
    model.nomeUsuario = formValue.nomeUsuario as string;
    model.codigo = formValue.codigo as number;
    return model;
  }

  private loadData() {
    this.userService.findById(1).subscribe(
      (user) => {
        this.populateForm(user);
      },
      (error) => {
        this._snackBar.open(
          'Erro ao encontrar o usuário!! ' + error,
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

  private populateForm(user: User) {
    this.form.patchValue({
      dataNasc: user.dataNasc,
      email: user.email,
      nome: user.nome,
      senha: user.senha,
      nomeUsuario: user.nomeUsuario,
      codigo: user.codigo,
      cpf: user.cpf,
    });
  }
}
