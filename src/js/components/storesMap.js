// обработчик запроса
function sendRequest(method, url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open(method, url);

		xhr.responseType = "json";

		xhr.onload = () => {
			if (xhr.status >= 400) {
				reject(xhr.response);
			} else {
				resolve(xhr.response);
			}
		};

		xhr.onerror = () => {
			reject(xhr.response);
		};

		xhr.send();
	});
};

document.addEventListener("DOMContentLoaded", function (event) {
	const selectCityEl = document.querySelector(".js-sity-select");
	const selectStoresEl = document.querySelector(".js-stores-select");

	const url = "/local/include/cities.json";

	const contentHeading = document.querySelector(".js-content-heading");
	const contentStreet = document.querySelector(".js-content-street");
	const contentWorkingHours = document.querySelector(".js-content-working-hours");
	const contentMobile = document.querySelector(".js-content-mobile");

	let response;
	let placemark;
	let cityId = 0;

	// отправдяем запрос в бд
	sendRequest("GET", url)
		.then((data) => {
			// сохраняем дату
			response = data;

			// проходимся по бз и забираем название городов с адишниками
			for (let i = 0; i < response.length; i++) {
				let selectCityOption = `
					<option value="${response[i].id}">
						${response[i].city}
					</option>
				`;

				// подставляем в селект
				selectCityEl.innerHTML += selectCityOption;
			}

			// инициализирум селект с городами
			const selectCity = new Choices(selectCityEl, {
				searchEnabled: false,
				itemSelectText: '',
				shouldSort: false,
				allowHTML: true,
			});

			// заходим в бд и в Казани(id=0) забираем пункты продаж с адишниками
			for (let i = 0; i < response[0].stores.length; i++) {
				let selectStoreOption = `
					<option value="${response[0].stores[i].id}">
						${response[0].stores[i].slectName}
					</option>
				`;

				// подставляем в селект
				selectStoresEl.innerHTML += selectStoreOption;
			}

			// инициализирум селект с пунктом продаж
			const selectStores = new Choices(selectStoresEl, {
				searchEnabled: false,
				itemSelectText: '',
				shouldSort: false,
				allowHTML: true,
			});


			// Карта
			function init() {
				let zoom = 16;
				let center = [55.817340, 49.113349];

				let storesMap = new ymaps.Map(
					"pay-stores-map", {
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

				// storesMap.behaviors.disable('scrollZoom');

				// проходимся по бз и подставляем иконки на карту
				response.forEach((city) => {
					let marActive = `<a data-img="" href="" class="map__logo-svg"><img src="/local/assets/img/map-logo.svg"></a>`

					let infoCoordinates = [[55.70, 37.30], [55.80, 37.40]];

					placemark = new ymaps.Placemark(
						city.coords, {}, {
						iconLayout: ymaps.templateLayoutFactory.createClass(marActive),
						zIndex: 700,
						zIndexHover: 700,
						zIndexActive: 700,
						iconShape: {
							type: "Rectangle",
							coordinates: [[55.70, 37.30], [55.80, 37.40]],
						},
					});

					housesCollection.add(placemark);
				});

				storesMap.geoObjects.add(housesCollection);

				// сдвигаем ценрт карты от блока справа
				let pixelCenter = storesMap.getGlobalPixelCenter(center);

				pixelCenter = [
					pixelCenter[0] + 300,
					pixelCenter[1] + 100
				];

				let geoCenter = storesMap.options.get('projection').fromGlobalPixels(pixelCenter, storesMap.getZoom());

				storesMap.setCenter(geoCenter);

				// вешаем событие на изменение селекта города
				selectCityEl.addEventListener("change", (e) => {
					let self = e.target;
					let value = e.target.options[e.target.selectedIndex].value;

					// проходимся по бд и подставляем нужную инфу на страницу
					for (i = 0; i < response.length; i++) {
						if (response[i].id == Number(value)) {
							// сохраняем айдишник города
							cityId = response[i].id;

							// выставляем карту выбанного города
							storesMap.setCenter(response[i].coords);

							// подставляем нужную инфу на страницу
							contentHeading.innerHTML = response[i].heading;
							contentStreet.innerHTML = response[i].street;
							contentWorkingHours.innerHTML = "";
							contentMobile.innerHTML = response[i].phone;

							for (let k = 0; k < response[i].workingHours.length; k++) {
								let workingHoursTemplate = `
									<div class="map__working-time-row">
										<span class="map__working-time-day">${response[i].workingHours[k].day}</span>
										<span class="map__working-time-hours">${response[i].workingHours[k].hours}</span>
									</div>
								`

								contentWorkingHours.innerHTML += workingHoursTemplate;
							}

							// чистим второй селект
							selectStores.clearChoices();

							// подставляепм во второй селект данный из бд
							for (let k = 0; k < response[i].stores.length; k++) {
								selectStores.setChoices([
									{ value: response[i].stores[k].id, label: response[i].stores[k].slectName, selected: k == 0 ? true : false }
								])
							}
						}
					};
				});

				// вешаем событие на изменение селекта с пунктами продаж
				selectStoresEl.addEventListener("change", (e) => {
					let self = e.target;
					let value = e.target.options[e.target.selectedIndex].value;

					// в уже известоном городе(cityId) проходимся по пунктам продаж и подставлеям данные
					for (let k = 0; k < response[cityId].stores.length; k++) {

						if (response[cityId].stores[k].id == Number(value)) {

							// выставляем иконки на карту(пока почему-то не работает))))
							placemark.options.set(
								"iconLayout",
								ymaps.templateLayoutFactory.createClass(
									`<a data-img="" href="" class="map__logo-svg"><img src="/local/assets/img/map-logo.svg"></a>`
								)
							);

							storesMap.setCenter(response[cityId].stores[k].coords);

							housesCollection.add(placemark);

							storesMap.geoObjects.add(housesCollection);

							// подставляем нужную инфу на страницу
							contentHeading.innerHTML = response[cityId].stores[k].heading;
							contentStreet.innerHTML = response[cityId].stores[k].street;
							contentMobile.innerHTML = response[cityId].stores[k].phone;

							contentWorkingHours.innerHTML = "";
							for (let l = 0; l < response[cityId].stores[k].workingHours.length; l++) {
								let workingHoursTemplate = `
									<div class="map__working-time-row">
										<span class="map__working-time-day">${response[cityId].stores[k].workingHours[l].day}</span>
										<span class="map__working-time-hours">${response[cityId].stores[k].workingHours[l].hours}</span>
									</div>
								`

								contentWorkingHours.innerHTML += workingHoursTemplate;
							}
						}
					}
				});
			}

			// инициализируем карту
			ymaps.ready(init);
		})
		.catch(() => {
			// ошибка запроса
		})
});
