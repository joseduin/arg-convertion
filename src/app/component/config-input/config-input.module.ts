import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConfigInputComponent } from './config-input.component';

@NgModule({
  declarations: [ConfigInputComponent],
  imports: [CommonModule, IonicModule],
  exports: [ConfigInputComponent]
})
export class ConfigInputModule { }
