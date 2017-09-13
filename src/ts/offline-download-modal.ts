module App.OfflineDownloadMoal {
	export function SetupOfflineDownloadModal(): void {
		$('#offline-download-modal .btn-download').on('click', (e) => {
			$('#top-menu .offline-download-link')[0].click();
		})
	}
}
