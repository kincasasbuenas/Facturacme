import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uriAuth = 'https://fact2-dev.herokuapp.com/v1/auth'
  user: Credentials = {};
  
  constructor() { }

  loadUser( token: string,
            id: string,
            admin: boolean,
            role: string,
            user_type: number ) {

    this.user.token = token;
    this.user.id = id;
    this.user.admin = admin;
    this.user.role = role;
    this.user.user_type = user_type;

  }

  authUser(email:string,password:string){

  }

}

export interface Credentials {
  token ?: string;
  id ?: string;
  admin ?: boolean;
  role ?: string;
  user_type ?: number;

}
