import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parking } from '../models/parking/parking';

const parking_Url = '/api/vaga';
const parking_company_Url = 'vaga/empresa';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private httpCliente: HttpClient) {}

  add(parking: Parking) {
    return this.httpCliente.post(parking_Url, parking).pipe();
  }

  findById(parking: Parking) {
    return this.httpCliente
      .get<Parking>(`${parking_Url}/${parking.codigo}`)
      .pipe();
  }

  deleteById(codigo: number) {
    return this.httpCliente.delete(`${parking_Url}/${codigo}`).pipe();
  }

  findAll() {
    return this.httpCliente.get<Parking[]>(`${parking_Url}`).pipe();
  }

  findAllByCompany(codEmpresa: number) {
    return this.httpCliente
      .get<Parking[]>(`${parking_company_Url}/empresa/${codEmpresa}`)
      .pipe();
  }

  update(parking: Parking) {
    return this.httpCliente
      .put<Parking>(`${parking_Url}/${parking.codigo}`, parking)
      .pipe();
  }
}
