import isInputInIngredients from "./isInputInIngredients.js";

const generateNewResult = async (currentResult, filterss) => {
  const newResult = [];
  // update search results

  currentResult.forEach((recipe) => {
    const conditions = {
      name: true,
      description: true,
      appliance: true,
      ustensils: true,
      ingredients: true,
    };

    // check if all filterss are respected and store the result
    filterss.forEach((filter) => {
      conditions.name = conditions.name && recipe.name.includes(filter);
      conditions.description =
        conditions.description && recipe.description.includes(filter);

      conditions.appliance =
        conditions.appliance && recipe.appliance.includes(filter);

      conditions.ustensils =
        conditions.ustensils && recipe.ustensils.includes(filter);

      conditions.ingredients =
        conditions.ingredients && isInputInIngredients(recipe, filter);
    });

    // check if all filterss are in the recipe
    if (
      conditions.name ||
      conditions.description ||
      conditions.appliance ||
      conditions.ustensils ||
      conditions.ingredients
    ) {
      newResult.push(recipe);
    } else {
      // console.log(filters);
      // console.log("tag not find in currentResult");
      // console.log(currentResult);
    }
  });

  return newResult;
};

export default generateNewResult;
