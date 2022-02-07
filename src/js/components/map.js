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

		contactsMap.geoObjects.add(housesCollection);
	}
});
