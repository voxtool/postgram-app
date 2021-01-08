import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PeopleComponent } from './people/people.component';
import { PhotoComponent } from './photo/photo.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent, data: {
      thisIsHome: true
    }, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent, data: {
      authRequiered: false
    }, canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent, data: {
      authRequiered: false
    }, canActivate: [AuthGuard]
  },
  {
    path: 'users', component: PeopleComponent, data: {
      authRequiered: true
    }, canActivate: [AuthGuard]
  },
  {
    path: 'profile/:userId', component: ProfileComponent, data: {
      authRequiered: true
    }, canActivate: [AuthGuard]
  },
  {
    path: 'profile/:userId/photos/:imageId', component: PhotoComponent, data: {
      authRequiered: true
    }, canActivate: [AuthGuard]
  },
  {
    path: 'upload', component: UploadComponent, data: {
      authRequiered: true
    }, canActivate: [AuthGuard]
  },
  {
    path: 'chat/:username', component: ChatComponent, data: {
      authRequiered: true
    }, canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
