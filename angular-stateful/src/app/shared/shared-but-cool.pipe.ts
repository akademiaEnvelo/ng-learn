import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedButCool',
  standalone: true,
})
export class ShareButCoolPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return 'ho ho ho but cool';
  }
}
