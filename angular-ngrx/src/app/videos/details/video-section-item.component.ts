import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { VideoSection } from './video-details.component';

export interface SectionUpdatePayload {
  updatedName: string;
  sectionId: string;
}

export interface SectionSelectPayload {
  timestamp: [hours: number, minutes: number, seconds: number];
}

export interface SectionRemovePayload {
  sectionId: string;
}

@Component({
  selector: 'app-video-section-item[section]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="goToSection(section.timestamp)">
      {{ section.id }} |
      <input
        #name
        [disabled]="!editMode"
        [value]="section.name"
        (click)="$event.stopPropagation()"
        (keyup.enter)="handleUpdate(section, name.value)"
      />
      | {{ section.timestamp }}
      <button (click)="$event.stopPropagation(); edit()">edit</button>
      <button (click)="$event.stopPropagation(); handleRemove(section.id)">
        X
      </button>
    </button>
  `,
})
export class VideoSectionItemComponent {
  @Input() section!: VideoSection;

  @Output() select = new EventEmitter<SectionSelectPayload>();
  @Output() remove = new EventEmitter<{ sectionId: string }>();
  @Output() update = new EventEmitter<SectionUpdatePayload>();

  protected editMode = false;

  handleUpdate(section: VideoSection, updatedName: string) {
    this.update.emit({ sectionId: section.id, updatedName });
    this.editMode = false;
  }

  edit() {
    this.editMode = !this.editMode;
  }

  goToSection(timestamp: string) {
    const splitedTimestamp = timestamp
      .split(':')
      .map(Number) as SectionSelectPayload['timestamp'];

    this.select.emit({ timestamp: splitedTimestamp });
  }

  handleRemove(id: string) {
    this.remove.emit({ sectionId: id });
  }
}
