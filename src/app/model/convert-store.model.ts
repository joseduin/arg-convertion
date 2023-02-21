import { ICurrencyConvert, TCurrentID } from './currency-convert.model'

export interface ConvertStore {
    currencies: ICurrencyConvert[],
    lastOne: TCurrentID
}