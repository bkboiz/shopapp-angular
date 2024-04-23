import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm !: NgForm;

  phone = '';
  password = '';
  retypePassword = '';
  fullName !: string;
  address !: string;
  birthDate !: Date;

  registerUser() {
    alert(`Register user: ${this.fullName}, ${this.phone}, ${this.password}, ${this.address}`);
  }

  checkPasswordMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch' : true});
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
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
        this.registerForm.form.controls['birthDate'].setErrors({'invalidAge' : true});
      } else {
        this.registerForm.form.controls['birthDate'].setErrors(null);
      }
    }
  }
}
