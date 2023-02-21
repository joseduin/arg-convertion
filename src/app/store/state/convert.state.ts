import { Injectable } from '@angular/core'
import { State, StateContext, Selector, Action, NgxsSimpleChange, NgxsOnChanges, NgxsOnInit } from '@ngxs/store'
import { ConvertStore } from 'src/app/model/convert-store.model'
import { ConvertChangeValue, ConvertSaveValue, ConvertClear, ConvertChangeConfig } from '../action/convert.action'
import { patch, updateItem } from '@ngxs/store/operators';
import { ICurrencyConvert } from 'src/app/model/currency-convert.model';
import { Storages } from '../storage';

// https://www.ngxs.io
@State<ConvertStore>({
	name: 'convert',
	defaults: {
		lastOne: 'dolar',
		currencies: [{
			id: 'dolar',
			icon: 'assets/currency/usa.png',
			name: 'dolar',
			valueFromDolar: 1.00,
			value: 1,
			changeFromConfig: false
		}, {
			id: 'dolarBlue',
			icon: 'assets/currency/arg-blue.png',
			name: 'blue',
			valueFromDolar: 377.00,
			changeFromConfig: true
		}, {
			id: 'dolarOficial',
			icon: 'assets/currency/argentina.png',
			name: 'arg',
			valueFromDolar: 199.26,
			changeFromConfig: true
		}, {
			id: 'pesosChilenos',
			icon: 'assets/currency/chile.png',
			name: 'ch',
			valueFromDolar: 797.84,
			changeFromConfig: true
		}],
	},
})
@Injectable()
export class ConvertState implements NgxsOnInit, NgxsOnChanges {
	constructor(private storage: Storages) {}

	ngxsOnChanges({ currentValue, firstChange }: NgxsSimpleChange) {
		if (!firstChange) {
			this.storage.setItem('conversor', currentValue)
		}
	}

	ngxsOnInit({ dispatch, setState }: StateContext<ConvertStore>) {
		this.storage.getItem('conversor').then((data: ConvertStore | undefined) => {
			if (data) {
				setState((state) => ({
					...state,
					...data
				}))
			}
		}).catch(error => { })
		.finally(() => {

			dispatch(new ConvertChangeValue())
		})
	}

	@Selector() static getCurrencies(state: ConvertStore) {
		return state.currencies
	}

	@Action(ConvertSaveValue)
	saveValue({ setState }: StateContext<ConvertStore>, { type, value }: ConvertSaveValue) {
		setState(patch<ConvertStore>({
			lastOne: type,
			currencies: updateItem(item => item.id === type, patch({ value }))
		}))
	}

	@Action(ConvertChangeValue)
	convert({ getState, setState }: StateContext<ConvertStore>) {
		const { currencies, lastOne } = getState()
		const [dolar, blue, arg, ch] = currencies

		if (dolar.value || blue.value || arg.value || ch.value) {
			const currency = currencies.find(item => item.id === lastOne)
			const dolarValue = lastOne === 'dolar' ? currency.value : currency.value / currency.valueFromDolar

			const dolarNext: ICurrencyConvert = {
				...dolar,
				value: Number(Number(dolarValue).toFixed(2))
			}
			const blueNext: ICurrencyConvert = {
				...blue,
				value: lastOne === 'dolarBlue' ? blue.value : Number(Number(blue.valueFromDolar * dolarValue).toFixed(2))
			}
			const argNext: ICurrencyConvert = {
				...arg,
				value: lastOne === 'dolarOficial' ? arg.value : Number(Number(arg.valueFromDolar * dolarValue).toFixed(2))
			}
			const chNext: ICurrencyConvert = {
				...ch,
				value: lastOne === 'pesosChilenos' ? ch.value : Number(Number(ch.valueFromDolar * dolarValue).toFixed(2))
			}

			setState(patch<ConvertStore>({
				currencies: [dolarNext, blueNext, argNext, chNext]
			}))
		}
	}

	@Action(ConvertClear)
	clear({ setState, getState }: StateContext<ConvertStore>) {
		const { currencies } = getState()
		const [dolar, blue, arg, ch] = currencies

		const dolarNext: ICurrencyConvert = {
			...dolar,
			value: null
		}
		const blueNext: ICurrencyConvert = {
			...blue,
			value: null
		}
		const argNext: ICurrencyConvert = {
			...arg,
			value: null
		}
		const chNext: ICurrencyConvert = {
			...ch,
			value: null
		}

		setState(patch<ConvertStore>({
			lastOne: 'dolar',
			currencies: [dolarNext, blueNext, argNext, chNext]
		}))
	}

	@Action(ConvertChangeConfig)
	changeConfig({ setState }: StateContext<ConvertStore>, {type, value}: ConvertChangeConfig) {
		setState(patch<ConvertStore>({
			currencies: updateItem(item => item.id === type, patch({valueFromDolar: value}))
		}))
	}

}
