import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'priority',pure: false
})
export class PriorityPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}

  transform(value: any): SafeHtml {
    let html='';
    if(value==1){
      html='Instabuy <i class="material-icons" style="font-size:20px;vertical-align: middle;">offline_bolt</i>';
    }else if(value==2){
      html='Remate <i class="material-icons" style="font-size:20px;vertical-align: middle;">monetization_on</i>';
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
