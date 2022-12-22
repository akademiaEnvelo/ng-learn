import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  template: ` <p class="text-red-600">test</p> `,
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
    salary: this.formBuilder.control(0),
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
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.http
      .post<any>('http://localhost:3000/jobOffers', {})
      .subscribe(() => {});
  }
}
