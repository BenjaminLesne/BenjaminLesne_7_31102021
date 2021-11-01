const handleFilters = () => {
  const allDropdowns = document.querySelectorAll(".dropdown__button");
  const allInputs = document.querySelectorAll(".dropdown__input");
  const allMenuItems = document.querySelectorAll(".dropdown-menu__item");
  const filters = document.querySelector(".filters");

  async function handleDropdownClick(param) {
    const clickedButton = document.querySelector(`.dropdown__button--${param}`);
    const inputToFocus = document.querySelector(".dropdown__input");
    // open menu
    clickedButton.setAttribute("aria-expanded", true);
    inputToFocus.focus();
  }

  const isVisible = (elem) =>
    !!elem &&
    !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

  const outsideClickListener = (event) => {
    for (let i = 0; i < allDropdowns.length; i += 1) {
      // for all dropdowns, if click outside the element AND visible, close it.
      if (
        !allDropdowns[i].contains(event.target) &&
        isVisible(allDropdowns[i])
      ) {
        allDropdowns[i].setAttribute("aria-expanded", "false");
      } else {
        // open the menu
        handleDropdownClick(event.target.textContent.toLowerCase());
      }
    }
  };

  document.addEventListener("click", outsideClickListener);

  // when user click on an item inside a dropdown menu, add it to filters.
  for (let i = 0; i < allMenuItems.length; i += 1) {
    allMenuItems[i].addEventListener("click", (e) => {
      console.log("item got clicked");
      // generate filter HTML in .filters
      const itemValue = e.target.dataset.value;
      const dataType = e.target.parentElement.dataset.type;
      // create a DOM element so we can give a listener to it
      const buttonFilter = document.createElement("button");
      buttonFilter.classList.add("filter", `filter--${dataType}`);

      buttonFilter.innerHTML += `
         <span class="filter__text filter__text--${dataType}">${itemValue}</span>
         <i class="far fa-times-circle filter__cross"></i>
     `;

      filters.appendChild(buttonFilter);

      buttonFilter.addEventListener("click", (event) => {
        // onclick remove it (and remove the whole button not just child)
        if (event.target.tagName === "BUTTON") {
          event.target.remove();
        } else {
          event.target.parentElement.remove();
        }
      });
    });
  }
};

export default handleFilters;
