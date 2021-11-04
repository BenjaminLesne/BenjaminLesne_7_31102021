import handleFilters from "./components/handleFilters.js";
import handleDropdowns from "./components/handleDropdowns.js";
import RecipeFactory from "./components/RecipeFactory.js";
import getDatas from "./components/getDatas.js";
import generateContent from "./components/generateContent.js";
import isInputInIngredients from "./components/isInputInIngredients.js";
import generateNewResult from "./components/generateNewResult.js";
import advancedSearchBars from "./components/advancedSearchbars.js";

window.onload = function () {
  handleDropdowns();
  advancedSearchBars();
  const datas = getDatas();
  const mainSearch = document.querySelector(".search-bar__input");
  const recipeFactory = new RecipeFactory();
  const result = [];
  let newResult = result;

  const filterContent = async (event) => {
    const buttonFilter = handleFilters(event, newResult);

    buttonFilter.then(async (button) => {
      const updateContent = async () => {
        const allFilters = document.querySelectorAll(".filter");

        if (allFilters.length > 0) {
          const filtersValue = [];
          for (let i = 0; i < allFilters.length; i += 1) {
            filtersValue.push(allFilters[i].dataset.filter);
          }

          const resultWithFilters = await generateNewResult(
            newResult,
            filtersValue
          );

          generateContent(resultWithFilters);
        } else {
          generateContent(newResult);
        }

        const allMyItems = document.querySelectorAll(".dropdown-menu__item");
        // listen click event of new items generated
        for (let i = 0; i < allMyItems.length; i += 1) {
          allMyItems[i].addEventListener("click", async (clickEvent) =>
            filterContent(clickEvent)
          );
        }
      };

      updateContent();

      button.addEventListener("click", async (myEvent) => {
        // onclick remove it (and remove the whole button not just child)
        if (myEvent.target.tagName === "BUTTON") {
          myEvent.target.remove();
        } else {
          myEvent.target.parentElement.remove();
        }
        updateContent();
      });
    });
  };

  const iAmNotInspired = async () => {
    // when all promises done, all element are added to mainContent
    await Promise.all(newResult).then((value) => {
      generateContent(value);

      const allMyItems = document.querySelectorAll(".dropdown-menu__item");
      // listen to click to new items generated
      for (let i = 0; i < allMyItems.length; i += 1) {
        allMyItems[i].addEventListener("click", async (event) =>
          filterContent(event)
        );
      }
    });
  };

  datas.then(async (data) => {
    // display all recipes and standardize data
    for (let i = 0; i < data.recipes.length; i += 1) {
      result.push(recipeFactory.createRecipe(data.recipes[i]));
    }

    iAmNotInspired();

    mainSearch.addEventListener("input", async (e) => {
      const userInput = e.target.value.toLowerCase();

      if (userInput.length >= 3) {
        newResult = [];
        // launch algo
        for (let i = 0; i < result.length; i += 1) {
          // check if inputValue is in the database
          if (
            result[i].name.includes(userInput) ||
            result[i].description.includes(userInput) ||
            result[i].appliance.includes(userInput) ||
            result[i].ustensils.includes(userInput) ||
            isInputInIngredients(result[i], userInput)
          ) {
            newResult.push(recipeFactory.createRecipe(result[i]));
          }
        }
        iAmNotInspired();
      } else if (!(newResult.length === 50)) {
        newResult = result;
        // display all recipes
        iAmNotInspired();
      }
    });
  });
};
