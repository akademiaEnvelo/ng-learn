import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, pairwise } from 'rxjs';

export interface JobOffer {
  name: string;
  description: {
    name: string;
    items: string[];
  };
  salary: number;
  techList: {
    name: string;
    seniority: 'Entry' | 'Junior' | 'Mid' | 'Senior' | 'Expert';
  }[];
}

export type JobDescription = JobOffer['description'];
export type JobTechItem = JobOffer['techList'];
export type JobTechSeniorityLevel = JobOffer['techList'][number]['seniority'];

@Component({
  selector: 'app-root',
  template: `
    <form class="p-4" [formGroup]="form" (ngSubmit)="addOffer()">
      <mat-form-field class="example-form-field">
        <mat-label>Nazwa ogłoszenia</mat-label>
        <input
          formControlName="name"
          matInput
          type="text"
          placeholder="Podaj nazwę ogłoszenia"
          required
        />
        <!-- <button matSuffix mat-icon-button aria-label="Clear" (click)="({})">
          <mat-icon>close</mat-icon>
        </button> -->
        <!-- <mat-hint>Podaj nazwę która zachęci potencjalnego pracownika!</mat-hint>
        <mat-error>Błąd!</mat-error> -->
      </mat-form-field>

      <!-- <mat-form-field> -->
      <div>
        <p>
          Podaj wynagrodzenie
          <mat-slider
            min="0"
            max="50000"
            step="100"
            value="5000"
            [discrete]="true"
          >
            <input formControlName="salary" matSliderThumb />
          </mat-slider>

          {{ form.controls.salary.value }}
        </p>
      </div>

      <mat-form-field appearance="fill" class="example-form-field">
        <mat-label>Technologies</mat-label>
        <mat-chip-grid #chipGrid aria-label="Enter keywords">
          <mat-chip-row
            *ngFor="
              let techGroup of form.controls.techList.controls;
              let index = index
            "
            (removed)="removeTechSkill(index)"
          >
            {{ techGroup.controls.name.value }}
            <button matChipRemove aria-label="'remove ' + keyword">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        </mat-chip-grid>
        <input
          placeholder="New keyword..."
          [matChipInputFor]="chipGrid"
          (matChipInputTokenEnd)="add($event)"
        />
      </mat-form-field>

      <ol>
        <li
          *ngFor="
            let techGroup of form.controls.techList.controls;
            let index = index
          "
        >
          <ng-container [formGroup]="techGroup">
            {{ techGroup.controls.name.value }}
            <mat-form-field appearance="fill">
              <mat-label>Seniority level</mat-label>
              <mat-select formControlName="seniority">
                <mat-option
                  *ngFor="
                    let level of ['Entry', 'Junior', 'Mid', 'Senior', 'Expert']
                  "
                  [value]="level"
                >
                  {{ level }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>
        </li>
      </ol>

      <!-- </mat-form-field> -->
      <button mat-raised-button color="primary">dodaj</button>
    </form>
  `,
  // template: `
  //   <!-- <app-nav></app-nav> -->
  //   <app-dashboard></app-dashboard>
  // `,
})
export class AppComponent {
  http = inject(HttpClient);
  formBuilder = inject(NonNullableFormBuilder);

  offers = this.http.get<(JobOffer & { id: number })[]>(
    'http://localhost:3000/jobOffers'
  );

  form = this.formBuilder.group({
    name: this.formBuilder.control(''),
    description: this.formBuilder.group({
      heading: this.formBuilder.control(''),
      items: this.formBuilder.array<FormControl<string>>([]),
    }),
    salary: this.formBuilder.control(5000),
    techList: this.formBuilder.array<
      FormGroup<{
        name: FormControl<string>;
        seniority: FormControl<JobTechSeniorityLevel>;
      }>
    >([]),
  });

  ngOnInit() {
    this.form.controls.techList.valueChanges
      .pipe(startWith([]), pairwise())
      .subscribe(([old, current]) => {
        if (old.length < current.length) {
          return;
        }

        if (old.length > current.length) {
          return;
        }
      });
  }

  add(event: MatChipInputEvent) {
    this.form.controls.techList.controls.push(
      this.createTechSkillForm(event.value)
    );
  }

  createTechSkillForm(name: string) {
    return this.formBuilder.group({
      name: this.formBuilder.control(name),
      seniority: this.formBuilder.control<JobTechSeniorityLevel>('Mid'),
    });
  }

  removeTechSkill(index: number) {
    this.form.controls.techList.removeAt(index);
  }

  addDescriptionItem() {
    this.form.controls.description.controls.items.push(
      this.formBuilder.control('')
    );
  }

  removeDescriptionItem(index: number) {
    this.form.controls.description.controls.items.removeAt(index);
  }

  addOffer() {
    console.log(this.form);
    console.log(this.form.value);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    // this.http
    //   .post<any>('http://localhost:3000/jobOffers', {})
    //   .subscribe(() => {});
  }
}
