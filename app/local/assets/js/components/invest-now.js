document.addEventListener("DOMContentLoaded", function(event) {
	const btnsFilter = document.querySelectorAll(".js-btn-filter");
	const list = document.querySelector(".js-invest-list");

	btnsFilter.forEach((btn)=>{
		btn.addEventListener("click", ()=>{
			const filter = btn.dataset.filter;

			if (filter == "cards") {
				list.classList.remove("is-list");
				list.classList.add("is-cards");
				btnsFilter.forEach((el)=>{el.classList.remove("is-active")})
				btn.classList.add("is-active");
			} else {
				list.classList.remove("is-cards");
				list.classList.add("is-list");
				btnsFilter.forEach((el)=>{el.classList.remove("is-active")})
				btn.classList.add("is-active");
			}

		});
	});
});
