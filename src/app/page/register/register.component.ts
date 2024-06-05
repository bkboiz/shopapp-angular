import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm !: NgForm;

  phone = '';
  email = '';
  password = '';
  retypePassword = '';
  fullName !: string;
  address !: string;
  birthDate !: Date;
  passwordMatching = false;
  underEighteen = false;
  agreeCheckbox = false;

  constructor(private router: Router, private userService: UserService) {

  }

  registerUser() {
    if (this.agreeCheckbox) {
      // call api
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      var data = {
        fullName: this.fullName,
        email: this.email,
        phoneNumber: this.phone,
        password: this.password,
        birthDate: this.birthDate,
        address: this.address
      };
      console.log(data);
      var jsonData = JSON.stringify(data);
      console.log(jsonData);

      this.userService.register(jsonData)
        .subscribe((response: any) => console.log(response));

      // .subscribe({
      //   next: (response: any) => {

      //   },
      //   complete: () => {

      //   },
      //   error: () => {

      //   }
      // });

      // this.httpClient.post(registerUrl, null, { headers })
      //   .subscribe({
      //     next: (response: any) => {

      //     },
      //     complete: () => {

      //     },
      //     error: () => {

      //     }
      //   })
    } else {
      alert('Thông tin đăng ký không hợp lệ !!!');
    }
    //alert(`Register user:  ${this.phone}, ${this.password},  ${this.fullName},  ${this.birthDate}, ${this.address}`);
  }

  checkPasswordMatch() {
    if (this.password !== this.retypePassword) {
      this.passwordMatching = true;
      // this.registerForm.form.controls['retypePassword'].setErrors({ 'passwordMismatch': true });
    } else {
      this.passwordMatching = false;
      // this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    if (this.birthDate) {
      const today = new Date();
      const birthDate = new Date(this.birthDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.underEighteen = true;
        // this.registerForm.form.controls['birthDate'].setErrors({ 'invalidAge': true });
      } else {
        this.underEighteen = false;
        // this.registerForm.form.controls['birthDate'].setErrors(null);
      }
    }
  }

  listenCheckbox(event: any): void {
    console.log(event.currentTarget.checked);
    this.agreeCheckbox = event.currentTarget.checked;
  }
}
