import { Component, OnInit } from '@angular/core';
import { ConvertCore } from 'src/app/store/core/convert.core';
import { ICurrencyConvert } from 'src/app/model/currency-convert.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public convertCore: ConvertCore) { }

  ngOnInit() {
  }

  public trackItem(index: number, itemObject: ICurrencyConvert) {
		return itemObject.id
	}

}
