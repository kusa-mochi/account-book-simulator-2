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
			App.Params.lineChart.config.options.scales.yAxes[0].ticks.max = GetYMaxValue();

			// 縦軸の最小値
			App.Params.lineChart.config.options.scales.yAxes[0].ticks.min = GetYMinValue();

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
