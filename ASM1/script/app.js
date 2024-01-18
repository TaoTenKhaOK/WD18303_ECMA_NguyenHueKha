// click products
$(document).ready(function () {
  // init Isotope
  var $grid = $(".collection-list").isotope({
    // options
  });

  // filter items on button click
  $(".filter-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    resetFilterBtns();
    $(this).addClass("active-filter-btn");
    $grid.isotope({ filter: filterValue });
  });

  var filterBtns = $(".filter-button-group").find("button");

  function resetFilterBtns() {
    filterBtns.each(function () {
      $(this).removeClass("active-filter-btn");
    });
  }
});

// load all product
function wrapProduct() {
  const url = "http://localhost:3000/products";
  fetch(url)
    .then((wrap) => wrap.json())
    .then((data) => {
      const listProduct = document.getElementById("product__all");
      let productsHTML = "";

      data.forEach((product, index) => {
        if (index % 4 === 0) {
            productsHTML += '<div class="row">';
        }
        productsHTML += `
        <div class="col-md-6 col-lg-4 col-xl-3 p-2 best">
            <div class="collection-img mt-4">
                <img src="/img/${product.image}" class="w-100" alt="">
            </div>
            <div class="text-center">
                <div class="rating mt-3">
                    <span class="text-primary">
                        <i class="fas fa-star"></i>
                    </span>
                    <span class="text-primary">
                        <i class="fas fa-star"></i>
                    </span>
                    <span class="text-primary">
                        <i class="fas fa-star"></i>
                    </span>
                    <span class="text-primary">
                        <i class="fas fa-star"></i>
                    </span>
                    <span class="text-primary">
                        <i class="fas fa-star"></i>
                    </span>
                </div>
                <p class="text-capitalize my-1">${product.name}</p>
                <span class="fw-bold">Giá: ${product.price}</span>
            </div>
        </div>`;
      });

      productsHTML += `</div>`;
      listProduct.innerHTML = productsHTML;
    })
    .catch((error) => {
      console.error("Lỗi khi kết nối:", error);
    });
}
wrapProduct();
