import { HttpResponse } from '@angular/common/http';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/dtos/response/login.response';
import { Role } from 'src/app/model/role';
import { LoginDTO } from 'src/app/model/user/login.dto';
import { RoleService } from 'src/app/service/role.service';
import { TokenService } from 'src/app/service/token.service';
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
  selectedRole: Role | undefined;
  roles: Role[] | undefined;
  rememberMe: false | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      complete() {
        debugger
      },
      error(err) {
        debugger
        console.error('Error get role:', err);
      },
    })
  }


  login() {
    var data = {
      phoneNumber: this.phoneNumber,
      password: this.password,
      roleId: this.selectedRole?.id ?? 1
    }
    var jsonData = JSON.stringify(data);
    alert(jsonData);

    this.userService.login(jsonData).subscribe({
      next: (response: HttpResponse<LoginResponse>) => {
        console.log(response);
        console.log(response.body);

        if (response.status === 200) {
          const accessToken = response.body?.accessToken;
          if (this.rememberMe && accessToken) {
            this.tokenService.setToken(accessToken);
            localStorage.setItem('user', JSON.stringify(response.body));
          }
          this.router.navigate(['/']);
        }
      },
      complete: () => {
      },
      error: (error: any) => {
        debugger
        alert(`Can not login, error: ${error.error}`)
      }
    })
  }
}
