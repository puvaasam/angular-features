import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserPayload } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = '/v1';
  private readonly authorizationToken = 'Bearer demo-token';

  private buildHeaders(extra?: Record<string, string>): HttpHeaders {
    return new HttpHeaders({
      'x-trace-id': crypto.randomUUID(),
      'x-authorization': this.authorizationToken,
      Accept: 'application/json',
      ...extra
    });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBaseUrl}/users`, {
      headers: this.buildHeaders()
    });
  }

  create(payload: UserPayload): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/user`, payload, {
      headers: this.buildHeaders()
    });
  }

  update(payload: User): Observable<User> {
    return this.http.put<User>(`${this.apiBaseUrl}/user`, payload, {
      headers: this.buildHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.request<void>('DELETE', `${this.apiBaseUrl}/user/${id}`, {
      body: {},
      headers: this.buildHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
