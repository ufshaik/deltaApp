import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  // styleUrls: ['./date-range-picker.component.css'], // Optional styling
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DateRangePickerComponent {
  readonly minDate = new Date(2019,12,31);
  @Output() dateRangeChange = new EventEmitter<{ start: Date, end: Date }>();
  dateRange = { start: new Date(0), end: new Date(0) };
  // handling dates with default 1960 year instead of form group to save time

  onDateRangeChange(event: any) {
    if (event.target.constructor.name == "_MatStartDate") this.dateRange.start = event.value;
    else this.dateRange.end = event.value;
    this.dateRangeChange.emit(this.dateRange)

  }
}
