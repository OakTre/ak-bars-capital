document.addEventListener("DOMContentLoaded", function (event) {
	const date = document.querySelector(".js-info-dates");
	const parent = date.closest(".js-dates-parent");
	const startDate = parent.querySelector(".js-start-date");
	const endtDate = parent.querySelector(".js-end-date");

	new AirDatepicker(date, {
		range: true,
		multipleDatesSeparator: ' - ',
		maxDate: new Date(),
		view: 'months',
		minView: 'months',
		dateFormat: 'MMMM yyyy',
		onSelect({date, formattedDate, datepicker}) {
			for (let i =0; i<date.length; i++) {
				startDate.innerHTML = dayjs(date[0]).format('MMMM YYYY');
				endtDate.innerHTML = dayjs(date[1]).format('MMMM YYYY');
			}

			// какие-тр действия для обновления контента
			// ....
		}
	});
})

