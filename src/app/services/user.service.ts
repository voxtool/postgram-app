import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser

  get isLogged(): boolean {
    return !!this.currentUser;
  }

  constructor(public http: HttpClient) {
  }

  profile(): Observable<any> {
    return this.http.get('/users/profile').pipe(
      tap(user => this.currentUser = user),
      catchError(() => {
        this.currentUser = null;
        return of(null);
      })
    );
  };

  logout(): Observable<any> {
    return this.http.post('/users/logout', {}).pipe(
      tap(() => this.currentUser = null)
    );
  };

  register(data: any): Observable<any> {
    return this.http.post('/users/register', data).pipe(
      tap(user => this.currentUser = user)
    );
  };

  login(data: any): Observable<any> {
    return this.http.post('/users/login', data).pipe(
      tap(user => this.currentUser = user)
    );
  };

  getAll(): Observable<any> {
    return this.http.get('/users/users');
  };

  getOne(id): Observable<any> {
    return this.http.get(`/users/${id}`);
  };

  follow(id): Observable<any> {
    return this.http.put(`/users/follow/${id}`, {});
  };

  unFollow(id): Observable<any> {
    return this.http.put(`/users/unfollow/${id}`, {});
  };

}
