document.addEventListener("DOMContentLoaded", function (event) {
	// Карта
	ymaps.ready(init);

	function init() {
		let zoom = 16;
		let center = [55.817340, 49.113349];

		let contactsMap = new ymaps.Map(
			"map", {
			center: center,
			zoom: zoom,
			controls: [],
		}, {
			searchControlProvider: "yandex#search",
		}
		),

		housesCollection = new ymaps.GeoObjectCollection(null, {
			hideIconOnBalloonOpen: false,
		});

		contactsMap.behaviors.disable('scrollZoom');

		let marActive = `<a data-img="" href="" class="map__logo-svg"><img src="/local/assets/img/map-logo.svg"></a>`

		let infoCoordinates = [
			[0, 0],
			[140, 64],
		];

		let placemark = new ymaps.Placemark(
			center, {}, {
			iconLayout: ymaps.templateLayoutFactory.createClass(marActive),
			zIndex: 700,
			zIndexHover: 700,
			zIndexActive: 700,
			iconShape: {
				type: "Rectangle",
				coordinates: infoCoordinates
			},
		}
		);

		housesCollection.add(placemark);

		// housesCollection.events.add("click", function (e) {
		// 	$(".mark").removeClass("mark-active");
		// 	let el = e.get('target');
		// 	let overlay = el.getOverlaySync();
		// 	let layout = overlay.getLayoutSync();
		// 	let element = layout.getParentElement();
		// 	let markEl = $(element).find(".mark");
		// 	let marImg = $(markEl).attr("data-img");

		// 	e.get("target").options.set(
		// 		"iconLayout",
		// 		ymaps.templateLayoutFactory.createClass(
		// 			`<a data-img="${marImg}" href="#" class="mark mark-active"><img src="${marImg}"></a>`
		// 		)
		// 	);

		// 	$(".mark").each(function (index) {
		// 		if ($(".mark").eq(index).hasClass("mark-active")) {
		// 			$(".offices__item").eq(index).addClass("is-open");
		// 		} else {
		// 			$(".offices__item").eq(index).removeClass("is-open");
		// 		}
		// 	});
		// });

		contactsMap.geoObjects.add(housesCollection);
	}
});
