import { Component } from '@angular/core';
import { ConvertCore } from 'src/app/store/core/convert.core';
import { ICurrencyConvert } from 'src/app/model/currency-convert.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public convertCore: ConvertCore) {}

  public convert() {
    this.convertCore.convert()
  }

  public clear() {
    this.convertCore.clear()
  }

  public trackItem(index: number, itemObject: ICurrencyConvert) {
		return itemObject.id
	}
}
