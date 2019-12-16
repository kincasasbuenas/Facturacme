import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {NgForm} from '@angular/forms';
import {HomePage} from '../home/home.page';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


   usuario:Object={
    email:null,
    password:null,
  }

  public datax:any;


  constructor(private _userService:UserService, private navCtrl:NavController, public alertController: AlertController) { }

  ngOnInit() {
    this._userService.loadToken();
    if(this._userService.userToken){
      this.navCtrl.navigateForward('/home');
    }
    else{
      this.navCtrl.navigateForward('/login');
    }
  }

  login(f:NgForm){
      console.log("valores: ", f.value);
      this._userService.authUser(f.value.email,f.value.password).subscribe(data =>
      {
        console.log(data);
        let user = data;
        if(user.token){
            this._userService.loadUser(
              user.token,
              user.id,
              user.admin,
              user.role,
              user.user_type);
          this.navCtrl.navigateForward('/home');
        }
      },error => {
          let msg='';
          console.log(error.error.non_field_errors[0]);
          if(error.error.non_field_errors[0]==='Unable to log in with provided credentials.'){
            msg='Credenciales invalidas, vuelve a intentarlo.'
          }
          this.presentAlert(msg);
      });
    }


    async presentAlert(message:string){
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
