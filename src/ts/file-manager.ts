module App.FileManager {
	export function FileAPISupported(): boolean {
		return (
			window.File != null &&
			window.FileReader != null &&
			window.FileList != null &&
			window.Blob != null
		);
	}

	export function OpenFile(file: File): void {
		App.Params.currentFilePath = file.name;
		$('#navbar__save-link').attr('download', file.name);

		// ファイルの内容を読み込む処理
		var reader = new FileReader();

		// ファイル読み込み後の処理を定義する。
		reader.onload = (e) => {
			// JSONデータをJavaScriptオブジェクトに変換する。
			var fileData = JSON.parse(e.target.result);
			App.Params.items = new Array();
			fileData.forEach((itemData) => {
				App.Utilities.PushItem(
					{
						selected: itemData.selected,
						name: itemData.name,
						spendingIncome: itemData.spendingIncome,
						frequency: {
							mode: itemData.frequency.mode,
							count: itemData.frequency.count,
							month: itemData.frequency.month,
							date: new Date(itemData.frequency.date),
							amount: itemData.frequency.amount
						},
						term: {
							from: new Date(itemData.term.from),
							to: new Date(itemData.term.to)
						},
						zogen: {
							mode: itemData.zogen.mode,
							count: itemData.zogen.count,
							month: itemData.zogen.month,
							date: new Date(itemData.zogen.date),
							amount: itemData.zogen.amount
						}
					}
				);
			});


			// // JavaScriptオブジェクトをJSON形式の文字列に変換する。
			// var formatted = JSON.stringify(App.Params.items, null, 2);
			// alert(formatted);

			App.Utilities.DataToGUI();
			App.FileManager.UpdateDownloadData();
		};

		// ファイルを読み込む。
		reader.readAsText(file);
	}

	export function UpdateDownloadData(): void {
		var fileData: string = JSON.stringify(App.Params.items);
		var blob = new Blob([fileData]);
        var url = window.URL.createObjectURL(blob);
        $('#navbar__save-link')[0].href = url;
	}
}
