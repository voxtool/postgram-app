import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  registerHandler(value) {
    this.errorMessage = '';
    this.userService.register({ email: value.email, username: value.username, password: value.password }).subscribe(
      data => this.router.navigate(['/']),
      error => this.errorMessage = error.error.message
    )
  }
}
