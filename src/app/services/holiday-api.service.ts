import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from 'rxjs'; // Import 'of'
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Make it available application-wide
})
export class ApiService {
  private cache: Map<string, any> = new Map();
  constructor(private http: HttpClient) {}

  getCountries() : Observable<any> {
    const cachedData = this.cache.get('countries');
    if (cachedData) {
      return cachedData;
    }
    return this.http.get('https://openholidaysapi.org/Countries')
      .pipe(tap( (data: any) => {this.cache.set('countries', of(data)) })); // Cache the result
  }

  getSubdivisions(countryIsoCode: string) : Observable<any> {
    const cacheKey = `subdivisions-${countryIsoCode}`;
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    return this.http.get('https://openholidaysapi.org/Subdivisions', {
      params: {countryIsoCode}
    }).pipe(tap((data:any) => {
      if(data.length > 0 && !data[0].hasOwnProperty('isoCode')) data = []
       this.cache.set(cacheKey, of(data))
    }));
  }

  getHolidays(params: any): Observable<any> {
    const cacheKey = `holidays-${JSON.stringify(params)}`; // Generate a unique key based on parameters
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    return this.http.get('https://openholidaysapi.org/PublicHolidays', {
      params: params
    }).pipe(
      tap(data => this.cache.set(cacheKey, of(data)))
    );

  }

}
