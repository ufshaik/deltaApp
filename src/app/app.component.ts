import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CountrySelectComponent} from "./components/country-select/country-select.component";
import {SubdivisionSelectComponent} from "./components/subdivision-select/subdivision-select.component";
import {DateRangePickerComponent} from "./components/date-range-picker/date-range-picker.component";
import {HolidayListComponent} from "./components/holiday-list/holiday-list.component";
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButton, MatFabButton} from "@angular/material/button";
import {ApiService} from "./services/holiday-api.service";
import {MatCard, MatCardTitle, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIconModule} from '@angular/material/icon';
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CountrySelectComponent,
    SubdivisionSelectComponent,
    DateRangePickerComponent,
    HolidayListComponent,
    RouterOutlet,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardFooter,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    MatFabButton,
    MatIconModule,
    NgIf,
    MatProgressSpinner
  ]
})
export class AppComponent implements OnInit {
  country = '';
  subdivision = '';
  validFrom = new Date(0);
  validTo = new Date(0);
  holidays: any[] = []; // Store fetched holidays
  errorHolidays = {status: false, message: ''};
  loaderHolidays = false;
  count = 0;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    // No need for initial country fetch here, it's done in country-select, remove this
    console.log("V1")
  }

  onCountrySelected(isoCode: string) {
    this.country = isoCode;
    this.subdivision = ''; // Reset subdivision on country change
  }

  onSubdivisionSelected(isoCode: string) {
    this.subdivision = isoCode;
  }

  onDateRangeChange(dateRange: { start: Date, end: Date }) {
    this.validFrom = dateRange.start;
    this.validTo = dateRange.end;
  }

  onSubmit() {
    this.loaderHolidays = true;
    // Ensure all parameters are selected before submitting
    if (!this.country ||  this.validFrom <= new Date(0) || this.validTo <= new Date(0) || this.validFrom >= this.validTo) {
      // Handle the case where not all parameters are filled (e.g., show an error message)
      // If subdivision is empty, the params will go empty and wouldn't mess with response
      this.loaderHolidays = false;
      this.errorHolidays.status = true
      this.errorHolidays.message = "Please make sure a country and date range has been selected"
      return;
    }

    this.apiService.getHolidays({
      countryIsoCode: this.country,
      subdivisionCode: this.subdivision,
      validFrom: this.validFrom.toLocaleDateString(),
      validTo: this.validTo.toLocaleDateString(),
      languageIsoCode: 'EN'
    }).subscribe({
      next: (data: any) => {
        this.count += 1;
        this.loaderHolidays = false;
        this.holidays = data;
        this.errorHolidays.status = false;
      },
      error: (err) => {
        this.count += 1;
        this.loaderHolidays = false;
        this.errorHolidays.status = true
        this.errorHolidays.message = "Something went wrong, please select a different date range or try again"
        // console.error(err)
      }
    });
  }
}
