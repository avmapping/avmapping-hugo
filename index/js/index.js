$(document).ready(async function() {
	await new Swiper('#swiper-feedback', {
		loop: true,
		navigation: {
			nextEl: '.feedback-next',
			prevEl: '.feedback-prev',
		},
	});

	await new Swiper('.history-swiper-container', {
		slidesPerView: screen.width > 799 ? 3 : 1,
		initialSlide: 4,
		spaceBetween: 0,
		freeMode: true,
	});

	await new Swiper('#swiper-partner', {
		loop: true,
		slidesPerView: 3,
		centeredSlides: true,
		spaceBetween: 15,
		freeMode: true,
		navigation: {
			nextEl: '.swiper-partner-next',
			prevEl: '.swiper-partner-prev',
		},
		pagination: {
			el: '.swiper-partner-pagination',
		},
		breakpoints: {
			500: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
			800: {
				slidesPerView: 6,
				spaceBetween: 30,
			},
		},
	});
});
