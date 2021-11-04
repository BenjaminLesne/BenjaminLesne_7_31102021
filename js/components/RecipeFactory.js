const RecipeFactory = function () {
  this.createRecipe = function (info) {
    const recipe = {
      name: info.name.toLowerCase(),
      time: info.time,
      ingredients: info.ingredients,
      appliance: info.appliance.toLowerCase(),
      ustensils: info.ustensils,
      description: info.description.toLowerCase(),
      html: "",
    };

    // standardize all element value in array
    for (let i = 0; i < info.ingredients.length; i += 1) {
      recipe.ingredients[i].ingredient =
        info.ingredients[i].ingredient.toLowerCase();
    }

    // standardize all element value in array
    for (let i = 0; i < info.ustensils.length; i += 1) {
      recipe.ustensils[i] = info.ustensils[i].toLowerCase();
    }

    const generateIngredients = async (dataIngredients) => {
      let ingredientsHTML = ``;

      for (let i = 0; i < dataIngredients.length; i += 1) {
        ingredientsHTML += `
                
                <li>
                    <span class="recipe__ingredients-name">${
                      dataIngredients[i].ingredient
                        ? dataIngredients[i].ingredient
                        : ""
                    }:</span>
                    <span class="recipe__ingredients-quantity">${
                      dataIngredients[i].quantity
                        ? dataIngredients[i].quantity
                        : ""
                    }${
          dataIngredients[i].unit ? dataIngredients[i].unit : ""
        }</span>
                </li>               
                
                `;
      }

      return ingredientsHTML;
    };
    const myIngredients = generateIngredients(recipe.ingredients);

    myIngredients.then((allIngredients) => {
      recipe.html = `
      <div class="col">
        <article class="card shadow-sm recipe">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
            xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c" />
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                Thumbnail
            </text>
        </svg>

        <div class="card-body recipe__body">
            <div class="recipe__header">
                <h2 class="recipe__name">${recipe.name ? recipe.name : ""}</h2>
                <span>
                    <i class="far fa-clock"></i>
                    <time class="recipe__time">${
                      recipe.time ? recipe.time : ""
                    } min</time>
                </span>
            </div>
            <div class="recipe__info">
                <ul class="recipe__ingredients">
                    ${allIngredients}
                </ul>
                <p class="recipe__description">${
                  recipe.description ? recipe.description : ""
                }</p>
            </div>
        </div>
      </div>  
    </article>        
        `;
    });
    return recipe;
  };
};

export default RecipeFactory;
