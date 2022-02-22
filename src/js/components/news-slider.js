document.addEventListener("DOMContentLoaded", function (event) {
	const newsSlider = new Swiper('.js-news-slider', {
		slidesPerView: 3,
        spaceBetween: 32,
		breakpoints: {
			310: {
				slidesPerView: 1.1,
				spaceBetween: 16,
			},
			767: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			991: {
			  slidesPerView: 3,
			  spaceBetween: 32,
			},
		  },
	});
});
