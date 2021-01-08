import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  loginHandler(value) {
    this.errorMessage = '';
    this.userService.login({ email: value.email, password: value.password }).subscribe(
      data => this.router.navigate(['/']),
      error => this.errorMessage = error.error.message
    )
  }
}
