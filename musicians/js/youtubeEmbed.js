const YOUTUBE_SRC_MAP = {
	musician: 'https://www.youtube.com/embed/QvW61K2s0tA?enablejsapi=1',
	noncreatorFeedback: 'https://www.youtube.com/embed/LgmxMuW6Fsc?enablejsapi=1',
	videomanFeedback: 'https://www.youtube.com/embed/hr_OjNV5plA?enablejsapi=1',
	studioFeedback: 'https://www.youtube.com/embed/m86ae_e_ptU?enablejsapi=1',
	results: 'https://www.youtube.com/embed/m86ae_e_ptU?enablejsapi=1',
};

const openYoutubeModal = videoType => {
	const src = YOUTUBE_SRC_MAP[videoType];

	const modalEl = document.getElementById('youtube-modal');
	const iframeEl = document.getElementById('youtube-iframe');

	iframeEl.src = src;

	document.body.classList.add('disable-scroll');
	modalEl.classList.add('active');
};

const closeYoutubeModal = () => {
	const modalEl = document.getElementById('youtube-modal');
	const iframeEl = document.getElementById('youtube-iframe');

	document.body.classList.remove('disable-scroll');
	modalEl.classList.remove('active');

	iframeEl.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
	iframeEl.src = '';
};

$(document).ready(function() {
	const youtubeModalEl = document.getElementById('youtube-modal');
	onclickOutside(
		youtubeModalEl.getElementsByClassName('modal-container')[0],
		closeYoutubeModal,
		event => {
			if (event.target.classList.contains('play')) {
				return false;
			}

			if (!youtubeModalEl.classList.contains('active')) {
				return false;
			}

			return true;
		},
	);
});
