module App.ItemDetailArea {
	export var ItemNameTextbox: JQuery = null;
	var FrequencyAmountTextbox: JQuery = null;
	export var FrequencyAmountNumeric: AutoNumeric = null;
	var ZogenAmountTextbox: JQuery = null;
	export var ZogenAmountNumeric: AutoNumeric = null;

	export var FrequencyDatePicker: JQuery = null;
	export var ZogenDatePicker: JQuery = null;
	export var TermFromDatePicker: JQuery = null;
	export var TermToDatePicker: JQuery = null;

	export function SetupItemDetailArea(): void {
		ItemNameTextbox = $('.item-detail-area .item-name .form-control');
		FrequencyAmountTextbox = $('.item-detail-area .item-frequency .amount .form-control');
		FrequencyAmountNumeric = new AutoNumeric(
			'.item-detail-area .item-frequency .amount .form-control',
			App.Params.amountTextboxOptions
		);
		ZogenAmountTextbox = $('.item-detail-area .item-zogen .amount .form-control');
		ZogenAmountNumeric = new AutoNumeric(
			'.item-detail-area .item-zogen .amount .form-control',
			App.Params.amountTextboxOptions
		);

		FrequencyDatePicker = $(".item-detail-area .item-frequency .frequency-one-time .input-append");
		ZogenDatePicker = $(".item-detail-area .item-zogen .frequency-one-time .input-append");
		TermFromDatePicker = $(".item-detail-area .item-term .term-from .input-append");
		TermToDatePicker = $(".item-detail-area .item-term .term-to .input-append");

		$('.item-detail-area .frequency-every-year').css('display', 'none');
		$('.item-detail-area .frequency-one-time').css('display', 'none');

		// 項目名が変更された場合の処理
		ItemNameTextbox.keyup((e) => {
			App.Params.items[App.Params.selectedItemIndex].name = '' + ItemNameTextbox.val();

			App.Utilities.DataToGUI();
			App.FileManager.UpdateDownloadData();
		});

		// 支出・収入の種別が変更された場合の処理
		$('.item-detail-area input[type=radio][name=spending-income]').change(function () {
			App.Params.items[App.Params.selectedItemIndex].spendingIncome = this.value == 'spending';

			// グラフを更新する。
			App.GraphArea.Data2Graph();

			App.FileManager.UpdateDownloadData();
		});

		// 頻度：毎月・毎年・一度だけ　が変更された場合の処理
		$('.item-detail-area .item-frequency input[type=radio][name=frequency]').change(function () {
			switch (this.value) {
				case 'monthly':
					App.Utilities.ChangeFrequencyMode('frequency', true, false, false);
					App.Params.items[App.Params.selectedItemIndex].frequency.mode
					= App.Enums.FrequencyMode.Monthly;
					TermFromDatePicker.children('input').prop('disabled', false);
					TermToDatePicker.children('input').prop('disabled', false);
					ZogenDatePicker.children('input').prop('disabled', false);
					break;
				case 'every-year':
					App.Utilities.ChangeFrequencyMode('frequency', false, true, false);
					App.Params.items[App.Params.selectedItemIndex].frequency.mode
					= App.Enums.FrequencyMode.EveryYear;
					TermFromDatePicker.children('input').prop('disabled', false);
					TermToDatePicker.children('input').prop('disabled', false);
					ZogenDatePicker.children('input').prop('disabled', false);
					break;
				case 'one-time':
					App.Utilities.ChangeFrequencyMode('frequency', false, false, true);
					App.Params.items[App.Params.selectedItemIndex].frequency.mode
					= App.Enums.FrequencyMode.OneTime;
					TermFromDatePicker.children('input').prop('disabled', true);
					TermToDatePicker.children('input').prop('disabled', true);
					ZogenDatePicker.children('input').prop('disabled', true);
					break;
			}

			// グラフを更新する。
			App.GraphArea.Data2Graph();

			App.FileManager.UpdateDownloadData();
		});

		// 頻度・増減：回数のスピンコントロールの初期化処理
		$('.item-detail-area .frequency-count input').bootstrapNumber({
			// default, danger, success , warning, info, primary
			upClass: 'default',
			downClass: 'default',
			center: true
		});

		// 頻度・増減：回数が変更された場合の処理
		$('.item-detail-area .frequency-count .input-group').on('click', '.input-group-btn', (e) => {
			var count = +$(e.target).closest('.input-group').children('.form-control').val();
			var parent = $(e.target).closest('.panel.panel-default');
			if(parent.hasClass('item-frequency')) {	// 「頻度」の回数が更新された場合
				// データを更新する。
				App.Params.items[App.Params.selectedItemIndex].frequency.count = count;
			}
			else if(parent.hasClass('item-zogen')) {	// 「増減」の回数が更新された場合
				// データを更新する。
				App.Params.items[App.Params.selectedItemIndex].zogen.count = count;
			}

			// グラフを更新する。
			App.GraphArea.Data2Graph();

			App.FileManager.UpdateDownloadData();
		})

		// 頻度・増減：月を指定するコンボボックスが選択された場合の処理
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

			App.FileManager.UpdateDownloadData();
		});

		// 頻度：金額が変更された場合の処理
		var onFrequencyAmountChanged = (e) => {
			App.Params.items[App.Params.selectedItemIndex].frequency.amount = FrequencyAmountNumeric.getNumber();

			// グラフを更新する。
			App.GraphArea.Data2Graph();

			App.FileManager.UpdateDownloadData();
		};
		FrequencyAmountTextbox.keyup(onFrequencyAmountChanged);
		FrequencyAmountTextbox.change(onFrequencyAmountChanged);
		FrequencyAmountTextbox.on('mousewheel', onFrequencyAmountChanged);
		FrequencyAmountTextbox.on('DOMMouseScroll', onFrequencyAmountChanged);
		FrequencyAmountTextbox.on('onmousewheel', onFrequencyAmountChanged);

		// 増減：毎月・毎年・一度だけ　が変更された場合の処理
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

			App.FileManager.UpdateDownloadData();
		});

		// 増減：金額が変更された場合の処理
		var onZogenAmountChanged = (e) => {
			App.Params.items[App.Params.selectedItemIndex].zogen.amount = ZogenAmountNumeric.getNumber();

			// グラフを更新する。
			App.GraphArea.Data2Graph();

			App.FileManager.UpdateDownloadData();
		};
		ZogenAmountTextbox.keyup(onZogenAmountChanged);
		ZogenAmountTextbox.change(onZogenAmountChanged);
		ZogenAmountTextbox.on('mousewheel', onZogenAmountChanged);
		ZogenAmountTextbox.on('DOMMouseScroll', onZogenAmountChanged);
		ZogenAmountTextbox.on('onmousewheel', onZogenAmountChanged);

		// カレンダーコントロールの初期設定を行う。
		SetupDatePickers();
	}

	function SetupDatePickers(): void {
		FrequencyDatePicker.datepicker({
			format: "yyyy年mm月",
			startView: "months",
			minViewMode: "months",
			autoclose: true,
			language: 'ja'
		}).on('changeDate', function (e) {
			// 頻度（一度だけ）の年月が変更された場合の処理

			var selectedDate = e['date'];
			var year = selectedDate.getFullYear();
			var month = selectedDate.getMonth();
			var date = new Date(year, month);

			// すべてのカレンダーに同じ年月を表示し，データも更新する。
			SetSameDateAsFrequencyToAllCalendars(date);

			// グラフを更新する。
			App.GraphArea.Data2Graph();

			App.FileManager.UpdateDownloadData();
		});

		ZogenDatePicker.datepicker({
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

			App.FileManager.UpdateDownloadData();
		});

		TermFromDatePicker.datepicker({
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

			App.FileManager.UpdateDownloadData();
		});

		TermToDatePicker.datepicker({
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

			App.FileManager.UpdateDownloadData();
		});
	}

	export function HideItemDetailArea(): void {
		$('.item-detail-area').css('display', 'none');
	}

	export function DisplayItemDetailArea(): void {
		$('.item-detail-area').css('display', 'block');
	}

	function SetSameDateAsFrequencyToAllCalendars(date: Date): void {
		var dateString = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';

		// 頻度（一度だけ）の年月のデータを上書きする。
		App.Params.items[App.Params.selectedItemIndex].frequency.date = date;

		// 期間の年月を上書きする。データはイベントハンドラから更新される。
		TermFromDatePicker.datepicker(
			'setDate', dateString
		);
		TermToDatePicker.datepicker(
			'setDate', dateString
		);

		// 増減（一度だけ）の年月を上書きする。データはイベントハンドラから更新される。
		ZogenDatePicker.datepicker(
			'setDate', dateString
		);
	}
}
