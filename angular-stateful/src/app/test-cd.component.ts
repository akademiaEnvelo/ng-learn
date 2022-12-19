import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval, startWith, timer } from 'rxjs';

@Component({
  selector: 'app-test-cd',
  template: `{{ log() }}
    <p>test-cd works! value: {{ value }}</p>
    <p>test object as input: {{ person?.['name'] }}</p>
    <p>test from $: {{ obs$ | async }}</p>
    <button (click)="({})">force render</button>
    <button id="test">no cd</button> `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCdComponent {
  @Input() value: string = '';
  @Input() person: Record<'name' | 'age', string> | null = null;

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {}

  obs$ = interval(1000).pipe(startWith(0));

  control = new FormControl();

  controlChange$ = this.control.valueChanges.pipe(
    startWith(this.control.value)
  );

  log() {
    console.log('render test-cd');
  }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {});

    // this.cdr.detach();

    document.getElementById('test')?.addEventListener('click', () => {
      console.log('clicked');
      this.cdr.detectChanges();
      this.cdr.reattach();
    });

    setTimeout(() => {
      this.value = 'Zmieniona';
      console.log('value should change?');
    }, 3000);
  }
}
