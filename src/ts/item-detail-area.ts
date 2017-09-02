module App.ItemDetailArea {
	export function SetupItemDetailArea(): void {
		$('.item-detail-area .frequency-every-year').css('display', 'none');
		$('.item-detail-area .frequency-one-time').css('display', 'none');

		['frequency', 'zogen'].forEach((s) => {
			$('.item-detail-area .item-' + s + ' input[type=radio][name=' + s + ']').change(function () {
				switch (this.value) {
					case 'monthly':
						ChangeFrequencyMode(s, true, false, false);
						break;
					case 'every-year':
						ChangeFrequencyMode(s, false, true, false);
						break;
					case 'one-time':
						ChangeFrequencyMode(s, false, false, true);
						break;
				}
			});
		});

		$('.item-detail-area .frequency-count input[name=frequency-count]').bootstrapNumber({
			// default, danger, success , warning, info, primary
			upClass: 'default',
			downClass: 'default',
			center: true
		});

		$(".item-detail-area .item-term .term-from .input-append").datepicker({
			format: "yyyy年mm月",
			startView: "months",
			minViewMode: "months",
			autoclose: true
		}).on('changeDate', function (e) {
			var selectedDate = e['date'];
			var year = selectedDate.getFullYear();
			var month = selectedDate.getMonth();
			// 開始年月のデータを上書きする。
			App.Params.items[App.Params.selectedItemIndex].term.from = new Date(year, month);
		});

		$(".item-detail-area .item-term .term-to .input-append").datepicker({
			format: "yyyy年mm月",
			startView: "months",
			minViewMode: "months",
			autoclose: true
		}).on('changeDate', function (e) {
			var selectedDate = e['date'];
			var year = selectedDate.getFullYear();
			var month = selectedDate.getMonth();
			// 終了年月のデータを上書きする。
			App.Params.items[App.Params.selectedItemIndex].term.to = new Date(year, month);
		});
	}

	function ChangeFrequencyMode(panelName: string, monthly: boolean, everyYear: boolean, oneTime: boolean) {
		var b2d = (b: boolean) => {
			return (b ? 'block' : 'none');
		};
		$('.item-detail-area .item-' + panelName + ' .frequency-monthly').css('display', b2d(monthly));
		$('.item-detail-area .item-' + panelName + ' .frequency-every-year').css('display', b2d(everyYear));
		$('.item-detail-area .item-' + panelName + ' .frequency-one-time').css('display', b2d(oneTime));
	}
}
