import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  
  users
  currentUser = this.userService.currentUser

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    })
  }

  follow(id) {
    this.userService.follow(id).subscribe((user) => {
      this.userService.currentUser = user
      this.currentUser = this.userService.currentUser
    });
  }

  unFollow(id) {
    this.userService.unFollow(id).subscribe((user) => {
      this.userService.currentUser = user
      this.currentUser = this.userService.currentUser
    });
  }
}
