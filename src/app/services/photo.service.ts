import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, private userService: UserService) { }

  upload(data): Observable<any> {
    return this.http.post('/images/', data);
  }

  getOne(id): Observable<any> {
    return this.http.get(`/images/${id}`);
  };

  deleteOne(id): Observable<any> {
    return this.http.delete(`/images/${id}`);
  };

  getAll(pageSize, page): Observable<any> {
    return this.http.get(`/images/${pageSize}/${page}`);
  }

  like(id): Observable<any> {
    return this.http.put(`/images/like/${id}`, {});
  }

  unlike(id): Observable<any> {
    return this.http.put(`/images/unlike/${id}`, {});
  }

}
