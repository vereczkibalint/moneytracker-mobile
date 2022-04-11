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
import {StorageService} from "../core/services/storage.service";
import {Storage} from "@ionic/storage";

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

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
          this.userData.next(decoded);
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
      map((response: TokenDto)=> {
        return response.jwt;
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
        this.userData.next(decoded);

        let storageObservable = from(this.storage.set(TOKEN_KEY, token));
        return storageObservable;
      })
    );
  }

  register() {}

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/auth');
      this.userData.next(null);
    })
  }

}
