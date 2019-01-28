import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { City } from '../../interfaces/city';
import { CityForecast } from '../../interfaces/city-forecast';

import { CityService } from '../../services/city.service';
import { CityForecastService } from '../../services/city-forecast.service';

@Component({
	selector: 'app-city-forecast-page',
	templateUrl: './city-forecast-page.component.html',
	styleUrls: ['./city-forecast-page.component.css']
})
export class CityForecastPageComponent implements OnInit {

	displayedColumns: string[] = ['date', 'temperatureValue', 'temperatureMin', 'temperatureMax', 'temperatureUnit'];
	dataSource: MatTableDataSource<CityForecast> = new MatTableDataSource([]);

	city: City = { id: undefined, name: undefined };

	MESSAGE_ERROR_PAGE_CITY: string = 'Error: Invalid city.';
	MESSAGE_ERROR_PAGE_CITY_NOT_FOUND: string = 'Error: City not found.';
	MESSAGE_ERROR_SERVICE_FORECAST: string = 'Service Error: Cannot fetch forecast for city.'

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cityService: CityService,
		private cityForecastService: CityForecastService,
		private messages: MatSnackBar
	) { }

	ngOnInit() {

		let cityName;
		this.route.paramMap.pipe(switchMap((params: ParamMap) => cityName = params.get('name').trim())).subscribe();

		if (!cityName) {

			this.showError(this.MESSAGE_ERROR_PAGE_CITY);
			this.router.navigateByUrl('/city');

			return;
		}

		this.cityService.findByName(cityName).subscribe(city => {

			this.city = city;
			this.forecast();

		}, error => {

			this.showError(this.MESSAGE_ERROR_PAGE_CITY);
			this.router.navigateByUrl('/city');

		});
	}

	forecast() {

		this.cityForecastService.findForecast(this.city).subscribe(forecast => this.dataSource.data = forecast.list, error => this.showError(this.MESSAGE_ERROR_SERVICE_FORECAST));
	}

	showError(message: string) {

		setTimeout(() => this.messages.open(message, 'Close', { duration: 4000 }), 1);
	}
}