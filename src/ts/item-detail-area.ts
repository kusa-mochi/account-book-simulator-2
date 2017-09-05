module App.ItemDetailArea {
	export function SetupItemDetailArea(): void {
		$('.item-detail-area .frequency-every-year').css('display', 'none');
		$('.item-detail-area .frequency-one-time').css('display', 'none');

		$('.item-detail-area .item-frequency input[type=radio][name=frequency]').change(function () {
			switch (this.value) {
				case 'monthly':
					App.Utilities.ChangeFrequencyMode('frequency', true, false, false);
					App.Params.items[App.Params.selectedItemIndex].frequency.mode
					= App.Enums.FrequencyMode.Monthly;
					break;
				case 'every-year':
					App.Utilities.ChangeFrequencyMode('frequency', false, true, false);
					App.Params.items[App.Params.selectedItemIndex].frequency.mode
					= App.Enums.FrequencyMode.EveryYear;
					break;
				case 'one-time':
					App.Utilities.ChangeFrequencyMode('frequency', false, false, true);
					App.Params.items[App.Params.selectedItemIndex].frequency.mode
					= App.Enums.FrequencyMode.OneTime;
					break;
			}

			// グラフを更新する。
			App.GraphArea.Data2Graph();
		});

		$('.item-detail-area .item-zogen input[type=radio][name=zogen]').change(function () {
			switch (this.value) {
				case 'monthly':
					App.Utilities.ChangeFrequencyMode('zogen', true, false, false);
					App.Params.items[App.Params.selectedItemIndex].zogen.mode
					= App.Enums.FrequencyMode.Monthly;
					break;
				case 'every-year':
					App.Utilities.ChangeFrequencyMode('zogen', false, true, false);
					App.Params.items[App.Params.selectedItemIndex].zogen.mode
					= App.Enums.FrequencyMode.EveryYear;
					break;
				case 'one-time':
					App.Utilities.ChangeFrequencyMode('zogen', false, false, true);
					App.Params.items[App.Params.selectedItemIndex].zogen.mode
					= App.Enums.FrequencyMode.OneTime;
					break;
			}

			// グラフを更新する。
			App.GraphArea.Data2Graph();
		});

		$('.item-detail-area .frequency-count input[name=frequency-count]').bootstrapNumber({
			// default, danger, success , warning, info, primary
			upClass: 'default',
			downClass: 'default',
			center: true
		});

		// 月を指定するコンボボックスが選択された場合の処理
		$('.item-detail-area .frequency-every-year .frequency-month .dropdown-menu a').on('click', (e) => {
			// 選択された月を取得する。
			var selectedMonth: number = +$(e.target).text() - 1;	// Date構造体に対応するため，月-1 の値で変数を初期化する。

			// コンボボックスの表示を更新する。
			$(e.target).closest('.btn-group').children('.dropdown-toggle').html((selectedMonth + 1) + '<span class="caret"></span>');
			$(e.target).closest('.btn-group').children('.dropdown-toggle').val(selectedMonth + 1);

			// 「頻度」の月が更新されたのか，「増減」の月が更新されたのか判別する。
			var comboboxParent = $(e.target).closest('.panel-group').children('div');
			if(comboboxParent.hasClass('item-frequency')) {	// 「頻度」の月が更新された場合
				// データを更新する。
				App.Params.items[App.Params.selectedItemIndex].frequency.month = selectedMonth;
			}
			else if(comboboxParent.hasClass('item-zogen')) {	// 「増減」の月が更新された場合
				// データを更新する。
				App.Params.items[App.Params.selectedItemIndex].zogen.month = selectedMonth;
			}

			// グラフを更新する。
			App.GraphArea.Data2Graph();
		});

		// カレンダーコントロールの初期設定を行う。
		SetupDatePickers();
	}

	function SetupDatePickers(): void {
		$(".item-detail-area .item-frequency .frequency-one-time .input-append").datepicker({
			format: "yyyy年mm月",
			startView: "months",
			minViewMode: "months",
			autoclose: true,
			language: 'ja'
		}).on('changeDate', function (e) {
			var selectedDate = e['date'];
			var year = selectedDate.getFullYear();
			var month = selectedDate.getMonth();
			// 頻度（一度だけ）の年月のデータを上書きする。
			App.Params.items[App.Params.selectedItemIndex].frequency.date = new Date(year, month);

			// グラフを更新する。
			App.GraphArea.Data2Graph();
		});

		$(".item-detail-area .item-zogen .frequency-one-time .input-append").datepicker({
			format: "yyyy年mm月",
			startView: "months",
			minViewMode: "months",
			autoclose: true,
			language: 'ja'
		}).on('changeDate', function (e) {
			var selectedDate = e['date'];
			var year = selectedDate.getFullYear();
			var month = selectedDate.getMonth();
			// 増減（一度だけ）の年月のデータを上書きする。
			App.Params.items[App.Params.selectedItemIndex].zogen.date = new Date(year, month);

			// グラフを更新する。
			App.GraphArea.Data2Graph();
		});

		$(".item-detail-area .item-term .term-from .input-append").datepicker({
			format: "yyyy年mm月",
			startView: "months",
			minViewMode: "months",
			autoclose: true,
			language: 'ja'
		}).on('changeDate', function (e) {
			var selectedDate = e['date'];
			var year = selectedDate.getFullYear();
			var month = selectedDate.getMonth();
			// 開始年月のデータを上書きする。
			App.Params.items[App.Params.selectedItemIndex].term.from = new Date(year, month);

			// グラフを更新する。
			App.GraphArea.Data2Graph();
		});

		$(".item-detail-area .item-term .term-to .input-append").datepicker({
			format: "yyyy年mm月",
			startView: "months",
			minViewMode: "months",
			autoclose: true,
			language: 'ja'
		}).on('changeDate', function (e) {
			var selectedDate = e['date'];
			var year = selectedDate.getFullYear();
			var month = selectedDate.getMonth();
			// 終了年月のデータを上書きする。
			App.Params.items[App.Params.selectedItemIndex].term.to = new Date(year, month);

			// グラフを更新する。
			App.GraphArea.Data2Graph();
		});
	}
}
