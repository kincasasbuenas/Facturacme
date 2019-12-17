import { Component } from '@angular/core';
import {OperationService} from '../../services/operation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  oportunities:any []=[];

  constructor(private _operationService:OperationService) {
    this._operationService.getOpportunities().subscribe(data=>{
      console.log(data);
      this.oportunities=data.results;
      for (var index in this.oportunities) {
        //console.log(this.oportunities[index].operation);
        this._operationService.getOperationId(this.oportunities[index].operation).subscribe(resp=>{
          //console.log('respuesta id'+this.oportunities[index].operation);
          this.oportunities[index].assign({debtor_entity_name:resp.debtor_entity_name});
          console.log(this.oportunities);
        });
      }
    });

  }

}
