module App.TopMenuArea {
	export function SetupTopMenuButtons(): void {
		$('#top-menu .top-menu__new-simulation').on('click', () => {
			$('#top-menu')
				.css('opacity', '0')
				.css('pointer-events', 'none');
			$('#main')
				.css('opacity', '1')
				.css('pointer-events', 'auto');

			// 新規データの作成
			items.push(
				{
					name: '給与',
					spendingIncome: false,	// income
					frequency: {
						mode: FrequencyMode.Monthly,
						count: 1,
						amount: 200000
					},
					term: {
						from: new Date(2017, 7),
						to: new Date(2037, 2)
					},
					zogen: {
						mode: FrequencyMode.EveryYear,
						month: 3,
						amount: 4000
					}
				}
			);
			items.push(
				{
					name: '住宅ローン',
					spendingIncome: true,	// spending
					frequency: {
						mode: FrequencyMode.Monthly,
						count: 1,
						amount: 90000
					},
					term: {
						from: new Date(2017, 7),
						to: new Date(2045, 2)
					},
					zogen: {
						mode: FrequencyMode.OneTime,
						date: new Date(2017, 8),
						amount: 0
					}
				}
			);

			// 新規作成の準備
			App.Utilities.DataToGUI();
		});

		$('#top-menu .top-menu__open-file').on('click', () => {
			$('#top-menu')
				.css('opacity', '0')
				.css('pointer-events', 'none');
			$('#main')
				.css('opacity', '1')
				.css('pointer-events', 'auto');

			// TODO: ファイルを開くダイアログを表示する。
		});
	}
}
