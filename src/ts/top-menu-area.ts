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

			App.ItemsArea.SelectItem(0);

			App.FileManager.UpdateDownloadData();
		});

		$('#top-menu .top-menu__open-file').on('click', (e) => {
			ShowOpenFileDialog();
		});

		// inputの内容が変更された場合の処理
		$('#top-menu__open-file-input').on('change', (e) => {
			var file = e.target.files[0];
			App.FileManager.OpenFile(file);
		});
	}

	export function NewFile(): void {
		App.Params.items = new Array();
		App.Utilities.DataToGUI();
		App.FileManager.UpdateDownloadData();
	}

	export function ShowOpenFileDialog(): void {
		// inputのクリックイベントを発火させて，ファイル選択ダイアログを開く。
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('click', true, false);
		$('#top-menu__open-file-input')[0].dispatchEvent(evt);

		$('#top-menu')
			.css('opacity', '0')
			.css('pointer-events', 'none');
		$('#main')
			.css('opacity', '1')
			.css('pointer-events', 'auto');
	}
}
