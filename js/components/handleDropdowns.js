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
};

export default handleDropdowns;
