module App.SettingModal {
	var GraphYMaxInput: JQuery = null;
	var GraphYMinInput: JQuery = null;
	var GraphYMaxAutoCheckbox: JQuery = null;
	var GraphYMinAutoCheckbox: JQuery = null;

	export function SetupSettingModal(): void {
		GraphYMaxInput = $('#graph-setting-tab input[name=graph-setting-y-max]');
		GraphYMinInput = $('#graph-setting-tab input[name=graph-setting-y-min]');
		GraphYMaxAutoCheckbox = $('#graph-setting-tab input[name=graph-setting-y-max__auto-checkbox]');
		GraphYMinAutoCheckbox = $('#graph-setting-tab input[name=graph-setting-y-min__auto-checkbox]');
		$('#setting-modal .nav-tabs a[href="#graph-setting-tab"]').tab('show');

		GraphYMaxInput.prop('disabled', true);
		GraphYMinInput.prop('disabled', true);
		GraphYMaxAutoCheckbox.prop('checked', true);
		GraphYMinAutoCheckbox.prop('checked', true);

		// モーダルが開かれたときの処理
		$('#main .navbar .collapse .navbar-nav a[data-target="#setting-modal"]').on('click', function (e) {
			var auto: boolean = false;

			// 縦軸最大値
			auto = App.Params.settings.graphSetting.vMax == undefined;
			GraphYMaxAutoCheckbox.prop('checked', auto);
			GraphYMaxInput.prop('disabled', auto);
			GraphYMaxInput.val(auto ? '' : App.Params.settings.graphSetting.vMax);

			// 縦軸最小値
			auto = App.Params.settings.graphSetting.vMin == undefined;
			GraphYMinAutoCheckbox.prop('checked', auto);
			GraphYMinInput.prop('disabled', auto);
			GraphYMinInput.val(auto ? '' : App.Params.settings.graphSetting.vMin);
		});

		// 縦軸最大値の「自動」チェックボックスの状態が変化した場合の処理
		GraphYMaxAutoCheckbox.on('change', function (e) {
			GraphYMaxInput.prop('disabled', GraphYMaxAutoCheckbox.prop('checked'));
		});

		// 縦軸最小値の「自動」チェックボックスの状態が変化した場合の処理
		GraphYMinAutoCheckbox.on('change', function (e) {
			GraphYMinInput.prop('disabled', GraphYMinAutoCheckbox.prop('checked'));
		});

		// OKボタンが押された場合の処理
		$('#setting-modal .btn-ok').on('click', (e) => {

			// 縦軸の最大値
			var vMax = GetYMaxValue();
			App.Params.lineChart.config.options.scales.yAxes[0].ticks.max = vMax;
			App.Params.settings.graphSetting.vMax = vMax;

			// 縦軸の最小値
			var vMin = GetYMinValue();
			App.Params.lineChart.config.options.scales.yAxes[0].ticks.min = vMin;
			App.Params.settings.graphSetting.vMin = vMin;

			// 設定値を画面に反映する。
			App.Params.lineChart.update();
		});
	}

	function GetYMaxValue(): number {
		return GraphYMaxAutoCheckbox.prop('checked') ? undefined : +GraphYMaxInput.val();
	}

	function GetYMinValue(): number {
		return GraphYMinAutoCheckbox.prop('checked') ? undefined : +GraphYMinInput.val();
	}
}
