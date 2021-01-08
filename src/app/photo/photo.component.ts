import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { CommentService } from '../services/comment.service';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  photo
  comments
  get currentUser() {
    return this.userService.currentUser;
  }

  constructor(private userService: UserService, private photoService: PhotoService, private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit(): void {
    this.loadPhotos();
  }

  commentHandler(value) {
    this.commentService.postComment({text: value.comment}, this.photo._id).subscribe(
      data => this.loadPhotos(),
      error => this.loadPhotos()
    )
  }

  deleteComment(commentId) {
    this.commentService.deleteComment(this.photo._id, commentId).subscribe(
      data => this.loadPhotos(),
      error => this.loadPhotos()
    )
  }

  loadPhotos() {
    this.route.params.pipe(
      mergeMap(data => {
        const id = data['imageId']
        return this.photoService.getOne(id);
      })
    ).subscribe(photo => {
      this.photo = photo
      this.comments = this.photo.comments
    });
  }

}
