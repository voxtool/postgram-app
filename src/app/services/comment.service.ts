import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(data, imageId) {
    return this.http.post(`/comments/${imageId}`, data);
  }

  deleteComment(imageId, commentId) {
    return this.http.delete(`/comments/${imageId}/${commentId}`);
  }
  

}
