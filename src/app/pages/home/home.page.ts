import { Component } from '@angular/core';
import {OperationService} from '../../services/operation.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  oportunities:any []=[];
  loading:any;

  constructor(private _operationService:OperationService,
              public loadingController: LoadingController) {

    this.presentLoading();
    this._operationService.getOpportunities().subscribe(data=>{
      //console.log(data);
      this.oportunities=data.results;
      for (var index in this.oportunities) {
        //console.log(this.oportunities[index].operation);
        this._operationService.getOperationId(this.oportunities[index].operation).subscribe(resp=>{
          //console.log('respuesta id'+this.oportunities[index].operation);
          //console.log(resp);
          this.oportunities.map(function(obj){
              if(obj.operation === resp.id){
                obj.debtor_entity_name = resp.debtor_entity_name;
                obj.amount=resp.amount;
                obj.cost_time_priority=resp.cost_time_priority;
                obj.payment_date=resp.payment_date;
              }
          });
           this.loading.dismiss();
        });
      }
    });

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'cargando...',
    });
    return this.loading.present();
  }

}
