import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  uriAuctions='https://fact2-dev.herokuapp.com/v1/factoring/auctions';
  uriOperation='https://fact2-dev.herokuapp.com/v1/factoring/operations/';
  token:string;

  constructor(private http:HttpClient,private platform:Platform, private nativeStorage: NativeStorage,private _userService:UserService) { }


  getOpportunities(){
    this._userService.loadToken();
    this.token=this._userService.userToken;
    let url = this.uriAuctions;
    let headers= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'jwt ' + this.token
    });
    return this.http.get(url,{headers}).pipe(map(res => res));
  }

  getOperationId(idOperation:string){
    this._userService.loadToken();
    this.token=this._userService.userToken;
    let url = this.uriOperation+idOperation;
    let headers= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'jwt ' + this.token
    });
    return this.http.get(url,{headers}).pipe(map(res => res));
  }
}
