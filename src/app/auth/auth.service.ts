import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";
import {BehaviorSubject, from, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {LoginDto} from "./dto/login.dto";

import { environment } from '../../environments/environment';
import {TokenDto} from "./dto/token.dto";
import {Storage} from "@ionic/storage";
import {UserDto} from "./dto/user.dto";

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private platform: Platform,
    private router: Router
  ) {
    this.loadStoredToken();
  }

  public user: Observable<any>;
  private tokenData = new BehaviorSubject(null);
  private userData = new BehaviorSubject(null);

  loadStoredToken() {
    let platformObservable = from(this.platform.ready());

    this.user = platformObservable.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if(token) {
          let decoded = helper.decodeToken(token);
          this.tokenData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  login(loginDto: LoginDto) {
    return this.http.post(
      `${environment.API_URL}/login`,
      loginDto
    ).pipe(
      map((response: TokenDto) => {
        console.log(response.jwt);
        return response.jwt;
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
        this.tokenData.next(decoded);

        let storageObservable = from(this.storage.set(TOKEN_KEY, token));
        return storageObservable;
      })
    );
  }

  register() {}

  fetchLoggedInUserData() {
    return this.http.get(
      `${environment.API_URL}/users/me`
    ).pipe(
      map((response: UserDto) => {
        return response;
      }),
      switchMap(user => {
        this.userData.next(user);

        let storageObservable = from(this.storage.set(USER_KEY, user));
        return storageObservable;
      })
    );
  }

  logout() {
    Promise.all([
      this.storage.remove(TOKEN_KEY),
      this.storage.remove(USER_KEY)
    ])
    .then(() => {
      this.router.navigateByUrl('/auth', { replaceUrl: true });
      this.userData.next(null);
    })
  }

}
