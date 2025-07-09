import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TheaterComponent } from './pages/theater/theater';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'theater/:videoId',
    component: TheaterComponent
  }
];
