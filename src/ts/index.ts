/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/jqueryui/index.d.ts" />
/// <reference path="../../node_modules/@types/bootstrap/index.d.ts" />

$(document).ready(() => {
	$('#main')
		.css('opacity', '0')
		.css('pointer-events', 'none');

	SetupTopMenuButtons();
	SetupItemButtons();
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
		}
	});
	$('#main .main-body .items-area.sortable').disableSelection();
}
