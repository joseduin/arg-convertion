export type TCurrentID = 'dolar' | 'dolarBlue' | 'dolarOficial' | 'pesosChilenos'

export interface ICurrencyConvert {
    id: TCurrentID
    icon: string
    name: string
    valueFromDolar: number
    value?: number
    changeFromConfig: boolean
}
