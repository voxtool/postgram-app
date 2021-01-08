import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { WelcomeComponent } from './welcome/welcome.component';
import { FeedComponent } from './feed/feed.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PeopleComponent } from './people/people.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PhotoComponent } from './photo/photo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PhotoService } from './services/photo.service';
import { CommentService } from './services/comment.service';
import { appInterceptorProvider } from './app.interceptor';
import { ChatComponent } from './chat/chat.component';
import { SocketioService } from './services/socketio.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    FeedComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PeopleComponent,
    ProfileComponent,
    NotFoundComponent,
    PhotoComponent,
    UploadComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [UserService, AuthGuard, PhotoService, CommentService, appInterceptorProvider, SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
