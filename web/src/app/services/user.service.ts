import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../utils/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:5001/api';

  constructor(private _http: HttpClient) {}

  getUser(userId: string): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/user?id=${userId}`);
  }

  updateUser(user: User): Observable<any> {
    return this._http.put(`${this.apiUrl}/user`, user);
  }
}
