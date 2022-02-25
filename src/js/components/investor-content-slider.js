document.addEventListener("DOMContentLoaded", function (event) {
	const introSlider = new Swiper('.js-swiper', {
		slidesPerView: "auto",
        spaceBetween: 32,
		breakpoints: {
			310: {
				slidesPerView: 1.1,
				spaceBetween: 16,
			},
			767: {
				slidesPerView: 1.5,
				spaceBetween: 24,
			},
			991: {
			  slidesPerView: "auto",
			  spaceBetween: 32,
			},
		},
	});
});
