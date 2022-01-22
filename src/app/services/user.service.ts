import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user/user';

const user_Url = '/api/usuario';
const login_url = '/api/v1/auth/signin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpCliente: HttpClient) {}

  add(user: User) {
    return this.httpCliente.post(user_Url, user).pipe();
  }

  token(user: User) {
    return this.httpCliente.post<User>(login_url, user).pipe();
  }

  findById(codigo: number) {
    return this.httpCliente.get<User>(`${user_Url}/${codigo}`).pipe();
  }

  findByLogin(nomeUsuario: string, senha: string) {
    return this.httpCliente.get<User[]>(`${user_Url}/login/${nomeUsuario}/${senha}`).pipe();
  }

  findAll() {
    return this.httpCliente.get<User[]>(`${user_Url}`).pipe();
  }

  updateById(user: User) {
    const codigo = user.codigo;
    return this.httpCliente.put<User>(`${user_Url}/${codigo}`, user).pipe();
  }
}
