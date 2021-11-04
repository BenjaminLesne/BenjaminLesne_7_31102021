function isInputInIngredients(resultData, inputValue) {
  let didWeFindIngredient = false;

  for (let index = 0; index < resultData.ingredients.length; index += 1) {
    if (resultData.ingredients[index].ingredient.includes(inputValue)) {
      didWeFindIngredient = true;

      break;
    }
  }
  return didWeFindIngredient;
}

export default isInputInIngredients;
