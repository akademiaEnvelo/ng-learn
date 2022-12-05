import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormControl,
  FormGroup,
  FormArray,
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

type Form = FormGroup<{
  teamName: FormControl<string>;
  coachName: FormControl<string>;
  clubLogo: FormControl<File | null>;
  hasCreatedYear: FormControl<boolean>;
  createdAt: FormControl<string>;
  players: FormArray<FormGroup<PlayerForm>>;
  telephone?: FormGroup<any>;
}>;

interface PlayerForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  favFoot: FormControl<'left' | 'right' | 'both'>;
  onLoan: FormControl<boolean>;
}

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

  setLogoFileToForm(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.teamForm.controls.clubLogo.setValue(file);
    }
  }

  addPlayer() {
    this.teamForm.controls.players.push(this.createPlayerForm());
  }

  removePlayer(index: number) {
    if (!confirm()) {
      return;
    }

    this.teamForm.controls.players.removeAt(index);
  }

  private createPlayerForm() {
    return this.builder.group<PlayerForm>({
      firstName: this.builder.control(''),
      favFoot: this.builder.control('right'),
      lastName: this.builder.control(''),
      onLoan: this.builder.control(false),
    });
  }

  private createForm() {
    const form = this.builder.group({
      teamName: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          noPhraseValidator('fc barcelona'),
        ],
      }),
      coachName: this.builder.control(''),
      clubLogo: this.builder.control<File | null>(null),
      hasCreatedYear: this.builder.control(false),
      createdAt: this.builder.control({ disabled: true, value: '' }),
      players: this.builder.array<FormGroup<PlayerForm>>([
        this.createPlayerForm(),
      ]),
      team: this.builder.group({}),
      telephone: this.builder.group({
        home: this.builder.control(''),
        work: this.builder.control(''),
        fax: this.builder.control(''),
      }),
    });

    form.controls.hasCreatedYear.valueChanges.subscribe((value) => {
      if (value) {
        form.controls.createdAt.enable();
      } else {
        form.controls.createdAt.disable();
      }
    });

    // dynamiczne dodawanie/usuwanie kontrolek
    // form.controls.hasCreatedYear.valueChanges.subscribe((value) => {
    //   if (value) {
    //     form.addControl('createdAt', this.builder.control(''));
    //   } else {
    //     form.removeControl('createdAt');
    //   }
    // });

    return form;
  }
}
