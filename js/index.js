import handleFilters from "./components/handleFilters.js";
import RecipeFactory from "./components/RecipeFactory.js";
import getDatas from "./components/getDatas.js";

window.onload = function () {
  handleFilters();
  const datas = getDatas();
  const mainContent = document.querySelector(".album .row");

  datas.then(async (data) => {
    const recipeFactory = new RecipeFactory();
    // generate all recipes then store all promises in array
    const result = [];
    for (let i = 0; i < data.recipes.length; i += 1) {
      result.push(recipeFactory.createRecipe(data.recipes[i]));
    }
    // when all promises done, all element are added to mainContent
    await Promise.all(result).then((value) => {
      mainContent.innerHTML = ""; // remove old content

      for (let i = 0; i < value.length; i += 1) {
        mainContent.innerHTML += value[i].html;
      }
    });
  });
};
