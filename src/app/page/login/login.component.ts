import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/model/user/login.dto';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm !: NgForm;

  phoneNumber = '';
  password = '';

  constructor(private router: Router, private userService: UserService) { }


  login() {
    var data = {
      phoneNumber: this.phoneNumber,
      password: this.password
    }
    var jsonData = JSON.stringify(data);
    alert(jsonData);

    this.userService.login(jsonData);
  }
}
