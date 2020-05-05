import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth.guard';
import {GloginComponent} from './glogin/glogin.component';
import {ProfilepageComponent} from './profilepage/profilepage.component'


export const rootRouterConfig: Routes = [
 { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'register/:res', component: RegisterComponent},
  { path: 'user', component: UserComponent},
  {path:"**",component : RegisterComponent},
  {path: 'glogin', component: GloginComponent},
  {path: 'profilepage', component: ProfilepageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
