// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/login' }
];
// This file defines the routes for the application.
// It includes a redirect from the root path to the login page,
// a route for the login component, a route for the dashboard component,
// and a wildcard route that redirects to the login page for any undefined paths.
// The routes are used in the main application module to set up navigation.
// The `routes` array is imported into the main application module
// and used with the Angular Router to enable navigation between components.
// The `path` property defines the URL path for each route,
