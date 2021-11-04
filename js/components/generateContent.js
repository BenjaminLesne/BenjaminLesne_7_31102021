function generateContent(value) {
  const mainContent = document.querySelector(".album .row");
  const ingredients = document.querySelector(".dropdown-menu--ingredients");
  const appliances = document.querySelector(".dropdown-menu--appliances");
  const utensils = document.querySelector(".dropdown-menu--utensils");

  mainContent.innerHTML = ""; // remove old content
  appliances.innerHTML = ""; // remove old content from appliance advanced search bar
  utensils.innerHTML = "";
  ingredients.innerHTML = "";

  for (let i = 0; i < value.length; i += 1) {
    // update main content
    mainContent.innerHTML += value[i].html;

    const myApplianceValue = value[i].appliance.toLowerCase();
    if (myApplianceValue && !appliances.innerHTML.includes(myApplianceValue)) {
      // render filter in its dropdown menu
      appliances.innerHTML += `<li class="dropdown-menu__item" data-value="${myApplianceValue}">${myApplianceValue}</li>`;
    }

    // update by looping through all ustensils and display them in the ustensils advanced search bar
    for (let j = 0; j < value[i].ustensils.length; j += 1) {
      const myUstensilsValue = value[i].ustensils[j].toLowerCase();
      if (myUstensilsValue && !utensils.innerHTML.includes(myUstensilsValue)) {
        utensils.innerHTML += `<li class="dropdown-menu__item" data-value="${myUstensilsValue}">${myUstensilsValue}</li>`;
      }
    }

    // update by looping through all ingredients and display them in the ingredients advanced search bar
    for (let k = 0; k < value[i].ingredients.length; k += 1) {
      const myIngredientValue =
        value[i].ingredients[k].ingredient.toLowerCase();
      if (
        myIngredientValue &&
        !ingredients.innerHTML.includes(myIngredientValue)
      ) {
        ingredients.innerHTML += `<li class="dropdown-menu__item" data-value="${myIngredientValue}">${myIngredientValue}</li>`;
      }
    }
  }
  if (mainContent.childElementCount === 0) {
    mainContent.innerHTML = `
    <div class="recipe-not-found">
        <h1 class="recipe-not-found__msg">Aucune recette ne correspond à votre critère... vous pouvez 
        chercher « tarte aux pommes », « poisson », etc </h1>
    </div>
    `;
  }
}

export default generateContent;
