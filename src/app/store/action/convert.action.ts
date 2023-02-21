import { TCurrentID } from "src/app/model/currency-convert.model";

class ConvertChangeValue {
	static readonly type = '[Convert] do'

	constructor() {}
}

class ConvertClear {
	static readonly type = '[Convert] clear'

	constructor() {}
}

class ConvertSaveValue {
	static readonly type = '[Convert] saveValue'

	constructor(public value: number, public type: TCurrentID) {}
}

class ConvertChangeConfig {
	static readonly type = '[Convert] changeConfig'

	constructor(public value: number, public type: TCurrentID) {}
}

export {
	ConvertClear,
	ConvertSaveValue,
	ConvertChangeValue,
	ConvertChangeConfig,
}