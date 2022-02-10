document.addEventListener("DOMContentLoaded", function (event) {
	const customSelects = Array.from(document.querySelectorAll('.js-custom-select'));
	const customSelectsWithSearch = Array.from(document.querySelectorAll('.js-custom-select-search'));

	if (document.querySelectorAll('.js-custom-select')) {
	  let slcts = [];

	  customSelects.forEach((select) => {
		let slct = new Choices(select, {
		  searchEnabled: false,
		  itemSelectText: '',
		  shouldSort: false,
		  allowHTML: true,
		});

		slcts.push(slct);
	  });

	  function resetSelect() {
		slcts.forEach((el)=>{
		  el.destroy();
		//   el.init();
		});
	  };

	  window.resetSelect = resetSelect;
	}

	if (document.querySelectorAll('.js-custom-select-search')) {
	  customSelectsWithSearch.forEach((select) => {
		new Choices(select, {
		  searchEnabled: true,
		  itemSelectText: '',
		  shouldSort: false,
		});
	  });
	}

	function initSelect(elem) {
	  new Choices(elem, {
		searchEnabled: false,
		itemSelectText: '',
		shouldSort: false,
		allowHTML: true,
	  });
	}

	window.initSelect = initSelect;
});
