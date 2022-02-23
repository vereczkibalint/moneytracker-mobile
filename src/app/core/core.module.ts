import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FabComponent} from "./components/fab/fab.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [FabComponent],
  exports: [
    FabComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CoreModule { }
