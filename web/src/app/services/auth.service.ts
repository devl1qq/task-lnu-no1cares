import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from '../utils/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'your_backend_api_url'; // will be replaced with backend API URL

  constructor(private _http: HttpClient, private _router: Router) {}

  signUp(request: AuthRequest) {
    const url = `${this.apiUrl}/signup`; // will be replaced with signup API endpoint
    return this._http.post(url, request);
  }

  signIn(request: AuthRequest) {
    const url = `${this.apiUrl}/signin`; // will be replaced with signin API endpoint

    this._http.post(url, request).subscribe(
      (response: any) => {
        this._authenticate(response);
      },
      (error) => {
        console.error('Sign-in failed:', error);
      }
    );
  }

  signOut() {
    localStorage.clear();
    this._router.navigate(['auth']);
  }

  isLoggedIn(): boolean {
    const idToken = localStorage.getItem('idToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
  
    return !!idToken || !!refreshToken || !!accessToken;
  }
  

  private _authenticate(response: any) {
    const { idToken, refreshToken, accessToken } = response;

    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('accessToken', accessToken);

    this._router.navigate(['main-page']); // will be replaced with the appropriate route
  }
}
