import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZipCode } from './../models/ZIpCode/zipCode';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeService {
  constructor(private httpCliente: HttpClient) {}

  get(zipCode: string) {
    return this.httpCliente.get<ZipCode>(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
  }
}
