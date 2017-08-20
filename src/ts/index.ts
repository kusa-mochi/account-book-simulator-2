/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/bootstrap/index.d.ts" />

$(document).ready(() => {
	$('#main')
		.css('opacity', '0')
		.css('pointer-events', 'none');

	SetupTopMenuButtons();
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
