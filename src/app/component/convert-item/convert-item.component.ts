import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICurrencyConvert } from 'src/app/model/currency-convert.model';
import { ConvertCore } from 'src/app/store/core/convert.core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-convert-item',
  templateUrl: './convert-item.component.html',
  styleUrls: ['./convert-item.component.scss'],
})
export class ConvertItemComponent implements OnInit {
  @ViewChild(IonInput, { static: true }) inputEl: IonInput

  @Input() currency: ICurrencyConvert | undefined
	@Output() onDone: EventEmitter<void> = new EventEmitter()

  constructor(private convertCore: ConvertCore) { }

  ngOnInit() {}

  public onInput() {
    const nextVal = Number(this.inputEl.value)
    if (!isNaN(nextVal)) {
      this.convertCore.saveValue(nextVal, this.currency.id)
    }
  }

  public done() {
    this.onDone.emit()
  }

}
