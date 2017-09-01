/// <reference path="bootstrap-number-input.d.ts"/>

enum FrequencyMode {
	Monthly,
	EveryYear,
	OneTime
}

interface FrequencyData {
	mode: FrequencyMode,
	count?: number,
	month?: number,
	date?: Date,
	amount: number
}

interface TermData {
	from: Date,
	to: Date
}

interface ZogenData {
	mode: FrequencyMode,
	count?: number,
	month?: number,
	date?: Date,
	amount: number
}

interface ItemData {
	name: string,
	spendingIncome: boolean,	// true->spending, false->income
	frequency: FrequencyData,
	term: TermData,
	zogen: ZogenData
}

var items: ItemData[] = new Array();

// function separate(num) {
// 	return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
// }

$(document).ready(() => {
	$('#main')
		.css('opacity', '0')
		.css('pointer-events', 'none');

	SetupTopMenuButtons();
	SetupItemButtons();
	SetupGraphArea();
	SetupItemDetailArea();
});

function ResetData(): void {

}

function ResetGUI(): void {
	// すべての費用項目を一覧から削除する。
	$('#main .items-area .item-button:not(.sortable-cancel)').remove();
}

function DataToGUI(): void {
	// データを費用項目一覧に反映する。
	for (var i = items.length - 1; i >= 0; i--) {
		$('#main .items-area').prepend(
			$('<li type="button" class="btn btn-default btn-lg item-button"></li>')
				.append(
				$('<input type="checkbox" class="item-button__checkbox" checked>')
				)
				.append(
				$('<div class="item-button__label"></div>')
					.text(items[i].name)
				)
				.append(
				$('<button class="btn btn-default glyphicon glyphicon-remove"></button>')
				)
		);
	}

	// TODO: データをグラフに反映する。
}

function GUIToData(): void {

}

function SetupTopMenuButtons(): void {
	$('#top-menu .top-menu__new-simulation').on('click', () => {
		$('#top-menu')
			.css('opacity', '0')
			.css('pointer-events', 'none');
		$('#main')
			.css('opacity', '1')
			.css('pointer-events', 'auto');

		// 新規データの作成
		items.push(
			{
				name: '給与',
				spendingIncome: false,	// income
				frequency: {
					mode: FrequencyMode.Monthly,
					count: 1,
					amount: 200000
				},
				term: {
					from: new Date(2017, 7),
					to: new Date(2037, 2)
				},
				zogen: {
					mode: FrequencyMode.EveryYear,
					month: 3,
					amount: 4000
				}
			}
		);
		items.push(
			{
				name: '住宅ローン',
				spendingIncome: true,	// spending
				frequency: {
					mode: FrequencyMode.Monthly,
					count: 1,
					amount: 90000
				},
				term: {
					from: new Date(2017, 7),
					to: new Date(2045, 2)
				},
				zogen: {
					mode: FrequencyMode.OneTime,
					date: new Date(2017, 8),
					amount: 0
				}
			}
		);

		// 新規作成の準備
		DataToGUI();
	});

	$('#top-menu .top-menu__open-file').on('click', () => {
		$('#top-menu')
			.css('opacity', '0')
			.css('pointer-events', 'none');
		$('#main')
			.css('opacity', '1')
			.css('pointer-events', 'auto');

		// TODO: ファイルを開くダイアログを表示する。
	});
}

