const advancedSearchBars = () => {
  const inputs = document.querySelectorAll(".dropdown__input");

  inputs.forEach((input) => {
    input.addEventListener("input", async (e) => {
      const userInput = e.target.value.toLowerCase();
      const items =
        e.target.parentElement.parentElement.nextElementSibling.children;

      items.forEach((myItem) => {
        const item = myItem; // against eslint no-param-reassign error
        if (item.dataset.value.includes(userInput)) {
          item.style.display = "initial";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
};

export default advancedSearchBars;
