module App.Utilities {
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

		// TODO: データをグラフに反映する。
	}

	export function GUIToData(): void {

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
		return ((12 * (dTo.getFullYear() - dFrom.getFullYear())) + dTo.getMonth() - dFrom.getMonth());
	}
}
