import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <h1>Lista</h1>
    </header>
    <ol *ngIf="!loading; else defaultLoading">
      <li *ngFor="let item of list">{{ item.name }}</li>
    </ol>
    <footer>Razem: {{ !list.length ? '-' : list.length }}</footer>
    <ng-template #defaultLoading> <div>Loading...</div> </ng-template>
  `,
  styles: [``],
})
export class TableComponent {
  @Input() source$!: Observable<{ name: string }[]>;

  protected list: { name: string }[] = [];
  protected loading = false;

  private sub = new Subscription();

  ngOnInit() {
    this.loading = true;
    const sub = this.source$.subscribe({
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
