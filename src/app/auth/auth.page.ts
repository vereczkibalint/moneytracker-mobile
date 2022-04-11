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
  email?: string;
  password?: string;

  constructor(private authService: AuthService, private router: Router, private storage: Storage) {
    this.storage.get(this.ONBOARD_KEY).then((value) => {
      if(!value || value === false) {
        this.router.navigateByUrl('/intro');
      }
    });
  }

  ngOnInit() { }

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
