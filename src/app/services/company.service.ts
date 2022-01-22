import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './../models/company/company';

const company_Url = '/api/empresa';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private httpCliente: HttpClient) {}

  add(company: Company) {
    return this.httpCliente.post(company_Url, company).pipe();
  }

  findById(codigo: number): Observable<Company> {
    return this.httpCliente.get<Company>(`${company_Url}/${codigo}`);
  }

  findAll() {
    return this.httpCliente.get<Company[]>(`${company_Url}`).pipe();
  }

  updateById(company: Company) {
    return this.httpCliente
      .put(`${company_Url}/${company.codigo}`, company)
      .pipe();
  }
}
