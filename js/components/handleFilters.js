const handleFilters = async (e) => {
  const filters = document.querySelector(".filters");

  // generate filter HTML in .filters
  const itemValue = e.target.dataset.value;
  const dataType = e.target.parentElement.dataset.type;
  // create a DOM element so we can give a listener to it
  const buttonFilter = document.createElement("button");
  buttonFilter.classList.add("filter", `filter--${dataType}`);
  buttonFilter.setAttribute("data-filter", itemValue);

  buttonFilter.innerHTML += `
       <span class="filter__text filter__text--${dataType}">${itemValue}</span>
       <i class="far fa-times-circle filter__cross"></i>
   `;

  filters.appendChild(buttonFilter);

  return buttonFilter;
};

export default handleFilters;
