import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityPageComponent } from './components/city-page/city-page.component';
import { CityForecastPageComponent } from './components/city-forecast-page/city-forecast-page.component';

const routes: Routes = [{
	path: 'city',
	component: CityPageComponent
}, {
	path: 'city/:name',
	component: CityForecastPageComponent
}, {
	path: '',
	redirectTo: '/city',
	pathMatch: 'full'
}, {
	path: '**',
	redirectTo: '/city',
	pathMatch: 'full'
}];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }