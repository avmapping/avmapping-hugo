$(document).ready(function() {
	new Swiper('#swiper-feedback', {
		loop: true,
		navigation: {
			nextEl: '.feedback-next',
			prevEl: '.feedback-prev',
		},
	});

	new Swiper('#swiper-partner', {
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
