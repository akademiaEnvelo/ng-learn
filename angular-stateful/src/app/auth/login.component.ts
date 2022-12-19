import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { AuthStateService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="form" (ngSubmit)="login()">
      <fieldset>
        <input formControlName="email" />
      </fieldset>

      <fieldset>
        <input formControlName="password" type="password" />
      </fieldset>

      <button (keyup.enter)="login()">Login</button>
    </form>
  `,
  styles: [],
})
export class LoginComponent {
  authService = inject(AuthStateService);
  builder = inject(NonNullableFormBuilder);

  form = this.builder.group({
    email: this.builder.control('test@test.pl'),
    password: this.builder.control('testtest'),
  });

  login() {
    this.authService.login(this.form.getRawValue()).subscribe(console.log);
  }
}
