import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import PasswordValidator from '../utils/password-validator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthRequest } from '../utils/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.minLength(8)]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    const authRequest: AuthRequest = this.authForm.value;

    if (this.isLoginMode) {
      this._auth.signIn(authRequest);
    } else {
      this._auth.signUp(authRequest);
    }

    this._router.navigate(['list']);
    // todo: add post processing on then()
  }

  onChangeMode(): void {
    this.isLoginMode = !this.isLoginMode;

    if (this.isLoginMode) {
      this.authForm.clearValidators();
      this.authForm
        .get('confirmPassword')
        ?.setValidators([Validators.minLength(8)]);
      this.authForm.get('confirmPassword')?.setValue('');
    } else {
      this.authForm.setValidators(
        PasswordValidator.match('password', 'confirmPassword')
      );
      this.authForm
        .get('confirmPassword')
        ?.setValidators([Validators.minLength(8), Validators.required]);
    }

    this.authForm.get('confirmPassword')?.updateValueAndValidity();
  }
}
