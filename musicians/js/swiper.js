$(document).ready(function() {
	new Swiper('#swiper-why-need-us', {
		loop: true,
		autoplay: {
		    delay: 5000,
		},
		speed: 400,
		pagination: {
			clickable: true,
			el: '#pagination-why-need-us',
		},
	});

	new Swiper('#swiper-feedback', {
		loop: true,
		centeredSlides: true,
		slidesPerView: 2,
		spaceBetween: 20,
		initialSlide: 2,
	});
});
