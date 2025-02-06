const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector(".product_container")



fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
.then(response => response.json())
.then(data => {
    productContainer.innerHTML = `
    <div class="product_img">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp" alt="${data.productdisplayname}" />
        </div>

        <div class="product_details_container">
          <h3 class="h3_product">${data.productdisplayname}</h3>

          <div>${data.price} DKK</div>

          <div>${data.basecolour}</div>

          <div class="size-container">
            <div>SIZE:</div>
            <div class="size-menu">NA</div>
          </div>

          <div class="buy_button">ADD TO BASKET</div>

          <div>ESTIMATED DELIVERY TIME: 1-2 BUSINESS DAYS</div>
        </div>
    `
})


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