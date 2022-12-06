import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>example works!</p> `,
  styles: [],
})
export class ExampleComponent {
  prop = 123;

  sayHello() {
    // this.service.sayHello();
    console.log('test');
  }
}
