import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/company-login/login';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css'],
})
export class CompanyLoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    return (this.form = this.fb.group({
      nome: ['', [Validators.required]],
      senha: ['', Validators.required],
    }));
  }
  getModel(): Login {
    const formValue = this.form.getRawValue();
    const model = new Login();
    model.nome = formValue.nome as string;
    model.senha = formValue.senha as string;
    return model;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const model = this.getModel();
      this._snackBar.open('Login realizado com sucesso!!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
      this.router.navigate(['/company-view']);
    }
  }
  onExit(): void {
    this.router.navigate(['']);
  }
}
