function isInputInIngredients(resultData, inputValue) {
  let didWeFindIngredient = false;

  resultData.ingredients.forEach((ingredientArray) => {
    if (ingredientArray.ingredient.includes(inputValue)) {
      didWeFindIngredient = true;
    }
  });
  return didWeFindIngredient;
}

export default isInputInIngredients;
