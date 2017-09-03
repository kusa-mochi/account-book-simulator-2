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
		$(document).on('click', '#main .main-body .items-area .item-button', (e) => {
			// すべてのitem-buttonから，selectedクラスを除外する。
			$('#main .main-body .items-area .item-button').removeClass('selected');

			// クリックされたitem-buttonのみ，スタイルを変更する。
			$(e.target).addClass('selected');

			// TODO: 詳細表示領域に，費用項目の詳細情報を表示する。
			var itemName = $(e.target).children('.item-button__label').text();
			App.Params.selectedItemIndex = App.Utilities.GetItemIndex(itemName);
			var item = App.Params.items[App.Params.selectedItemIndex];

			// 費用項目名
			$('.item-detail-area .item-name input[name=item-name]').val(item.name);

			// 支出／収入
			$(item.spendingIncome ? 'input[name=spending-income]:nth(0)' : 'input[name=spending-income]:nth(1)').prop('checked', true);

			// 頻度：「毎月・毎年・一度だけ」
			switch (item.frequency.mode) {
				case App.Enums.FrequencyMode.Monthly:
					$('input[name=frequency]:nth(0)').prop('checked', true);
					App.Utilities.ChangeFrequencyMode('frequency', true, false, false);
					$('.item-detail-area .item-frequency .frequency-count input[name=frequency-count]').val(item.frequency.count);
					break;
				case App.Enums.FrequencyMode.EveryYear:
					$('input[name=frequency]:nth(1)').prop('checked', true);
					App.Utilities.ChangeFrequencyMode('frequency', false, true, false);
					break;
				case App.Enums.FrequencyMode.OneTime:
					$('input[name=frequency]:nth(2)').prop('checked', true);
					App.Utilities.ChangeFrequencyMode('frequency', false, false, true);
					break;
			}

			// 頻度：金額
			$('.item-detail-area .item-frequency .amount input[name=amount]').val(item.frequency.amount);

			// 期間：開始
			var dateFrom = App.Params.items[App.Params.selectedItemIndex].term.from;
			$(".item-detail-area .item-term .term-from .input-append").datepicker(
				'setDate', dateFrom.getFullYear() + '年' + (dateFrom.getMonth() + 1) + '月'
			);

			// 期間：終了
			var dateTo: Date = App.Params.items[App.Params.selectedItemIndex].term.to;
			$(".item-detail-area .item-term .term-to .input-append").datepicker(
				'setDate', dateTo.getFullYear() + '年' + (dateTo.getMonth() + 1) + '月'
			);

			// 金額の増減：「毎月・毎年・一度だけ」
			switch (item.zogen.mode) {
				case App.Enums.FrequencyMode.Monthly:
					$('input[name=zogen]:nth(0)').prop('checked', true);
					App.Utilities.ChangeFrequencyMode('zogen', true, false, false);
					$('.item-detail-area .item-zogen .frequency-count input[name=frequency-count]').val(item.zogen.count);
					break;
				case App.Enums.FrequencyMode.EveryYear:
					$('input[name=zogen]:nth(1)').prop('checked', true);
					App.Utilities.ChangeFrequencyMode('zogen', false, true, false);
					break;
				case App.Enums.FrequencyMode.OneTime:
					$('input[name=zogen]:nth(2)').prop('checked', true);
					App.Utilities.ChangeFrequencyMode('zogen', false, false, true);
					break;
			}

			// 金額の増減：金額
			$('.item-detail-area .item-zogen .amount input[name=amount]').val(item.zogen.amount);
		});
	}
}
