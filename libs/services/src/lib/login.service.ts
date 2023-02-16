import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  shareReplay,
  Subscription,
  switchMap,
  tap,
  timer,
} from 'rxjs';

import * as dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { Role } from '@prisma/client';
import { json } from 'stream/consumers';

interface AuthResult {
  access_token: string;
}

interface User {
  username: string;
  id: string;
  roles: Role[];
}

@Injectable()
export class LoginService {
  loginPath = 'auth/login';

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _isUser = new BehaviorSubject<boolean>(false);
  private _isAdmin = new BehaviorSubject<boolean>(false);
  private _username = new BehaviorSubject<string>('');
  private _userId = new BehaviorSubject<string>('');

  subscription: Subscription;

  constructor(private readonly http: HttpClient) {
    this.registerTimer();
    this.registerObservables();
  }

  login(username: string, password: string) {
    return this.http.post(this.loginPath, { username, password }).pipe(
      catchError((err) => {
        this.logout();
        throw err;
      }),
      tap((res) => {
        const access_token = (res as AuthResult).access_token;

        const decoded = jwt_decode<{
          username: string;
          sub: string;
          roles: Role[];
          exp: number;
        }>(access_token);

        const user: User = {
          username: decoded.username,
          id: decoded.sub,
          roles: decoded.roles,
        };

        this.setSession(access_token, decoded.exp, user);

        this._isLoggedIn.next(true);

        return of({ username: decoded.username, id: decoded.sub });
      })
    );
  }

  private registerObservables() {
    this._isLoggedIn.subscribe((v) => {
      if (v) {
        this._isUser.next(this.getRoles().includes(Role.USER));
        this._isAdmin.next(this.getRoles().includes(Role.ADMIN));
        this._username.next(this.username());
        this._userId.next(this.userId());
      } else {
        this._isUser.next(false);
        this._isAdmin.next(false);
        this._username.next('');
        this._userId.next('');
      }
    });
  }

  private registerTimer() {
    if (!this.subscription || this.subscription.closed) {
      // TODO get expiry from token

      let prev = false;
      this.subscription = timer(0, 5000).subscribe(() => {
        console.log('checking status');
        const now = dayjs().isBefore(this.getExpiration());

        if (prev != now) {
          this._isLoggedIn.next(now);
          prev = now;
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this._isAdmin.next(false);
    this._isUser.next(false);
    this._isLoggedIn.next(false);
  }

  private setSession(token: string, expiry: number, user: User) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('expires_at', expiry.toString());
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  public getUsername() {
    return this._username.asObservable();
  }

  public isAdmin() {
    return this._isAdmin.asObservable();
  }

  public isUser() {
    return this._isUser.asObservable();
  }

  public getUserId() {
    return this._userId.asObservable();
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    return dayjs.unix(Number(expiration));
  }

  private username() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return (JSON.parse(userStr) as User).username;
    } else {
      return '';
    }
  }

  private userId() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return (JSON.parse(userStr) as User).id;
    } else {
      return '';
    }
  }

  private getRoles() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return (JSON.parse(userStr) as User).roles;
    } else {
      return [];
    }
  }
}
