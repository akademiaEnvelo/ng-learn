import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'app-start-with',
  template: `
    <div class="flex">
      <form [formGroup]="form" class="w-1/2">
        <input formControlName="name" class="block bg-gray-400" />
        <select formControlName="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </form>

      <section *ngIf="formValue$ | async as value">
        <p>Name: {{ value.name || '-' }}</p>
        <p>Gender: {{ value.gender }}</p>
      </section>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartWithComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: this.fb.control(''),
    gender: this.fb.control<'male' | 'female'>('male'),
  });

  formValue$ = this.form.valueChanges.pipe(startWith(this.form.value));
}
