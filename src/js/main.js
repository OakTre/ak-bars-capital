document.addEventListener("DOMContentLoaded", function(event) {
	const options = BodyScrollOptions = {
		reserveScrollBarGap: true,
	};

	Fancybox.bind('[data-fancybox="gallery"]', {
		Toolbar: {
			display: [

			]
		},
		Image: {
			zoom: false,
		},
	});


	const fadeInAnim = document.querySelectorAll("[data-anim-fade]");

	gsap.registerPlugin(ScrollTrigger);

	//	анимация секций
	if (fadeInAnim.length) {
		function animFrom(elem, direction) {
			direction = direction || 1;
			var x = 0,
				y = direction * 100;
			gsap.fromTo(elem, {
				y: y,
				autoAlpha: 0
			}, {
				delay: 0.4,
				duration: 1.25,
				y: 0,
				autoAlpha: 1,
				ease: "expo",
				overwrite: "auto",
				clearProps: "all"
			});
		}

		gsap.utils.toArray("[data-anim-fade]").forEach(function (elem) {
			gsap.set(elem, {
				autoAlpha: 0
			});

			ScrollTrigger.create({
				trigger: elem,
				onEnter: function () {
					animFrom(elem);
				},
				onEnterBack: function () {
					// animFrom(elem, -1);
				},
				onLeave: function () {
					// gsap.set(elem, {
					// 	autoAlpha: 0
					// });
				}
			});
		});
	}
});
