const handleDropdowns = () => {
  const allDropdowns = document.querySelectorAll(".dropdown__button");

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
    allDropdowns.forEach((dropdown) => {
      // for all dropdowns, if click outside the element AND visible, close it.
      if (!dropdown.contains(event.target) && isVisible(dropdown)) {
        dropdown.setAttribute("aria-expanded", "false");
      } else {
        // open the menu
        handleDropdownClick(event.target.textContent.toLowerCase());
      }
    });
  };

  document.addEventListener("click", outsideClickListener);
};

export default handleDropdowns;
