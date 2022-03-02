document.addEventListener("DOMContentLoaded", function (event) {
	const introSlider = new Swiper('.js-intro-slider', {
		slidesPerView: 1,
        spaceBetween: 10,
		navigation: {
			nextEl: '.js-intro-slider-next',
			prevEl: '.js-intro-slider-prev',
		},
		autoplay: {
			delay: 9000,
			disableOnInteraction: false,
		},
		on: {
			afterInit: function(swiper) {
				let btn = document.querySelector(".intro-slider__nav");

				btn.classList.add("anim-start");
			},
			slideChange: function (swiper) {
				let btn = document.querySelector(".intro-slider__nav");

				btn.classList.remove("anim-start");
				setTimeout(() => {
					btn.classList.add("anim-start");
				});

				if (swiper.realIndex == 0) {
					let btn = document.querySelector(".intro-slider__nav");

					btn.classList.remove("anim-start");
					setTimeout(() => {
						btn.classList.add("anim-start");
					});
				}
			},
			slideNextTransitionStart: function (swiper) {
				if (swiper.realIndex == 0) {
					document.querySelectorAll(".slider-nav__btn").forEach((btn)=>{btn.classList.remove("opacity");btn.classList.remove("non-opacity");});
				} else {
					document.querySelectorAll(".slider-nav__btn").forEach((btn)=>{btn.classList.remove("opacity");});
					swiper.navigation.prevEl.classList.add("opacity");
				}
			},
			slidePrevTransitionStart: function (swiper) {
				if (swiper.realIndex == 0) {
					document.querySelectorAll(".slider-nav__btn").forEach((btn)=>{btn.classList.remove("opacity");btn.classList.remove("non-opacity");});
				} else {

					document.querySelectorAll(".slider-nav__btn").forEach((btn)=>{btn.classList.remove("opacity");});
					swiper.navigation.nextEl.classList.add("opacity");
				}
			},
			reachEnd: function (swiper) {
				swiper.navigation.prevEl.classList.add("non-opacity");
			}
		}
	});

	document.addEventListener("visibilitychange", function() {
		if (document.visibilityState === 'visible') {
			$(".intro-slider__nav").addClass("anim-start");
		} else {
			$(".intro-slider__nav").removeClass("anim-start");
		}
	});
});
