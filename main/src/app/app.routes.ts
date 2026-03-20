import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { User } from './pages/user/user';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { NewRecipe } from './pages/new-recipe/new-recipe';
import { SearchRecipe } from './pages/search-recipe/search-recipe';
import { ShoppingIngredients } from './pages/shopping-ingredients/shopping-ingredients';
import { RecipeCalendar } from './pages/recipe-calendar/recipe-calendar';
import { Login } from '../Auth/login/login';
import { SignUp } from '../Auth/sign-up/sign-up';
import { App } from './app';
import { authGuard } from './guards/auth-guard';
import { AppLayout } from './layout/app-layout/app-layout';

export const routes: Routes = [
    { path: '', redirectTo: '/inicioSesion', pathMatch: 'full' },

    {path: 'inicioSesion', component:Login},
    {path: 'registro', component:SignUp},

    {path: 'app', component: AppLayout, canActivate: [authGuard], children:[
        {path: 'inicio', component: Home},
        {path: 'usuario', component: User},
        {path: 'detalleReceta/:id', component: RecipeDetail},
        {path: 'nuevaReceta', component: NewRecipe},
        {path: 'busquedaReceta', component: SearchRecipe},
        {path: 'compraIngredientes', component: ShoppingIngredients},
        {path: 'calendarioRecetas', component: RecipeCalendar},
    ]},
    {path: '**', redirectTo: '/inicioSesion'},
];
