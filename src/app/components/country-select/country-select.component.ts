import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {ApiService} from "../../services/holiday-api.service";

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, NgForOf]
})
export class CountrySelectComponent implements OnInit {
  @Input() countries: Array<any> = [];
  @Output() countrySelected = new EventEmitter<string>();

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCountries().subscribe({
      next: (data: any) => {
        this.countries = data;
      },
      error: (err) => console.error(err)
    });
  }

  onCountryChange(isoCode: string) {
    this.countrySelected.emit(isoCode);
  }
}
