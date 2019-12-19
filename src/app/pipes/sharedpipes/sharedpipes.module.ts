import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityPipe } from '../priority.pipe';


@NgModule({
  declarations: [PriorityPipe],
  imports: [
    CommonModule
  ],
  exports:[PriorityPipe]
})
export class SharedpipesModule { }
