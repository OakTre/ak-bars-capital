window.onload = () => {
	const preloader = document.querySelector(".prealoder");

	setTimeout(() => {
		preloader.classList.add("is-hidden");
	}, 3000);

	setTimeout(() => {
		preloader.style.disaply = "none";
		preloader.querySelector("svg").remove();

		toTab();
	}, 3250);
}


function toTab() {
	const tab = document.querySelector("#tab");
	const jsPeymtnTabs = document.querySelectorAll(".js-payment-tab");

	if (tab) {
		if (getParams().tabs.length) {
			$('html, body').animate({
				scrollTop: $("#tab").offset().top
			}, 900);

			let tabId = getParams().tabs;

			jsPeymtnTabs.forEach((tab)=>{
				let tabAttr = tab.dataset.paymentTab;

				if (tabAttr == tabId) {
					jsPeymtnTabs.forEach((el)=>{el.querySelector(".js-tab").checked = false});

					tab.querySelector(".js-tab").checked = true;
				}
			});

		}
	}
}


function disableScroll() {
	let pagePosition = window.scrollY;
	lockPadding();
	document.body.classList.add('disable-scroll');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
}

function enableScroll() {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	unlockPadding();
	document.body.style.top = 'auto';
	document.body.classList.remove('disable-scroll');
	window.scroll({ top: pagePosition, left: 0 });
	document.body.removeAttribute('data-position');
}

function lockPadding() {
	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	document.body.style.paddingRight = paddingOffset;
}

function unlockPadding() {
	document.body.style.paddingRight = '0px';
}

function getParams() {
	var a = window.location.search;
	var b = new Object();
	a = a.substring(1).split("&");
	let c;
	for (var i = 0; i < a.length; i++) {
		c = a[i].split("=");
		b[c[0]] = c[1]
	}
	return b
}

// якорный скролл
function scrollByAnchor() {
	let headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
	headerHeight = headerHeight.replace(/[^0-9]/g,"");
	headerHeight+="0"

    $("a[href^='#']").click(function() {
        const _href = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(_href).offset().top - Number(headerHeight) + 'px' }, 800);
        return false;
    });
}


document.addEventListener("DOMContentLoaded", function(event) {
	const options = BodyScrollOptions = {
		reserveScrollBarGap: true,
	};

	scrollByAnchor();

	// локализация для дат
	dayjs.locale('ru');

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

	const mobileMenu = document.querySelector(".mobile-menu");
	const mobileMenuBtn = document.querySelector(".header__mobile-btn");
	const mobileMenuCloseBtn = document.querySelector(".mobile-menu__close-btn");

	mobileMenuBtn.addEventListener("click", ()=>{
		mobileMenu.classList.add("is-open");
		disableScroll();

		// bodyScrollLock.disableBodyScroll(mobileMenu, options);
	});

	mobileMenuCloseBtn.addEventListener("click", ()=>{
		mobileMenu.classList.remove("is-open");
		enableScroll();

		// bodyScrollLock.enableBodyScroll(mobileMenu, options);
	});
});
