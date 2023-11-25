import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../utils/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUser(): User {
    // return this._http.get('https://localhost:5001/api/user');
    return {
      id: 11111,
      email: 'fake@fake.com',
      firstName: 'string',
      lastName: 'string',
      token: 'string',
    };
  }

  updateUser(user: User) {
    // return this._http.put('https://localhost:5001/api/user', {});
  }
}
