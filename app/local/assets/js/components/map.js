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

		var ctrlKey = false;
        var ctrlMessVisible = false;
        var timer;

        // Отслеживаем скролл мыши на карте, чтобы показывать уведомление
        contactsMap.events.add(['wheel', 'mousedown'], function (e) {
            if (e.get('type') == 'wheel') {
                if (!ctrlKey) { // Ctrl не нажат, показываем уведомление
                    $('#ymap_ctrl_display').fadeIn(300);
                    ctrlMessVisible = true;
                    clearTimeout(timer); // Очищаем таймер, чтобы продолжать показывать уведомление
                    timer = setTimeout(function () {
                        $('#ymap_ctrl_display').fadeOut(300);
                        ctrlMessVisible = false;
                    }, 1500);
                }
                else { // Ctrl нажат, скрываем сообщение
                    $('#ymap_ctrl_display').fadeOut(100);
                }
            }
            if (e.get('type') == 'mousedown' && ctrlMessVisible) { // Скрываем уведомление при клике на карте
                $('#ymap_ctrl_display').fadeOut(100);
            }
        });

        // Обрабатываем нажатие на Ctrl
        $(document).keydown(function (e) {
            if (e.which === 17 && !ctrlKey) { // Ctrl нажат: включаем масштабирование мышью
                ctrlKey = true;
                contactsMap.behaviors.enable('scrollZoom');
            }
        });
        $(document).keyup(function (e) { // Ctrl не нажат: выключаем масштабирование мышью
            if (e.which === 17) {
                ctrlKey = false;
                contactsMap.behaviors.disable('scrollZoom');
            }
        });

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
