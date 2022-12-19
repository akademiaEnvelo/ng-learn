import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEpisodesComponent } from './my-episodes.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MyEpisodesComponent,
  },
];

@NgModule({
  declarations: [MyEpisodesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export default class MyEpisodesModule {
  constructor() {
    console.log('module');
  }
}
