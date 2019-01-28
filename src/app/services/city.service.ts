import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { City } from '../interfaces/city';
import { config } from '../../assets/config';

@Injectable({
	providedIn: 'root'
})
export class CityService {

	constructor(private http: HttpClient) { }

	findAll(): Observable<City[]> {

		return this.http.get<City[]>(config.SERVICE_CITY_GET_ALL);
	}

	findByName(name: string): Observable<City> {

		return this.http.get<City>(config.SERVICE_CITY_GET_BY_NAME.replace('${city}', name));
	}

	save(city: City): Observable<City> {

		return this.http.get<City>(config.SERVICE_CITY_SAVE.replace('${city}', city.name));
	}

	update(city: City): Observable<void> {

		return undefined;
	}

	delete(city: City): Observable<void> {

		return undefined;
	}
}