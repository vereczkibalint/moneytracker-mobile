import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  ONBOARD_KEY = 'onboarded';
  USER_KEY = 'user';
  JWT_KEY = 'jwt-token';

  email?: string;
  password?: string;

  constructor(private authService: AuthService, private router: Router, private storage: Storage) {
    this._redirectIfNotOnboarded();
    this._redirectIfLoggedIn();
  }

  ngOnInit() { }

  _redirectIfLoggedIn() {
    Promise.all([
      this.storage.get(this.JWT_KEY),
      this.storage.get(this.USER_KEY)
    ]).then((keys) => {
      if(keys[0] && keys[1]) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  _redirectIfNotOnboarded() {
    this.storage.get(this.ONBOARD_KEY).then((value) => {
      if(!value || value === false) {
        this.router.navigateByUrl('/intro');
      }
    });
  }

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe(async result => {
      if(result) {
        this.email = '';
        this.password = '';
        this.router.navigateByUrl('/home');
      }
    });
  }
}
