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
}
