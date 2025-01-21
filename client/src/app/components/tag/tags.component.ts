import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tag, TagCreate } from '../../shared/interfaces';
import { selectAllTags } from '../../selectors/tags.selector';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tags',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  tags$: Observable<Tag[]>;

  constructor(private store: Store, private dataService: DataService) {
    this.tags$ = this.store.select(selectAllTags);
  }

  createTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const newTag: TagCreate = { name: value };
      this.dataService.createTag(newTag).subscribe({
        next: (createdTag) => {
          console.log('CREATED TAG', createdTag);
        },
      });
    }

    event.chipInput!.clear();
  }

  deleteTag(id: string): void {
    this.dataService.deleteTag(id).subscribe(() => {
      console.log('DELETED TAG', id);
    });
  }
}
