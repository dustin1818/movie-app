import { Routes } from '@angular/router';
import { PopularComponent } from './components/popular/popular.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { EpisodesPageComponent } from './components/episodes-page/episodes-page.component';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'popular-series',
        component: PopularComponent
    },
    {
        path: 'popular-movies',
        component: PopularMoviesComponent
    },
    {
        path: 'search/:query',
        component: SearchPageComponent
    },
    {
        path: 'info/:type/:id',
        component: InfoPageComponent
    },
    {
        path: 'episodes/:type/:id',
        component: EpisodesPageComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
