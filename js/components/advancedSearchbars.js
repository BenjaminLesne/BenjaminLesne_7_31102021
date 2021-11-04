const advancedSearchBars = () => {
  const inputs = document.querySelectorAll(".dropdown__input");

  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].addEventListener("input", async (e) => {
      console.log(e.target);
      const userInput = e.target.value.toLowerCase();
      const items =
        e.target.parentElement.parentElement.nextElementSibling.children;

      for (let index = 0; index < items.length; index += 1) {
        if (items[index].dataset.value.includes(userInput)) {
          items[index].style.display = "initial";
        } else {
          items[index].style.display = "none";
        }
      }
    });
  }
};

export default advancedSearchBars;
