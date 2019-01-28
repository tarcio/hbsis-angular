import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { City } from '../../interfaces/city';
import { CityService } from '../../services/city.service';

@Component({
	selector: 'app-city-page',
	templateUrl: './city-page.component.html',
	styleUrls: ['./city-page.component.css']
})
export class CityPageComponent implements OnInit {

	displayedColumns: string[] = ['id', 'name', 'weather'];
	dataSource: MatTableDataSource<City> = new MatTableDataSource([]);

	city: string = '';

	showTable: boolean = true;
	showAddButton: boolean = false;

	MESSAGE_ERROR_FORM_INVALID_CITY: string = 'Form Error: Invalid city name.';
	MESSAGE_ERROR_SERVICE_LIST: string = 'Service Error: Cannot fetch cities from service.';
	MESSAGE_ERROR_SERVICE_SAVE: string = 'Service Error: Error on save.';

	constructor(
		private cityService: CityService,
		private messages: MatSnackBar
	) { }

	ngOnInit() {

		this.updateTable();
	}

	updateTable() {

		this.cityService.findAll().subscribe(cityList => this.dataSource.data = cityList, error => this.showError(this.MESSAGE_ERROR_SERVICE_LIST));
	}

	save() {

		let city = this.city ? encodeURI(this.city.trim()) : undefined

		if (!city) {

			this.showError(this.MESSAGE_ERROR_FORM_INVALID_CITY);
			return;
		}

		let newCity = { id: undefined, name: city };
		this.cityService.save(newCity).subscribe(() => {

			this.updateTable();
			this.filter('');

		}, error => this.showError(this.MESSAGE_ERROR_SERVICE_SAVE));
	}

	filter(name: string) {

		this.city = name;
		let city = this.city.trim();

		this.dataSource.filter = city;

		this.showTable = (city.length === 0) || (this.dataSource.filteredData.length > 0);
		this.showAddButton = !this.showTable;
	}

	showError(message: string) {

		setTimeout(() => this.messages.open(message, 'Close', { duration: 4000 }), 1);
	}
}