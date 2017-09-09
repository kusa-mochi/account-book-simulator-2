module App.GraphArea {

	var lineChart: Chart = null;

	export function SetupGraphArea(): void {
		//折れ線グラフ
		var w = $('.graph-area').width();
		var h = $('.graph-area').height();
		$('#LineChart').attr('width', w);
		$('#LineChart').attr('height', h);
		lineChart = new Chart($('#LineChart'), {
			//グラフの種類
			type: 'line',
			//データの設定
			data: {
				// //データ項目のラベル
				labels: [
					""
				],
				//データセット
				datasets: [{
					//凡例
					label: "資産",
					fill: true,
					lineTension: 0,
					pointRadius: 2,
					//背景色
					backgroundColor: "rgba(19,101,223,0.4)",
					//枠線の色
					borderColor: "rgba(19,101,223,1)",
					borderWidth: 1,
					//グラフのデータ
					data: [
						0
					]
				}]
			},
			//オプションの設定
			options: {
				responsive: true,
				maintainAspectRatio: false,
			}
		});
	}

	export function ResetGraph(): void {
		lineChart.data.labels = [''];
		lineChart.data.datasets[0].data = [0];
		lineChart.update();
	}

	export function Data2Graph(): void {
		// 費用項目データが1件も無い場合
		if (App.Params.items.length == 0) {
			ResetGraph();
			return;
		}

		// 全計算期間の開始・終了年月をもとめる。
		var from = new Date(3000, 12);
		var to = new Date(1900, 1);
		var fromValue = App.Utilities.GetDateValue(new Date(3000, 12));
		var toValue = App.Utilities.GetDateValue(new Date(1900, 1));
		App.Params.items.forEach((e) => {
			if (App.Utilities.GetDateValue(e.term.from) < fromValue) {
				fromValue = App.Utilities.GetDateValue(e.term.from);
				from = e.term.from;
			}
			if (toValue < App.Utilities.GetDateValue(e.term.to)) {
				toValue = App.Utilities.GetDateValue(e.term.to);
				to = e.term.to;
			}
		});

		// グラフの点の数（計算期間が何か月分か）をもとめる。
		var numMonths = App.Utilities.GetNumMonths(from, to);

		// 横軸のラベル
		var d: Date = from;
		var graphLabels = new Array(numMonths);
		for (var i = 0; i < numMonths; i++) {
			if (d.getMonth() == 0 && d.getFullYear() % 10 == 0) {
				graphLabels[i] = '' + d.getFullYear();
			}
			else {
				graphLabels[i] = '';
			}
			d = App.Utilities.GetNextMonth(d);
		}
		lineChart.data.labels = graphLabels;


		d = from;
		var graphData: number[] = new Array(numMonths);
		for (var i = 0; i < numMonths; i++) {
			graphData[i] = 0;
		}

		// 各費用項目の増減分金額をストックしておくための配列。
		var zogens: number[] = new Array(App.Params.items.length);
		for (var j = 0; j < App.Params.items.length; j++) {
			zogens[j] = 0;
		}

		// グラフの点の数についてループ
		for (var i = 0; i < numMonths; i++) {

			if (i == 0) {
				graphData[i] = 0;
			}
			else {
				// 前月の思い出
				graphData[i] = graphData[i - 1];
			}

			// 各費用項目についてループ
			for (var j = 0; j < App.Params.items.length; j++) {
				// j番目の費用項目にチェックが入っていない場合
				if (!App.Params.items[j].selected) {
					continue;
				}

				// j番目の費用項目の金額を増減する場合
				if (App.Utilities.ZogenThisMonth(App.Params.items[j], d)) {
					zogens[j] += (App.Params.items[j].zogen.mode == App.Enums.FrequencyMode.Monthly ? App.Params.items[j].zogen.count : 1)
						* App.Params.items[j].zogen.amount;
				}

				// j番目の費用項目を計上する場合
				if (App.Utilities.CountableAmountThisMonth(App.Params.items[j], d)) {
					var spendingIncome = (App.Params.items[j].spendingIncome ? -1 : 1);
					graphData[i] += (((App.Params.items[j].frequency.mode == App.Enums.FrequencyMode.Monthly ? App.Params.items[j].frequency.count : 1)
						* App.Params.items[j].frequency.amount) + zogens[j]) * spendingIncome;
				}
			}

			d = App.Utilities.GetNextMonth(d);
		}

		lineChart.data.datasets[0].data = graphData;
		lineChart.update();
	}
}
