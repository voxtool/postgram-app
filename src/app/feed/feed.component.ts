import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  photos = []
  pageSize = 5
  page = 1
  get currentUser() {
    return this.userService.currentUser
  }

  constructor(private photoService: PhotoService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadPhotos();
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

  onScroll() {
    this.page += 1;
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getAll(this.pageSize, this.page).subscribe(photos => {
      this.photos = this.photos.concat(photos);
    })
  }

}
