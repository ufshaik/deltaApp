import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../../services/holiday-api.service";

@Component({
  selector: 'app-subdivision-select',
  templateUrl: './subdivision-select.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, NgIf, FormsModule, NgForOf]
})
export class SubdivisionSelectComponent implements OnInit {
  @Input() countryIsoCode: string = ''; // Receive from parent
  @Output() selectedSubdivision = new EventEmitter<string>(); // Emit selected subdivision
  subdivisions: any[] = [];

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    if (this.countryIsoCode) { // Fetch only if country is selected
      this.fetchSubdivisions();
    }
  }

  ngOnChanges() { // Re-fetch when country changes
    this.fetchSubdivisions();
  }

  fetchSubdivisions() {
    // If there's no country selected, clear the subdivisions and return.
    if (!this.countryIsoCode) {
      this.subdivisions = [];
      return;
    }

    // console.log(this.apiService.getSubdivisions(this.countryIsoCode))

    this.apiService.getSubdivisions(this.countryIsoCode).subscribe({
      next: (data: any) => {
        this.subdivisions = data;
      },
      error: (err) => console.error(err)
    });
  }

  onSubdivisionChange(isoCode: string) {
    this.selectedSubdivision.emit(isoCode);
  }

}
