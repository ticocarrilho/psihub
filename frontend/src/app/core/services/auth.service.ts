import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as moment from "moment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public userType = new BehaviorSubject<string>('');
  public userName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userName = localStorage.getItem('userName');

    if(token && userType && userName) {
      this.isLoggedIn.next(true);
      this.userType.next(userType);
      this.userName.next(userName);
    }
  }

  login(body: any): Observable<any> {
    return this.http
      .post<any>('usuario', body)
      .pipe(
        tap((res) => this.setSession(res))
      );
  }

  signUp(body: any, type: string): Observable<any> {
    const formData = new FormData();

    for (const [key, value] of Object.entries(body)) {
      //@ts-ignore
      formData.append(key, value);
    }

    return this.http
      .post<any>(type, formData)
      .pipe(
        tap((res) => this.setSession(res))
      );
  }

  logout() {
    this.isLoggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    this.router.navigate(['/']);
  }

  private setSession(authRes: any) {
    this.isLoggedIn.next(true);
    this.userType.next(authRes.userType);
    this.userName.next(authRes.userName);
    localStorage.setItem('token', authRes.token);
    localStorage.setItem('userType', authRes.userType);
    localStorage.setItem('userName', authRes.userName);
  }

}