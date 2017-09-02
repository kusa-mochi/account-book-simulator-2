/// <reference path="bootstrap-number-input.d.ts"/>
/// <reference path="interfaces.d.ts"/>
/// <reference path="params.ts"/>
/// <reference path="utilities.ts"/>
/// <reference path="top-menu-area.ts"/>
/// <reference path="items-area.ts"/>
/// <reference path="item-detail-area.ts"/>
/// <reference path="graph-area.ts"/>

module App.Main {
	$(document).ready(() => {
		$('#main')
			.css('opacity', '0')
			.css('pointer-events', 'none');

		App.TopMenuArea.SetupTopMenuButtons();
		App.ItemsArea.SetupItemButtons();
		App.GraphArea.SetupGraphArea();
		App.ItemDetailArea.SetupItemDetailArea();
	});
}
