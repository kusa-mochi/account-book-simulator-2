// interface HTMLElement {
// 	getContext(s: string): string;
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

function SetupTopMenuButtons(): void {
	$('#top-menu .top-menu__new-simulation').on('click', () => {
		$('#top-menu')
			.css('opacity', '0')
			.css('pointer-events', 'none');
		$('#main')
			.css('opacity', '1')
			.css('pointer-events', 'auto');
	});

	$('#top-menu .top-menu__open-file').on('click', () => {
		$('#top-menu')
			.css('opacity', '0')
			.css('pointer-events', 'none');
		$('#main')
			.css('opacity', '1')
			.css('pointer-events', 'auto');
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

	$(document).on('click', '#main .main-body .items-area .item-button', (e) => {
		// すべてのitem-buttonから，selectedクラスを除外する。
		$('#main .main-body .items-area .item-button').removeClass('selected');

		// クリックされたitem-buttonにのみ，selectedクラスを付加する。
		$(e.target).addClass('selected');
	});
}

function SetupGraphArea(): void {
	//折れ線グラフ
	var w = $('.graph-area').width();
	var h = $('.graph-area').height();
	$('#LineChart').attr('width', w);
	$('#LineChart').attr('height', h);
	var ctx = document.getElementById("LineChart");
	var myLineChart = new Chart(ctx, {
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

function SetupItemDetailArea(): void {
	$('.item-detail-area .frequency-every-year').css('display', 'none');
	$('.item-detail-area .frequency-one-time').css('display', 'none');

	['frequency', 'zogen'].forEach((s) => {
		$('.item-detail-area .item-' + s + ' input[type=radio][name=' + s + ']').change(function () {
			switch(this.value) {
				case 'monthly':
					$('.item-detail-area .item-' + s + ' .frequency-monthly').css('display', 'block');
					$('.item-detail-area .item-' + s + ' .frequency-every-year').css('display', 'none');
					$('.item-detail-area .item-' + s + ' .frequency-one-time').css('display', 'none');
					break;
				case 'every-year':
					$('.item-detail-area .item-' + s + ' .frequency-monthly').css('display', 'none');
					$('.item-detail-area .item-' + s + ' .frequency-every-year').css('display', 'block');
					$('.item-detail-area .item-' + s + ' .frequency-one-time').css('display', 'none');
					break;
				case 'one-time':
					$('.item-detail-area .item-' + s + ' .frequency-monthly').css('display', 'none');
					$('.item-detail-area .item-' + s + ' .frequency-every-year').css('display', 'none');
					$('.item-detail-area .item-' + s + ' .frequency-one-time').css('display', 'block');
					break;
			}
		});
	});
}
