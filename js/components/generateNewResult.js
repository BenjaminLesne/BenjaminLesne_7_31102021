import isInputInIngredients from "./isInputInIngredients.js";

const generateNewResult = async (currentResult, filter) => {
  const newResult = [];
  console.log("filter");
  console.log(filter);
  // update search results
  for (let i = 0; i < currentResult.length; i += 1) {
    const conditions = {
      name: true,
      description: true,
      appliance: true,
      ustensils: true,
      ingredients: true,
    };

    // check if all filters are respected and store the result
    for (let j = 0; j < filter.length; j += 1) {
      conditions.name =
        conditions.name && currentResult[i].name.includes(filter[j]);
      conditions.description =
        conditions.description &&
        currentResult[i].description.includes(filter[j]);

      conditions.appliance =
        conditions.appliance && currentResult[i].appliance.includes(filter[j]);

      conditions.ustensils =
        conditions.ustensils && currentResult[i].ustensils.includes(filter[j]);

      conditions.ingredients =
        conditions.ingredients &&
        isInputInIngredients(currentResult[i], filter[j]);
    }

    // check if all filters are in the recipe
    if (
      conditions.name ||
      conditions.description ||
      conditions.appliance ||
      conditions.ustensils ||
      conditions.ingredients
    ) {
      newResult.push(currentResult[i]);
    } else {
      // console.log(filter);
      // console.log("tag not find in currentResult");
      // console.log(currentResult);
    }
  }

  return newResult;
};

export default generateNewResult;
