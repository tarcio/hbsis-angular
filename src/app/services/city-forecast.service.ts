import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { City } from '../interfaces/city';
import { CityForecast } from '../interfaces/city-forecast';

import { config } from '../../assets/config';

@Injectable({
	providedIn: 'root'
})
export class CityForecastService {

	constructor(private http: HttpClient) { }

	findForecast(city: City): Observable<CityForecast> {

		return this.http.get<CityForecast>(config.SERVICE_CITY_FORECAST.replace('${city}', city.name));
	}
}