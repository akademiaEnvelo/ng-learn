import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';

export function debounceInput() {
  return debounceTime(1000);
}

@Component({
  selector: 'app-debounce-time',
  template: `
    <div class="flex">
      <form [formGroup]="form" class="w-1/2">
        <input formControlName="name" class="block bg-gray-400" />
        <select formControlName="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <p>Name: {{ name$ | async }}</p>
        <p>Name with debounceTime: {{ nameWithDebounce$ | async }}</p>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebounceTimeComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: this.fb.control(''),
    gender: this.fb.control<'male' | 'female'>('male'),
  });

  name$ = this.form.controls.name.valueChanges;
  nameWithDebounce$ = this.form.controls.name.valueChanges.pipe(
    debounceInput()
  );

  ngOnInit() {}
}
