import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { cpf } from 'cpf-cnpj-validator';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  dateFinal: Date = new Date();
  dateInicial: Date = new Date('01/01/1950');
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.createForm();
  }

  onExit() {
    this.form.reset();
    this.router.navigate(['/user-login']);
  }

  OnSubmit() {
    if (this.form.valid && this.form.touched) {
      const model = this.getModel();
      this.userService.add(model).subscribe(
        () => {
          this.form.reset();
          this._snackBar.open('Usuário cadastrado com sucesso!! ', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
          this.resetForm();
          this.router.navigate(['/user-login']);
        },
        (error) => {
          this._snackBar.open(
            'Erro ao cadastrar o usuário!! ' + error,
            'Fechar',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
            }
          );
          this.resetForm();
        }
      );
    }
  }

  private resetForm():void{
    this.form.reset();
  }

  private createForm() {
    return (this.form = this.fb.group({
      email: ['', [Validators.email]],
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
      dataNasc: ['', [Validators.required]],
      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(11),
          this.validateCpf,
        ]),
      ],
      nomeUsuario: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(11)]),
      ],
    }));
  }

  private validateCpf(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value as string;
    if (!value) return null;
    if (cpf.isValid(value)) {
      return null;
    } else {
      this._snackBar.open('CPF inválidp!! ', 'Fechar', {
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
    const formvalue = this.form.getRawValue();
    model.cpf = formvalue.cpf as string;
    model.dataNasc = formvalue.dataNasc as Date;
    model.email = formvalue.email as string;
    model.nome = formvalue.nome as string;
    model.senha = formvalue.senha as string;
    model.nomeUsuario = formvalue.nomeUsuario as string;
    return model;
  }
}
