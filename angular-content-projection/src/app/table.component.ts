import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ExampleComponent } from './example.component';

@Component({
  selector: 'app-table[source]',
  standalone: true,
  imports: [CommonModule, ExampleComponent],
  template: `
    <header>
      <h1 #heading>Lista</h1>
      <app-example></app-example>
    </header>
    <ol *ngIf="!loading; else loadingTemplate">
      <li *ngFor="let item of list">{{ item.name }}</li>
    </ol>
    <footer>Razem: {{ !list.length ? '-' : list.length }}</footer>

    <ng-template #loadingTemplate>
      <ng-container
        *ngIf="template; else defaultLoading"
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="context"
      ></ng-container>

      <!-- <ng-container *ngIf="template; else defaultLoading">
        <ng-container *ngTemplateOutlet="template; context: { text: 'siema' }">
        </ng-container>
      </ng-container> -->
    </ng-template>

    <ng-template #defaultLoading>
      <div>Loading...</div>
    </ng-template>
  `,
  styles: [``],
})
export class TableComponent {
  @ContentChild('loading') template: TemplateRef<any> | null = null;
  @ViewChild('heading') headingElement!: ElementRef<HTMLHeadingElement>;
  @ViewChild(ExampleComponent, {
    static: true,
  })
  exampleCmp!: ExampleComponent;

  @Input() source!: Observable<{ name: string }[]>;

  protected list: { name: string }[] = [];
  protected loading = false;

  context = {
    text: 'text z contextu',
  };

  private sub = new Subscription();

  ngOnInit() {
    this.exampleCmp.sayHello();

    this.loading = true;
    const sub = this.source.subscribe({
      next: (res) => {
        this.list = res.slice(0, 10);

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });

    this.sub.add(sub);
  }

  ngAfterContentInit() {
    // console.log(this.template);
  }

  ngAfterViewInit() {
    // console.log(this.defaultLoading);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
