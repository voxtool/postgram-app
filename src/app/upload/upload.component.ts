import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  errorMessage: string

  constructor(private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {
  }

  uploadHandler(value) {
    this.errorMessage = '';
    this.photoService.upload({ imageUrl: value.imageUrl, description: value.description }).subscribe(
      data => this.router.navigate([`profile/${this.userService.currentUser._id}`]),
      error => this.errorMessage = error.error.message
    )
  }

}
