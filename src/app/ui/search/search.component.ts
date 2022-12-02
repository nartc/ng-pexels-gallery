import { NgIf } from '@angular/common';
import { Component, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  template: `
    <mat-form-field>
      <input
        matInput
        type="text"
        placeholder="Search..."
        [formControl]="queryControl"
      />
      <button
        *ngIf="queryControl.value"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="queryControl.reset()"
      >
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styleUrls: ['./search.component.scss'],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
  ],
})
export class SearchComponent {
  readonly queryControl = inject(NonNullableFormBuilder).control('');

  @Input() set defaultQuery(value: string) {
    this.queryControl.setValue(value, { emitEvent: false });
  }

  @Output() query = this.queryControl.valueChanges.pipe(debounceTime(250));
}
