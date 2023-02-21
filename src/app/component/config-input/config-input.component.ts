import { Component, ViewChild, Input } from '@angular/core';
import { IonInput, Platform } from '@ionic/angular';
import { ICurrencyConvert } from 'src/app/model/currency-convert.model';
import { ConvertCore } from 'src/app/store/core/convert.core';
import { Keyboard } from '@capacitor/keyboard'

@Component({
  selector: 'app-config-input',
  templateUrl: './config-input.component.html',
  styleUrls: ['./config-input.component.scss'],
})
export class ConfigInputComponent {
  @ViewChild(IonInput, { static: true }) inputEl: IonInput

  @Input() currency: ICurrencyConvert | undefined

  constructor(private convertCore: ConvertCore, private platform: Platform) { }

  public onChange(event: any) {
    const nextVal = Number(this.inputEl.value)
    if (!isNaN(nextVal)) {
      this.convertCore.changeConfig(nextVal, this.currency.id)
    }
  }

  public done() {
    if (this.platform.is('cordova')) {
      Keyboard.hide()
    }
  }

}
