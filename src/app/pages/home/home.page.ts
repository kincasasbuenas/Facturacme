import { Component } from '@angular/core';
import {OperationService} from '../../services/operation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private _operationService:OperationService) {
    this._operationService.getOpportunities();
  }

}
