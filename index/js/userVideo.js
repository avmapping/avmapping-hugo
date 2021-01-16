const playActiveUserVideo = (delay = true, callback = () => {}) => {
	const swiperEl = document.getElementById('swiper-user-video');
	const slides = Array.from(swiperEl.getElementsByClassName('swiper-slide'));

	const play = () => {
		slides.forEach(slide => {
			const isActive = slide.classList.contains('swiper-slide-active');
			const iframeEl = slide.getElementsByTagName('iframe')[0];

			if (isActive) {
				iframeEl.contentWindow.postMessage(
					'{"event":"command","func":"playVideo","args":""}',
					'*',
				);
			} else {
				iframeEl.contentWindow.postMessage(
					'{"event":"command","func":"stopVideo","args":""}',
					'*',
				);
			}
		});
	};

	if (delay) {
		setTimeout(() => {
			play();
		}, 500);
	} else {
		play();
	}

	callback();
};

const stopAllUserVideo = callback => {
	const swiperEl = document.getElementById('swiper-user-video');
	const slides = Array.from(swiperEl.getElementsByClassName('swiper-slide'));

	slides.forEach(slide => {
		const iframeEl = slide.getElementsByTagName('iframe')[0];
		iframeEl.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
	});

	callback();
};

const checkIsInView = el => {
	console.log('el',el);
	const scroll = window.scrollY || window.pageYOffset;
	const boundsTop = el.getBoundingClientRect().top + scroll;

	const viewport = {
		top: scroll,
		bottom: scroll + window.innerHeight,
	};

	const bounds = {
		top: boundsTop,
		bottom: boundsTop + el.clientHeight,
	};

	return (
		(bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
		(bounds.top <= viewport.bottom && bounds.top >= viewport.top)
	);
};

const handleViewportEvent = (el, onEnter, onLeave) => {
	document.addEventListener('scroll', event => {
		const isInViewport = checkIsInView(el);
		const alreadyInViewport = el.classList.contains('in-viewport');

		if (!alreadyInViewport && isInViewport) {
			const setEnterStatus = () => el.classList.add('in-viewport');
			onEnter(setEnterStatus);
		} else if (alreadyInViewport && !isInViewport) {
			const setLeaveStatus = () => el.classList.remove('in-viewport');
			onLeave(setLeaveStatus);
		}
	});
};

const handleVideoEvent = ({ onVideoEnd }) => {
	const swiperEl = document.getElementById('swiper-user-video');
	const iframeIdList = Array.from(swiperEl.getElementsByTagName('iframe')).map(el => el.id);

	iframeIdList.forEach(iframeId => {
		new YT.Player(iframeId, {
			events: {
				onStateChange: event => {
					if (event.data == YT.PlayerState.ENDED) {
						onVideoEnd();
					}
				},
			},
		});
	});
};

$(document).ready(function() {
	handleViewportEvent(
		document.getElementById('swiper-user-video'),
		setEnterStatus => playActiveUserVideo(false, setEnterStatus),
		setLeaveStatus => stopAllUserVideo(setLeaveStatus),
	);

	const userVideoSwiper = new Swiper('#swiper-user-video', {
		loop: true,
		centeredSlides: true,
		slidesPerView: 2,
		spaceBetween: 20,
		initialSlide: 1,
		on: {
			slideChange: () => playActiveUserVideo(false),
			click: event => {
				const element = event.target;
				const isPrev = element.classList.contains('swiper-slide-prev');
				const isNext = element.classList.contains('swiper-slide-next');

				if (isPrev) {
					userVideoSwiper.slidePrev();
				}

				if (isNext) {
					userVideoSwiper.slideNext();
				}
			},
		},
		breakpoints: {
			800: {
				spaceBetween: 50,
			},
		},
	});

	handleVideoEvent({
		onVideoEnd: () => {
			userVideoSwiper.slideNext();
		},
	});
});
