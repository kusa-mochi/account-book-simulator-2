module App.Utilities {
	export function ValidateApp(): boolean {
		if (
			!App.FileManager.FileAPISupported()
		) {
			return false;
		}

		return true;
	}

	export function GetItemIndex(itemName: string): number {
		for (var i = 0; i < App.Params.items.length; i++) {
			if (App.Params.items[i].name == itemName) {
				return i;
			}
		}

		return -1;
	}

	export function ResetData(): void {

	}

	export function ResetGUI(): void {
		// すべての費用項目を一覧から削除する。
		$('#main .items-area .item-button:not(.sortable-cancel)').remove();
	}

	export function DataToGUI(): void {

		ResetGUI();

		// 費用項目データが1件も無い場合
		if (App.Params.items.length == 0) {
			App.ItemDetailArea.HideItemDetailArea();
		} else {
			App.ItemDetailArea.DisplayItemDetailArea();
		}

		// データを費用項目一覧に反映する。
		for (var i = App.Params.items.length - 1; i >= 0; i--) {
			$('#main .items-area').prepend(
				$('<li type="button" class="btn btn-default btn-lg item-button"></li>')
					.append(
					$('<input type="checkbox" class="item-button__checkbox" checked>')
					)
					.append(
					$('<div class="item-button__label"></div>')
						.text(App.Params.items[i].name)
					)
					.append(
					$('<button class="btn btn-default glyphicon glyphicon-remove"></button>')
					)
			);
		}

		// グラフを更新する。
		App.GraphArea.Data2Graph();
	}

	// 費用項目詳細情報表示領域の，頻度情報に応じて，設定項目を切り替える処理。
	export function ChangeFrequencyMode(panelName: string, monthly: boolean, everyYear: boolean, oneTime: boolean) {
		var b2d = (b: boolean) => {
			return (b ? 'block' : 'none');
		};
		$('.item-detail-area .item-' + panelName + ' .frequency-monthly').css('display', b2d(monthly));
		$('.item-detail-area .item-' + panelName + ' .frequency-every-year').css('display', b2d(everyYear));
		$('.item-detail-area .item-' + panelName + ' .frequency-one-time').css('display', b2d(oneTime));
	}

	// 年月に固有の整数値を計算する。年月が進むほど，値は一様に大きくなる。
	export function GetDateValue(d: Date): number {
		var output = (12 * (d.getFullYear() - 1900)) + d.getMonth();
		return output;
	}

	// 2つの年月の間の月数（何カ月あるか）をもとめる。
	export function GetNumMonths(dFrom: Date, dTo: Date): number {
		return ((12 * (dTo.getFullYear() - dFrom.getFullYear())) + dTo.getMonth() - dFrom.getMonth() + 1);
	}

	export function GetNextMonth(d: Date): Date {
		if (d.getMonth() == 11) {
			return new Date(d.getFullYear() + 1, 0);
		}
		else {
			return new Date(d.getFullYear(), d.getMonth() + 1);
		}
	}

	// 費用項目の金額を指定した年月に計上するか判別する。
	// true: 計上する。　false: 計上しない。
	export function CountableAmountThisMonth(data: ItemData, month: Date): boolean {

		if (
			(GetDateValue(month) < GetDateValue(data.term.from)) ||
			(GetDateValue(data.term.to) < GetDateValue(month))
		) {
			return false;
		}

		var output = false;

		switch (data.frequency.mode) {
			case App.Enums.FrequencyMode.Monthly:
				output = true;
				break;
			case App.Enums.FrequencyMode.EveryYear:
				if (data.frequency.month == month.getMonth()) {
					output = true;
				}
				break;
			case App.Enums.FrequencyMode.OneTime:
				if (
					(data.frequency.date.getFullYear() == month.getFullYear()) &&
					(data.frequency.date.getMonth() == month.getMonth())
				) {
					output = true;
				}
				break;
		}

		return output;
	}

	// 指定した年月に金額を増減するか判別する。
	// true: 増減する。　false: 増減しない。
	export function ZogenThisMonth(data: ItemData, month: Date): boolean {

		if (
			(GetDateValue(month) < GetDateValue(data.term.from)) ||
			(GetDateValue(data.term.to) < GetDateValue(month))
		) {
			return false;
		}

		var output = false;

		switch (data.zogen.mode) {
			case App.Enums.FrequencyMode.Monthly:
				output = true;
				break;
			case App.Enums.FrequencyMode.EveryYear:
				if (data.zogen.month == month.getMonth()) {
					output = true;
				}
				break;
			case App.Enums.FrequencyMode.OneTime:
				if (
					(data.zogen.date.getFullYear() == month.getFullYear()) &&
					(data.zogen.date.getMonth() == month.getMonth())
				) {
					output = true;
				}
				break;
		}

		return output;
	}

	// 引数の番号で指定された費用項目の詳細情報を，詳細情報表示部に表示する。
	export function ShowItemDetail(itemIdx: number): void {
		// クリックされたitem-buttonのみ，スタイルを変更する。
		$('#main .main-body .items-area .item-button:nth(' + itemIdx + ')')
			.addClass('selected')
			.siblings()
			.removeClass('selected');

		var item = App.Params.items[itemIdx];

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
		var dateFrom = App.Params.items[itemIdx].term.from;
		$(".item-detail-area .item-term .term-from .input-append").datepicker(
			'setDate', dateFrom.getFullYear() + '年' + (dateFrom.getMonth() + 1) + '月'
		);

		// 期間：終了
		var dateTo: Date = App.Params.items[itemIdx].term.to;
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
	}

	export function IsIncludedInItems(itemName: string): boolean {
		var output = false;
		App.Params.items.forEach((e) => {
			if (e.name == itemName) {
				output = true;
				return;
			}
		});

		return output;
	}

	export function PushItem(data: ItemData): void {
		// 既に費用項目が存在する場合
		while (IsIncludedInItems(data.name)) {
			data.name = data.name + '(1)';
		}

		App.Params.items.push(data);
	}
}
