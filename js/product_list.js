const myCategory = new URLSearchParams(window.location.search).get("category");
const listContainer = document.querySelector(".product_list")


fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`)
.then((response) => response.json())
.then((data) => showList(data));

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