import { Vehicle } from './../models/vehicle/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const vehicle_Url = '/api/veiculo';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private httpCliente: HttpClient) {}

  add(vehicle: Vehicle) {
    return this.httpCliente.post(vehicle_Url, vehicle).pipe();
  }

  deleteById(codigo: number) {
    return this.httpCliente.delete(`${vehicle_Url}/${codigo}`).pipe();
  }

  findById(vehicle: Vehicle) {
    return this.httpCliente
      .get<Vehicle>(`${vehicle_Url}/${vehicle.codigo}`)
      .pipe();
  }

  findAll() {
    return this.httpCliente.get<Vehicle[]>(`${vehicle_Url}`).pipe();
  }

  findByUserId(codigoUsuario: number) {
    return this.httpCliente
      .get<Vehicle>(`${vehicle_Url}/usuario/${codigoUsuario}`)
      .pipe();
  }

  update(vehicle: Vehicle) {
    return this.httpCliente
      .put(`${vehicle_Url}/${vehicle.codigo}`, vehicle)
      .pipe();
  }
}
