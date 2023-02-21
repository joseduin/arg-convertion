import { Injectable } from '@angular/core'
import { Store, Select } from '@ngxs/store'
import { Observable } from 'rxjs'
import { ConvertState } from '../state/convert.state'
import { ICurrencyConvert, TCurrentID } from 'src/app/model/currency-convert.model'
import { ConvertChangeValue, ConvertSaveValue, ConvertClear, ConvertChangeConfig } from '../action/convert.action'

@Injectable()
export class ConvertCore {
	@Select(ConvertState.getCurrencies) currencies$: Observable<ICurrencyConvert[]>

	constructor(private store: Store) {}

	public convert() {
		this.store.dispatch(new ConvertChangeValue())
	}

	public clear() {
		this.store.dispatch(new ConvertClear())
	}

	public saveValue(value: number, input: TCurrentID) {
		this.store.dispatch(new ConvertSaveValue(value, input))
	}

	public changeConfig(value: number, input: TCurrentID) {
		this.store.dispatch(new ConvertChangeConfig(value, input))
	}

}