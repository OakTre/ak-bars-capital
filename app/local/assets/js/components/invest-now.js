document.addEventListener("DOMContentLoaded",(function(s){const t=document.querySelectorAll(".js-btn-filter"),e=document.querySelector(".js-invest-list");t.forEach(s=>{s.addEventListener("click",()=>{"cards"==s.dataset.filter?(e.classList.remove("is-list"),e.classList.add("is-cards"),t.forEach(s=>{s.classList.remove("is-active")}),s.classList.add("is-active")):(e.classList.remove("is-cards"),e.classList.add("is-list"),t.forEach(s=>{s.classList.remove("is-active")}),s.classList.add("is-active"))})})}));