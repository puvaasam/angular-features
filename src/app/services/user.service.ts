import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserPayload, LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = '/v1';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}/login`, credentials);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBaseUrl}/users`);
  }

  create(payload: UserPayload): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/user`, payload);
  }

  update(payload: User): Observable<User> {
    return this.http.put<User>(`${this.apiBaseUrl}/user`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.request<void>('DELETE', `${this.apiBaseUrl}/user/${id}`, {
      body: {},
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
