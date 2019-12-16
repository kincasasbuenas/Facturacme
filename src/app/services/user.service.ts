import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  uriAuth = 'https://fact2-dev.herokuapp.com/v1/auth'
  user: Credentials = {};
  userToken:string;

  constructor(private http:HttpClient,private platform:Platform, private nativeStorage: NativeStorage) {
  }

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

    this.userToken=token;
    this.saveStorage();

  }

  authUser(email:string,password:string){
    let user ={
        "username": "",
        "email": email,
        "password": password
    }

    let body = JSON.stringify(user);
    let url = this.uriAuth;
    let headers= new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(url, body, {headers}).pipe(map(res => res));
  }

  saveStorage(){
    if(this.platform.is('cordova')){
      //celular
      this.nativeStorage.setItem('userToken', this.userToken)
        .then(
          () => console.log('Stored saved!'),
          error => console.error('Error save storing item', error)
        );
    }else{
      localStorage.setItem('userToken',this.userToken);
    }
  }

  loadToken(){
    return new Promise((resolve, reject)=>{
      if(this.platform.is('cordova')){
        //celular
        this.nativeStorage.getItem('userToken').then( val =>{
          if (val) {
            this.userToken = val;
            resolve(true);
          }
          else{
            resolve(false);
          }
        })

      }else{
        //escritorio
        if(localStorage.getItem('userToken')){
          this.userToken= localStorage.getItem('userToken');
          resolve(true);
        }
        else{
          resolve(false);
        }
      }
    })
  }

  clearToken(){
    this.userToken = null;
    if(this.platform.is('cordova')){
      //celular
      this.nativeStorage.remove('userToken');
    }else{
      //escritorio
      localStorage.removeItem('userToken');
    }
    //para dejar de escuchar el objeto usuario.
    //this._doc.unsubscribe();
  }

}


export interface Credentials {
  token ?: string;
  id ?: string;
  admin ?: boolean;
  role ?: string;
  user_type ?: number;

}
