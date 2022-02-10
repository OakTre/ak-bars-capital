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
	const selectCity = document.querySelector(".js-sity-select");
	const url = "/local/include/cities.json";
	let response;
	const contentHeading = document.querySelector(".js-content-heading");
	const contentStreet = document.querySelector(".js-content-street");
	const contentWorkingHours = document.querySelector(".js-content-working-hours");
	const contentMobile = document.querySelector(".js-content-mobile");
	let phoneRegEX = /([01]?[- .]?[\(\. ]?[2-9]\d{2}[\)\. ]?[- .]?\d{3}[- .]\d{4})/;

	sendRequest("GET", url)
		.then((data) => {
			response = data;

			for (let i = 0; i < response.length; i++) {
				let selectCityOption = `
					<option value="${response[i].id}">
						${response[i].city}
					</option>
				`;

				selectCity.innerHTML += selectCityOption;
			}

			window.initSelect(selectCity);

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

				response.forEach((city) => {
					let marActive = `<a data-img="" href="" class="map__logo-svg"><img src="/local/assets/img/map-logo.svg"></a>`

					let infoCoordinates = [
						[0, 0],
						[140, 64],
					];

					let placemark = new ymaps.Placemark(
						city.coords, {}, {
						iconLayout: ymaps.templateLayoutFactory.createClass(marActive),
						zIndex: 700,
						zIndexHover: 700,
						zIndexActive: 700,
						iconShape: {
							type: "Rectangle",
							coordinates: infoCoordinates
						},
					});

					housesCollection.add(placemark);

				});

				storesMap.geoObjects.add(housesCollection);

				let pixelCenter = storesMap.getGlobalPixelCenter(center);

				pixelCenter = [
					pixelCenter[0] + 300,
					pixelCenter[1] + 100
				];

				let geoCenter = storesMap.options.get('projection').fromGlobalPixels(pixelCenter, storesMap.getZoom());

				storesMap.setCenter(geoCenter);

				selectCity.addEventListener("change", (e) => {
					let self = e.target;
					let value = e.target.options[e.target.selectedIndex].value;

					for (i = 0; i < response.length; i++) {
						if(response[i].id == Number(value)) {
							storesMap.setCenter(response[i].coords);

							contentHeading.innerHTML = response[i].heading;
							contentStreet.innerHTML = response[i].street;
							contentWorkingHours.innerHTML = "";
							contentMobile.innerHTML = response[i].phone;

							for (let k=0; k<response[i].workingHours.length; k++) {
								let workingHoursTemplate = `
									<div class="map__working-time-row">
										<span class="map__working-time-day">${response[i].workingHours[k].day}</span>
										<span class="map__working-time-hours">${response[i].workingHours[k].hours}</span>
									</div>
								`

								contentWorkingHours.innerHTML += workingHoursTemplate;
							}
						}
					};
				});
			}
			ymaps.ready(init);
		})
		.catch(()=>{
			// ошибка запроса
		})
});
