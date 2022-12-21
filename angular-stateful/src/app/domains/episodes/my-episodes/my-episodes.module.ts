import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEpisodesComponent } from './my-episodes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedPipeModule } from 'src/app/shared/shared.pipe';
import { ShareButCoolPipe } from 'src/app/shared/shared-but-cool.pipe';

const routes: Routes = [
  {
    path: '',
    component: MyEpisodesComponent,
  },
];

@NgModule({
  declarations: [MyEpisodesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ShareButCoolPipe],
})
export default class MyEpisodesModule {
  constructor() {
    console.log('module');
  }
}
