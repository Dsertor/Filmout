import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FilmCardComponent } from './pages/film-card-page/film-card.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page.component').then(item => item.HomePageComponent)
    },
    {
        path: 'film/:filmName',
        component: FilmCardComponent
    },
    {
        path: '**',
        loadComponent: () => import('./pages/home-page/home-page.component').then(item => item.HomePageComponent)
    }
];
