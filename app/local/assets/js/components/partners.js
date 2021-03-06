document.addEventListener("DOMContentLoaded", function (event) {
	const partnersSlider = new Swiper('.js-partners-slider', {
		slidesPerView: 3,
        spaceBetween: 32,
		navigation: {
			nextEl: '.js-partners-slider-next',
			prevEl: '.js-partners-slider-prev',
		},
		breakpoints: {
			310: {
				slidesPerView: 1.1,
				spaceBetween: 16,
			},
			767: {
				slidesPerView: 2.1,
				spaceBetween: 24,
			},
			991: {
			  slidesPerView: 3.7,
			  spaceBetween: 32,
			},
		  },
	});
});