function SetupItemButtons(): void {
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

		// クリックされたitem-buttonにのみ，selectedクラスを付加する。
		$(e.target).addClass('selected');

		// TODO: 詳細表示領域に，費用項目の詳細情報を表示する。
		var itemName = $(e.target).children('.item-button__label').text();
		items.forEach((item) => {
			if (item.name == itemName) {
				// 費用項目名
				$('.item-detail-area .item-name input[name=item-name]').val(item.name);

				// 支出／収入
				$(item.spendingIncome ? 'input[name=spending-income]:nth(0)' : 'input[name=spending-income]:nth(1)').prop('checked', true);

				// 頻度：「毎月・毎年・一度だけ」
				switch (item.frequency.mode) {
					case FrequencyMode.Monthly:
						$('input[name=frequency]:nth(0)').prop('checked', true);
						$('.item-detail-area .item-frequency .frequency-count input[name=frequency-count]').val(item.frequency.count);
						break;
					case FrequencyMode.EveryYear:
						$('input[name=frequency]:nth(1)').prop('checked', true);
						break;
					case FrequencyMode.OneTime:
						$('input[name=frequency]:nth(2)').prop('checked', true);
						break;
				}

				// 頻度：金額
				$('.item-detail-area .item-frequency .amount input[name=amount]').val(item.frequency.amount);

				// 金額の増減：「毎月・毎年・一度だけ」
				switch (item.zogen.mode) {
					case FrequencyMode.Monthly:
						$('input[name=zogen]:nth(0)').prop('checked', true);
						$('.item-detail-area .item-zogen .frequency-count input[name=frequency-count]').val(item.zogen.count);
						break;
					case FrequencyMode.EveryYear:
						$('input[name=zogen]:nth(1)').prop('checked', true);
						break;
					case FrequencyMode.OneTime:
						$('input[name=zogen]:nth(2)').prop('checked', true);
						break;
				}

				// 金額の増減：金額
				$('.item-detail-area .item-zogen .amount input[name=amount]').val(item.zogen.amount);
			}
		});
	});
}

function SetupGraphArea(): void {
	//折れ線グラフ
	var w = $('.graph-area').width();
	var h = $('.graph-area').height();
	$('#LineChart').attr('width', w);
	$('#LineChart').attr('height', h);
	var ctx = document.getElementById("LineChart");
	var myLineChart = new Chart($(ctx), {
		//グラフの種類
		type: 'line',
		//データの設定
		data: {
			// //データ項目のラベル
			labels: [
				"2017", "", "", "", "", "", "", "", "", "", "", "",
				"2018", "", "", "", "", "", "", "", "", "", "", "",
				"2019", "", "", "", "", "", "", "", "", "", "", "",
				"2017", "", "", "", "", "", "", "", "", "", "", "",
				"2018", "", "", "", "", "", "", "", "", "", "", "",
				"2019", "", "", "", "", "", "", "", "", "", "", "",
				"2017", "", "", "", "", "", "", "", "", "", "", "",
				"2018", "", "", "", "", "", "", "", "", "", "", "",
				"2019", "", "", "", "", "", "", "", "", "", "", "",
				"2017", "", "", "", "", "", "", "", "", "", "", "",
				"2018", "", "", "", "", "", "", "", "", "", "", "",
				"2019", "", "", "", "", "", "", "", "", "", "", "",
				"2017", "", "", "", "", "", "", "", "", "", "", "",
				"2018", "", "", "", "", "", "", "", "", "", "", "",
				"2019", "", "", "", "", "", "", "", "", "", "", "",
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
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					-1200000, -1900000, -300000, -500000, -200000, -300000, -1200000, -1900000, -300000, -500000, -200000, -300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
					1200000, 1900000, 300000, 500000, 200000, 300000, 1200000, 1900000, 300000, 500000, 200000, 300000,
				]
			}]
		},
		//オプションの設定
		options: {
			scales: {
				Axes: [{
					stacked: true,
					ticks: {
						userCallback: (value, index, values) => {
							value = value.toString().split(/(?=(?:...)*$)/).join(',');
							return value;
						}
					}
				}]
			},
			responsive: true,
			maintainAspectRatio: false,
		}
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

function SetupItemDetailArea(): void {
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

	$(".item-detail-area .item-term .input-append").datepicker({
		format: "yyyy年mm月",
		startView: "months",
		minViewMode: "months",
		autoclose: true
	});
}
