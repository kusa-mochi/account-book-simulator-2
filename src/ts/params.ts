module App.Params {
	export var items: ItemData[] = new Array();
	export var lineChart: Chart = null;
	export var settings: SettingData = {
		graphSetting: {
			vMax: undefined,
			vMin: undefined
		}
	};
	export var selectedItemIndex = -1;
	export var currentFilePath = null;
	export function SetupNewData() {
		App.Utilities.PushItem({
			selected: true,
			name: '給与',
			spendingIncome: false,	// income
			frequency: {
				mode: App.Enums.FrequencyMode.Monthly,
				count: 1,
				month: 0,
				date: new Date(Date.now()),
				amount: 220000
			},
			term: {
				from: new Date(2017, 7),
				to: new Date(2042, 2)
			},
			zogen: {
				mode: App.Enums.FrequencyMode.EveryYear,
				count: 0,
				month: 3,
				date: new Date(Date.now()),
				amount: 4000
			}
		});
		App.Utilities.PushItem({
			selected: true,
			name: 'ボーナス',
			spendingIncome: false,	// income
			frequency: {
				mode: App.Enums.FrequencyMode.EveryYear,
				count: 0,
				month: 5,
				date: new Date(Date.now()),
				amount: 300000
			},
			term: {
				from: new Date(2017, 7),
				to: new Date(2042, 2)
			},
			zogen: {
				mode: App.Enums.FrequencyMode.EveryYear,
				count: 0,
				month: 5,
				date: new Date(Date.now()),
				amount: 10000
			}
		});
		App.Utilities.PushItem({
			selected: true,
			name: '生活費',
			spendingIncome: true,	// spending
			frequency: {
				mode: App.Enums.FrequencyMode.Monthly,
				count: 1,
				month: 0,
				date: new Date(Date.now()),
				amount: 180000
			},
			term: {
				from: new Date(2017, 7),
				to: new Date(2067, 2)
			},
			zogen: {
				mode: App.Enums.FrequencyMode.OneTime,
				count: 0,
				month: 0,
				date: new Date(2017, 8),
				amount: 0
			}
		});

		selectedItemIndex = 0;
		currentFilePath = undefined;
	}
}
