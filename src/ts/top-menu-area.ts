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
			App.Params.SetupNewData();

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
