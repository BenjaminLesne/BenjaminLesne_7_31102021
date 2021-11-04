function generateContent(values) {
  const mainContent = document.querySelector(".album .row");
  const ingredients = document.querySelector(".dropdown-menu--ingredients");
  const appliances = document.querySelector(".dropdown-menu--appliances");
  const utensils = document.querySelector(".dropdown-menu--utensils");

  mainContent.innerHTML = ""; // remove old content
  appliances.innerHTML = ""; // remove old content from appliance advanced search bar
  utensils.innerHTML = "";
  ingredients.innerHTML = "";

  values.forEach((value) => {
    // update main content
    mainContent.innerHTML += value.html;

    const myApplianceValue = value.appliance.toLowerCase();
    if (myApplianceValue && !appliances.innerHTML.includes(myApplianceValue)) {
      // render filter in its dropdown menu
      appliances.innerHTML += `<li class="dropdown-menu__item" data-value="${myApplianceValue}">${myApplianceValue}</li>`;
    }

    // update by looping through all ustensils and display them in the ustensils advanced search bar
    value.ustensils.forEach((ustensil) => {
      const myUstensilsValue = ustensil.toLowerCase();
      if (myUstensilsValue && !utensils.innerHTML.includes(myUstensilsValue)) {
        utensils.innerHTML += `<li class="dropdown-menu__item" data-value="${myUstensilsValue}">${myUstensilsValue}</li>`;
      }
    });

    // update by looping through all ingredients and display them in the ingredients advanced search bar
    value.ingredients.forEach((ingredient) => {
      const myIngredientValue = ingredient.ingredient.toLowerCase();
      if (
        myIngredientValue &&
        !ingredients.innerHTML.includes(myIngredientValue)
      ) {
        ingredients.innerHTML += `<li class="dropdown-menu__item" data-value="${myIngredientValue}">${myIngredientValue}</li>`;
      }
    });
  });
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
