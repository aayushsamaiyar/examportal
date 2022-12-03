import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

// current user fetch
  public getCurrentuser(){
    return this.http.get(`${baseUrl}/current-user`);
  }


  // generate token

  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  // login user: set token in LocalStorage

  public loginuser(token : any){
    localStorage.setItem("token", token );
    return true
  }

  // isLogin : user is loggen in or not

  public isLogin(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr=="" || tokenStr==null)
      return false;
    return true;
  }

  // logout delete token from local storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // get token
  public getToken(){
    return localStorage.getItem("token");
  }

  // set userdetails

  public setUser(user: any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  // get user
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
    }
  }

  // get user role

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
