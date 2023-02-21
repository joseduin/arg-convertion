import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertItemComponent } from './convert-item.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ConvertItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [ConvertItemComponent]
})
export class ConvertItemModule { }
