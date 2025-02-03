let listContainer = document.querySelector("main")


fetch(`https://kea-alt-del.dk/t7/api/products/`)
.then((response) => response.json())
.then((data) => showList(data));

function showList(products){
    console.log(products);
    const markup = products
    .map(
      (product) =>
        `<article class="product_list_container">
        <a href="product.html">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Fodboldsko" />
          <h3>${product.productdisplayname}</h3>
        </a>
        <div class="product_info">
          <div>${product.price} DKK</div>
          <div class="read_more"><a href="">READ MORE</a></div>
        </div>
      </article>`
    ).join("");
console.log(markup);

listContainer.innerHTML = markup;
}