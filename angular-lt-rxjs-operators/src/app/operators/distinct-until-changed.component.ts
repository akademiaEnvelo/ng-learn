import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-distinct-until-changed',
  template: `
    <div class="flex">
      <form [formGroup]="form" class="w-1/2">
        <input formControlName="name" class="block bg-gray-400" />
        <select formControlName="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistinctUntilChangedComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: this.fb.control(''),
    gender: this.fb.control<'male' | 'female'>('male'),
  });

  ngOnInit() {
    this.form.controls.name.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(console.log);

    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged((prev, curr) => {
          return prev.gender === curr.gender && prev.name === curr.name;
        })
      ) // {} === {}
      .subscribe((value) => {
        console.log(value);
      });
  }
}
