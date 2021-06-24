import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Product } from '../model/product';
import { Transaction } from '../model/transaction';
import { BASE_API_URL } from '../app.constants';

let API_URL = `${BASE_API_URL}/admin/`;

let ADMIN_updateUser = API_URL + "user-update";
let ADMIN_deleteUser = API_URL + "user-delete";
let ADMIN_userAll = API_URL + "user-all";
let ADMIN_userNumber = API_URL + "user-number";
let ADMIN_productCreate = API_URL + "product-create";
let ADMIN_productUpdate = API_URL + "product-update";
let ADMIN_productDelete = API_URL + "product-delete";
let ADMIN_productAll = API_URL + "product-all";
let ADMIN_productNumber = API_URL + "product-number";
let ADMIN_transactionAll = API_URL + "transaction-all";
let ADMIN_transactionNumber = API_URL + "transaction-number";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage!.getItem('currentUser')!);
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      "Content-Type": "application/json; charset=UTF-8"
    });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(ADMIN_updateUser, JSON.stringify(user),
      { headers: this.headers });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(ADMIN_deleteUser, JSON.stringify(user),
      { headers: this.headers });
  }

  findAllUsers(): Observable<any> {
    return this.http.get(ADMIN_userAll,
      { headers: this.headers });
  }

  numberOfUsers(): Observable<any> {
    return this.http.get(ADMIN_userNumber,
      { headers: this.headers });
  }

  //products
  createProduct(product: Product): Observable<any> {
    return this.http.post(ADMIN_productCreate, JSON.stringify(product),
      { headers: this.headers });
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(ADMIN_productUpdate, JSON.stringify(product),
      { headers: this.headers });
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.post(ADMIN_productDelete, JSON.stringify(product),
      { headers: this.headers });
  }

  findAllProducts(): Observable<any> {
    return this.http.get(ADMIN_productAll,
      { headers: this.headers });
  }

  numberOfProducts(): Observable<any> {
    return this.http.get(ADMIN_productNumber,
      { headers: this.headers });
  }

  //transactions
  findAllTransactions(): Observable<any> {
    return this.http.get(ADMIN_transactionAll,
      { headers: this.headers });
  }

  numberOfTransactions(): Observable<any> {
    return this.http.get(ADMIN_transactionNumber,
      { headers: this.headers });
  }
}
