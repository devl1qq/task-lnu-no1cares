import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import PasswordValidator from '../utils/password-validator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true;

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
    console.log(this.f['confirmPassword'].errors);

    console.log(this.authForm.value);
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
