import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { AddUserComponent } from './user/pages/add-user/add-user.component';
import { EditUserComponent } from './user/pages/edit-user/edit-user.component';
import { ListUsersComponent } from './user/pages/list-users/list-users.component';
import { AirlineComponent } from './airline/airline.component';
import { ResetUserPasswordComponent } from './user/pages/reset-user-password/reset-user-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'airline',
    children: [{ path: 'edit', component: AirlineComponent }],
  },
  {
    path: 'users',
    children: [
      { path: 'list', component: ListUsersComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'edit/:id', component: EditUserComponent },
      { path: 'reset-password/:id', component: ResetUserPasswordComponent },
    ],
  },
];
