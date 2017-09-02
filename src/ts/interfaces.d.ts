interface JQuery {
	datepicker(param): JQuery
}

interface HTMLElement {
	value: string
}

interface FrequencyData {
	mode: FrequencyMode,
	count?: number,
	month?: number,
	date?: Date,
	amount: number
}

interface TermData {
	from: Date,
	to: Date
}

interface ZogenData {
	mode: FrequencyMode,
	count?: number,
	month?: number,
	date?: Date,
	amount: number
}

interface ItemData {
	name: string,
	spendingIncome: boolean,	// true->spending, false->income
	frequency: FrequencyData,
	term: TermData,
	zogen: ZogenData
}
