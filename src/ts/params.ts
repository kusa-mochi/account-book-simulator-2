module App.Params {
	export var items: ItemData[] = new Array();
	export var selectedItemIndex = -1;
	export function SetupNewData() {
		App.Utilities.PushItem({
			selected: true,
			name: '給与',
			spendingIncome: false,	// income
			frequency: {
				mode: App.Enums.FrequencyMode.Monthly,
				count: 1,
				month: 0,
				date: new Date(),
				amount: 200000
			},
			term: {
				from: new Date(2017, 7),
				to: new Date(2037, 2)
			},
			zogen: {
				mode: App.Enums.FrequencyMode.EveryYear,
				count: 0,
				month: 3,
				date: new Date(),
				amount: 4000
			}
		});
		App.Utilities.PushItem({
			selected: true,
			name: '住宅ローン',
			spendingIncome: true,	// spending
			frequency: {
				mode: App.Enums.FrequencyMode.Monthly,
				count: 1,
				month: 0,
				date: new Date(),
				amount: 90000
			},
			term: {
				from: new Date(2017, 7),
				to: new Date(2045, 2)
			},
			zogen: {
				mode: App.Enums.FrequencyMode.OneTime,
				count: 0,
				month: 0,
				date: new Date(2017, 8),
				amount: 0
			}
		});
		App.Utilities.PushItem({
			selected: true,
			name: '賞与（夏）',
			spendingIncome: false,	// income
			frequency: {
				mode: App.Enums.FrequencyMode.EveryYear,
				count: 0,
				month: 5,
				date: new Date(),
				amount: 600000
			},
			term: {
				from: new Date(2017, 7),
				to: new Date(2037, 2)
			},
			zogen: {
				mode: App.Enums.FrequencyMode.EveryYear,
				count: 0,
				month: 5,
				date: new Date(),
				amount: 10000
			}
		});

		selectedItemIndex = 0;
	}
}
