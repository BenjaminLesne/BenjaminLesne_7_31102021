async function getDatas() {
  try {
    const response = await fetch(`./js/components/recipes.json`);
    const json = await response.json();

    return json;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default getDatas;
