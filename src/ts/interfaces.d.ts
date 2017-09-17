/// <reference path="enums.ts"/>

interface JQuery {
	datepicker(param): JQuery
}

interface HTMLElement {
	value: string
}

interface FrequencyData {
	mode: App.Enums.FrequencyMode,
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
	mode: App.Enums.FrequencyMode,
	count?: number,
	month?: number,
	date?: Date,
	amount: number
}

interface ItemData {
	selected: boolean,
	name: string,
	spendingIncome: boolean,	// true->spending, false->income
	frequency: FrequencyData,
	term: TermData,
	zogen: ZogenData
}

interface GraphSettingData {
	vMax: number,	// 縦軸の最大値（undefinedでライブラリの自動設定に従う）
	vMin: number	// 縦軸の最小値（undefinedでライブラリの自動設定に従う）
}

interface SettingData {
	graphSetting: GraphSettingData
}

interface Window {
	File,
	FileReader,
	FileList
}
