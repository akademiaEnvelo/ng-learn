import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

const noPhraseValidator = (phrase: string): ValidatorFn => {
  return (control: AbstractControl) => {
    console.log('do validatora', control.value);
    return control.value.toLowerCase().includes(phrase)
      ? { noReal: true }
      : null;
  };
};

const noRealValidator: ValidatorFn = (control: AbstractControl) => {
  console.log('do validatora', control.value);
  return control.value.toLowerCase().includes('real') ? { noReal: true } : null;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  logoPreviewURL = null;

  teamForm = this.createForm();

  get teamNameCtrl() {
    return this.teamForm.controls.teamName;
  }

  // clubNameControl = new FormControl(
  //   {
  //     disabled: true,
  //     value: 5546,
  //   },
  //   {
  //     updateOn: 'blur',
  //     nonNullable: true,
  //   }
  // );

  constructor(private builder: NonNullableFormBuilder) {
    this.teamForm.valueChanges.subscribe(console.log);
  }

  sendForm() {
    this.teamForm.markAllAsTouched();

    if (this.teamForm.invalid) {
      return;
    }

    // handle...
    console.log(this.teamForm.value);
  }

  private createForm() {
    return this.builder.group({
      teamName: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          noPhraseValidator('fc barcelona'),
        ],
      }),
      coachName: this.builder.control(''),
      clubLogo: this.builder.control<File | null>(null),
    });
  }
}
