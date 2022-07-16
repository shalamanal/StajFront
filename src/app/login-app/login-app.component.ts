import { Component, OnInit } from '@angular/core';
import {AuthLoginInfo} from "../auth/login-info";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo | undefined;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {


    if (this.tokenStorage.getToken() !== "{}") {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }


  onSubmit() {
      this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);
      console.info(this.form.username);
      console.info(this.form.password);
      this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        alert(data.token);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.nickname);
        this.tokenStorage.saveAuthorities(data.roles);
        console.info("token: " + this.tokenStorage.getToken());
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
