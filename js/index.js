let categoriesContainer = document.querySelector("ul")


fetch(`https://kea-alt-del.dk/t7/api/categories/`)
.then((response) => response.json())
.then(showCategories);

function showCategories(categories){
    console.log(categories);

    const markup = categories
    
    .map(
      (category) =>
        `<li><a href="productlist.html?category=${category.category}">${category.category}</a></li>`
    )
    .join("");

console.log(markup);

categoriesContainer.innerHTML = markup;
}