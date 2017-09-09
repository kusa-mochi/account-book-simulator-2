module App.ItemsArea {
	export function SetupItemButtons(): void {
		$('#main .main-body .items-area.sortable').sortable({
			revert: 100,
			stop: (event, ui) => {
				// TOOD: データの並べ替えが終わった後に行う処理をここに書く。
			},
			cancel: '.sortable-cancel'
		});
		$('#main .main-body .items-area.sortable').disableSelection();

		// 各費用項目ボタンがクリックされた場合の処理
		$(document).on('click', '#main .main-body .items-area .item-button:not(.sortable-cancel)', (e) => {
			// xボタンがクリックされていた場合
			if ($(e.target).hasClass('glyphicon-remove')) {
				OnItemRemoveButtonClick($(e.target));
				return;
			}
			var itemName = $(e.target).children('.item-button__label').text();
			App.Params.selectedItemIndex = App.Utilities.GetItemIndex(itemName);
			App.Utilities.ShowItemDetail(App.Params.selectedItemIndex);
		});

		// チェックボックスの状態が変化した場合の処理
		$('.items-area').on('change', ':checkbox', function (e) {
			// チェックボックスのチェックが更新された費用項目のインデックス
			var itemIdx = App.Utilities.GetItemIndex($(e.target).parent().children('.item-button__label').text());

			App.Params.items[itemIdx].selected = !App.Params.items[itemIdx].selected

			// グラフを更新する。
			App.GraphArea.Data2Graph();

			App.FileManager.UpdateDownloadData();
		});

		// [+]ボタンが押されたときの処理
		$('.main-body .items-area .item-button:last-child').on('click', (e) => {
			// 追加する新たな費用項目データ
			var newData: ItemData = {
				selected: true,
				name: '新しい項目',
				spendingIncome: true,	// spending
				frequency: {
					mode: App.Enums.FrequencyMode.Monthly,
					count: 1,
					month: 0,
					date: new Date(),
					amount: 0
				},
				term: {
					from: new Date(Date.now()),
					to: new Date(Date.now())
				},
				zogen: {
					mode: App.Enums.FrequencyMode.EveryYear,
					count: 0,
					month: 0,
					date: new Date(),
					amount: 0
				}
			}

			// 新たな費用項目をデータの末尾に追加する。
			App.Utilities.PushItem(newData);

			// データをGUIに反映する。
			App.Utilities.DataToGUI();

			App.ItemsArea.SelectItem(App.Params.items.length - 1);

			App.FileManager.UpdateDownloadData();

			// 詳細表示領域の項目名テキストボックスにフォーカスを移す。
			$('.item-detail-area .item-name input[name=item-name]').focus();
		});
	}

	// i番目の費用項目を選択する処理
	export function SelectItem(i: number): void {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('click', true, false);
		$('.items-area .item-button:nth(' + i + ')')[0].dispatchEvent(evt);
	}

	// ×ボタンが押されたときの処理
	function OnItemRemoveButtonClick(button: JQuery) {
		var itemName = button.siblings('.item-button__label').text();
		var itemIdx = App.Utilities.GetItemIndex(itemName);
		App.Params.items.splice(itemIdx, 1);

		// データをGUIに反映する。
		App.Utilities.DataToGUI();

		// 費用項目のボタンを1つ選択状態にする。
		if (App.Params.items.length > 0) {
			App.ItemsArea.SelectItem(itemIdx < App.Params.items.length ? itemIdx : (itemIdx - 1));
		}

		App.FileManager.UpdateDownloadData();
	}
}
