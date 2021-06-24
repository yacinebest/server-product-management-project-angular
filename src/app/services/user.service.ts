import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Product } from '../model/product';
import { Transaction } from '../model/transaction';
import { BASE_API_URL } from '../app.constants';

let API_URL = `${BASE_API_URL}/user/`;

let USER_LOGIN = API_URL + "login";
let USER_LOGOUT = API_URL + "logout";
let USER_REGISTER = API_URL + "registration";
let USER_GET_ALL_PRODUCTS = API_URL + "products";
let USER_PURCHASE_PRODUCTS = API_URL + "purchase";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<User | null>;
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders(user ? {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    } : {});

    return this.http.get<any>(USER_LOGIN, { headers: headers })
      .pipe(map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  logOut(): Observable<any> {
    return this.http.post(USER_LOGOUT, {})
      .pipe(map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      }));
  }

  register(user: User): Observable<any> {
    return this.http.post(USER_REGISTER, JSON.stringify(user),
      { headers: { "Content-Type": "application/json; charset=UTF-8" } });
  }

  findAllProducts(): Observable<any> {
    return this.http.get(USER_GET_ALL_PRODUCTS,
      { headers: { "Content-Type": "application/json; charset=UTF-8" } });
  }

  purchaseProduct(transaction: Transaction): Observable<any> {
    return this.http.post(USER_PURCHASE_PRODUCTS, JSON.stringify(transaction),
      { headers: { "Content-Type": "application/json; charset=UTF-8" } });
  }
}
