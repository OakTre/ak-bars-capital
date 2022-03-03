document.addEventListener("DOMContentLoaded", function (event) {
	const sliders = document.querySelectorAll('.js-range-input');

	const setRangeSlider = (i, val, slider) => {
		let arr = [null, null];
		arr[i] = val;

		slider.noUiSlider.set(arr);
	};

	function toArabic(x) {
		return x.toLocaleString('cs-CZ');
	}

	sliders.forEach(slider => {
		const start = Number(slider.dataset.start);
		const step = Number(slider.dataset.step);
		const min = Number(slider.dataset.min);
		const max = Number(slider.dataset.max);
		const chidInput = slider.closest(".js-range-container").querySelector(".js-range-input-child");

		noUiSlider.create(slider, {
			start: start,
			connect: 'lower',
			step: step,
			range: {
				'min': min,
				'max': max
			}
		});

		slider.noUiSlider.on("update", (values, handle) => {
			chidInput.value = toArabic(Math.round(values[0]));
		});

		chidInput.addEventListener("change", (e) => {
			setRangeSlider(0, e.currentTarget.value, slider);
		})
	});

	$(window).scroll(function () {
		$("[data-animate-value]:not([data-values-animated])").each(function () {
			var scrollTop = window.scrollY + window.innerHeight;
			var elScrollTop = $(this).offset().top + $(this).outerHeight();
			var $el = $(this);

			if (scrollTop > elScrollTop) {
				$({ Counter: 0 }).animate(
					{ Counter: $el.text() },
					{
						duration: 2100,
						easing: "swing",
						step: function (now) {
							$el.text(toArabic(Math.ceil(now)));
						},
					}
				);
				$el.attr("data-values-animated", "true");
			}
		});
	});
});
