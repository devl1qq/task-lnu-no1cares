import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from '../utils/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {}

  signUp(request: AuthRequest) {
    // request to server
  }

  signIn(request: AuthRequest) {
    // request to server

    // if success
    const timeout = 3_300_000; // 55min

    setTimeout(this._authenticate, timeout);
  }

  signOut() {
    localStorage.clear();
    this._router.navigate(['auth']);
  }

  isLoggedIn(): boolean {
    // call server
    return false;
  }

  private _authenticate() {
    // call server
  }
}
