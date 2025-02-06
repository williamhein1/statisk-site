const myCategory = new URLSearchParams(window.location.search).get("category");
const listContainer = document.querySelector(".product_list")

let allProducts = [];

fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}&limit=20`)
.then((response) => response.json())
.then((data) => {
  allProducts = data;
  showList(allProducts);
});

function showList(products){
    console.log(products);
    const markup = products
    .map(
      (product) =>
        `<article class="product_list_container ${product.discount && "discount"}  ${product.soldout && "sold_out"}">
        <a href="product.html?id=${product.id}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Fodboldsko" />
          <h3>${product.productdisplayname}</h3>
        </a>
        <div class="product_info">

          ${product.soldout ? (`<div>SOLD OUT</div>`) 
          : product.discount ? (`
          <div class="sale_title">
            <div><p> NOW <span>${Math.floor(
            (product.price * product.discount) / 100)}</span> DKK
          </p></div>
  
          <div><p class="sale_discount"><span>${product.discount}</span>%</p></div>
          </div>`
          )
          : (`<div>${product.price} DKK</div>`)
        }

          </div>
          <div class="read_more"><a href="">READ MORE</a></div>
      </article>`
    ).join("");
console.log(markup);

listContainer.innerHTML = markup;

document.querySelector("#produktliste_titel").textContent = myCategory;
}





// burger menu
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




// filters:
function applyFilters() {
  const showOnlySale = document.querySelector("#saleFilter").checked;
  const maxPrice = document.querySelector("#priceFilter").value;

  let filteredProducts = allProducts.filter((product) => {
    if (showOnlySale && (!product.discount || product.soldout)) return false;
    if (maxPrice && product.price > maxPrice) return false;
    return true;
  });
  
  showList(filteredProducts);
}

document.querySelector("#saleFilter").addEventListener("change", applyFilters);
document.querySelector("#priceFilter").addEventListener("input", applyFilters);