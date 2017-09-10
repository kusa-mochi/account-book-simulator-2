/// <reference path="bootstrap-number-input.d.ts"/>
/// <reference path="interfaces.d.ts"/>
/// <reference path="params.ts"/>
/// <reference path="file-manager.ts"/>
/// <reference path="utilities.ts"/>
/// <reference path="top-menu-area.ts"/>
/// <reference path="items-area.ts"/>
/// <reference path="item-detail-area.ts"/>
/// <reference path="graph-area.ts"/>

module App.Main {
	$(document).ready(() => {
		if (!App.Utilities.ValidateApp()) {
			alert('お使いのWebブラウザはHTML5のFile APIに対応していないため，本アプリケーションをご利用になれません。アプリケーションを終了します。');
			return;
		}

		$('#main')
			.css('opacity', '0')
			.css('pointer-events', 'none');

		App.TopMenuArea.SetupTopMenuButtons();
		App.ItemsArea.SetupItemButtons();
		App.GraphArea.SetupGraphArea();
		App.ItemDetailArea.SetupItemDetailArea();
	});
}
