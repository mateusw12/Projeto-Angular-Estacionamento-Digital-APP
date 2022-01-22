import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../../models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
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
  }

  private createForm() {
    return (this.form = this.fb.group({
      nomeUsuario: ['', [Validators.required]],
      senha: ['', Validators.required],
    }));
  }

  private getModel(): User {
    const formValue = this.form.getRawValue();
    const model = new User();
    model.nomeUsuario = formValue.nomeUsuario as string;
    model.senha = formValue.senha as string;
    return model;
  }

  onSubmit() {
    if (this.form.valid && this.form.touched) {
      const model = this.getModel();
      // this.userService.findByLogin(model.nomeUsuario, model.senha).subscribe(
      //   (users) => {
          this._snackBar.open('Login realizado com sucesso!!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
          this.router.navigate(['/home-view']);
      //   },
      //   (error) => {
      //     this._snackBar.open(
      //       'Falha ao realizar o login. Verifique seus Dados!!',
      //       'Fechar',
      //       {
      //         horizontalPosition: this.horizontalPosition,
      //         verticalPosition: this.verticalPosition,
      //         duration: 3000,
      //       }
      //     );
      //   }
      // );
    }
  }
  onExit(): void {
    this.router.navigate(['']);
  }
}
