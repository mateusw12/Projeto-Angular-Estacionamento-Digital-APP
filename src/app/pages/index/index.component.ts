import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onUSer(): void {
    this.router.navigate(['/user-login']);
  }
  onCompany(): void {
    this.router.navigate(['/company-login']);
  }
}
