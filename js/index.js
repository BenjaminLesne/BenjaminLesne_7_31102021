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

          allFilters.forEach((filter) =>
            filtersValue.push(filter.dataset.filter)
          );

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
        allMyItems.forEach((item) => {
          item.addEventListener("click", async (clickEvent) =>
            filterContent(clickEvent)
          );
        });
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
      allMyItems.forEach((item) => {
        item.addEventListener("click", async (event) => filterContent(event));
      });
    });
  };

  datas.then(async (data) => {
    // display all recipes and standardize data
    data.recipes.forEach((recipe) => {
      result.push(recipeFactory.createRecipe(recipe));
    });

    iAmNotInspired();

    mainSearch.addEventListener("input", async (e) => {
      const userInput = e.target.value.toLowerCase();

      if (userInput.length >= 3) {
        newResult = [];
        // launch algo

        result.forEach((resultItem) => {
          // check if inputValue is in the database
          if (
            resultItem.name.includes(userInput) ||
            resultItem.description.includes(userInput) ||
            resultItem.appliance.includes(userInput) ||
            resultItem.ustensils.includes(userInput) ||
            isInputInIngredients(resultItem, userInput)
          ) {
            newResult.push(recipeFactory.createRecipe(resultItem));
          }
        });
        iAmNotInspired();
      } else if (!(newResult.length === 50)) {
        newResult = result;
        // display all recipes
        iAmNotInspired();
      }
    });
  });
};
