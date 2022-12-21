import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shared',
})
export class SharedPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value + ' ho ho ho';
  }
}

@NgModule({
  declarations: [SharedPipe],
  exports: [SharedPipe],
})
export class SharedPipeModule {}
