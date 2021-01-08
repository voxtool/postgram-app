import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  photos = []
  get currentUser() {
    return this.userService.currentUser;
  }


  constructor(private userService: UserService, private route: ActivatedRoute, private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.getUser()
  }

  deleteOne(id) {
    this.photoService.deleteOne(id).subscribe(() => {
      this.getUser()
    });
  }

  like(id) {
    this.photoService.like(id).subscribe((photo) => {
      const index = this.photos.findIndex(el => el._id === photo._id);
      this.photos[index] = photo;
    });
  }

  unlike(id) {
    this.photoService.unlike(id).subscribe((photo) => {
      const index = this.photos.findIndex(el => el._id === photo._id);
      this.photos[index] = photo;
    });
  }

  getUser() {
    this.route.params.pipe(
      mergeMap(data => {
        const id = data['userId']
        return this.userService.getOne(id)
      })
    ).subscribe(user => {
      this.user = user
      this.photos = user.images
    });
  }

}
