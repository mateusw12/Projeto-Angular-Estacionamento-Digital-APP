import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './../models/company/company';
import { Reserve } from './../models/reserve/reserve';

const reserve_Url = '/api/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  constructor(private httpCliente: HttpClient) {}

  add(reserve: Reserve) {
    return this.httpCliente.post(reserve_Url, reserve).pipe();
  }

  findById(reserve: Reserve) {
    return this.httpCliente
      .get<Company>(`${reserve_Url}/${reserve.codigo}`)
      .pipe();
  }

  update(reserve: Reserve) {
    return this.httpCliente
      .put(`${reserve_Url}/${reserve.codigo}`, reserve)
      .pipe();
  }
}
