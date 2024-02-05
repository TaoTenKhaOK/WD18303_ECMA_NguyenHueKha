import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    get,
    child,
    push,
    remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


document.addEventListener("DOMContentLoaded", function () {
    const firebaseConfig = {
        apiKey: "AIzaSyDnyzjHh7sxc7_NjBRa0NELuwp8Riaj9fw",
        authDomain: "poly-shop-df353.firebaseapp.com",
        databaseURL: "https://poly-shop-df353-default-rtdb.firebaseio.com",
        projectId: "poly-shop-df353",
        storageBucket: "poly-shop-df353.appspot.com",
        messagingSenderId: "349797547036",
        appId: "1:349797547036:web:7882beade52a6333be33d9"
    };

    initializeApp(firebaseConfig);

    const dbRef = ref(getDatabase());
    const productTable = document.getElementById("get_product");

    function getCategoryName(cate_id) {
        return cate_id === 1 ? 'Mì Gói' : cate_id === 2 ? 'Mì Ly' : 'Unknown Category';
    }

    function renderTable(products) {
        if (!productTable) {
            console.error("Product table element not found.");
            return;
        }

        productTable.innerHTML = "";

        products.forEach((product) => {
            const row = `<tr>
                            <td>${product.id}</td>
                            <td>${getCategoryName(product.cate_id)}</td>
                            <td>${product.name}</td>
                            <td><img src="/img/${product.image}" width="80px"></td>
                            <td>${product.price}</td>
                            <td>
                                <button class="btn btn-primary btn-sm" onclick="editProduct('${product.id}')">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Delete</button>
                            </td>
                        </tr>`;
            productTable.innerHTML += row;
        });
    }

    function fetchCategories() {
        const categoriesRef = child(dbRef, "categories");

        get(categoriesRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const categoriesData = snapshot.val();
                    const categoriesArray = Object.keys(categoriesData).map((key) => ({
                        id: key,
                        name: categoriesData[key].name,
                    }));

                    const selectedCategory = document.getElementById("productCategory").value || '';

                    getCategorySelect(categoriesArray, selectedCategory);
                }
            })
            .catch((error) => {
                console.error("Error fetching categories: ", error);
            });
    }

    function fetchProducts() {
        const productsRef = child(dbRef, "products");

        get(productsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const productsData = snapshot.val();
                    const productsArray = Object.keys(productsData).map((key) => ({
                        id: key,
                        cate_id: productsData[key].cate_id,
                        name: productsData[key].name,
                        image: productsData[key].image,
                        price: productsData[key].price,
                    }));

                    renderTable(productsArray);
                    fetchCategories();
                }
            })
            .catch((error) => {
                console.error("Lỗi: ", error);
            });
    }
    function getCategorySelect(categories, selectedCategory) {
        const select = document.getElementById("productCategory");

        if (!select) {
            console.error("Category select element not found.");
            return;
        }
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.id;
            option.text = getCategoryName(category.id);
            select.add(option);
            if (Number(category.id) === Number(selectedCategory)) {
                option.selected = true;
            }
        });

        if (!categories.find(category => Number(category.id) === Number(selectedCategory))) {
            const unknownOption = document.createElement("option");
            unknownOption.value = selectedCategory;
            unknownOption.text = 'Unknown Category';
            unknownOption.selected = true;
            select.add(unknownOption);
        }
    }


    function addProduct(category, name, image, price) {
        const productsRef = child(dbRef, "products");
        const newProductKey = push(productsRef).key;
        const newProduct = {
            cate_id: category,
            name: name,
            image: "../../img/" + image,
            price: price,
        };

        set(child(productsRef, newProductKey), newProduct)
            .then(() => {
                console.log("New product added successfully!");
                window.location.href = "/admin/include/products.html";
            })
            .catch((error) => {
                console.error("Error adding product: ", error);
            });
    }

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        const category = document.getElementById("productCategory").value;
        const name = document.getElementById("productName").value;
        const image = document.getElementById("productImage").value;
        const price = document.getElementById("productPrice").value;
        addProduct(category, name, image, price);
    });

    fetchProducts();
    fetchCategories();
    // remove
    window.deleteProduct = function (productId) {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

        if (isConfirmed) {
            const productRef = child(dbRef, `products/${productId}`);

            remove(productRef)
                .then(() => {
                    console.log("Xoá sản phẩm thành công!");
                    fetchProducts();
                })
                .catch((error) => {
                    console.error("Lỗi:", error);
                });
        }
    };
    // edit
    window.editProduct = function (productId) {
        const productRef = child(dbRef, `products/${productId}`);
        get(productRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const productData = snapshot.val();
                    const newName = prompt("Nhập tên mới cho sản phẩm:", productData.name);
                    const newPrice = prompt("Nhập giá mới cho sản phẩm:", productData.price);
                    const newCategoryId = prompt("Nhập ID danh mục mới cho sản phẩm:", productData.cate_id);
                    const newImage = prompt("Nhập tên hình mới cho sản phẩm:", productData.image);

                    if (newName !== null && newPrice !== null && newCategoryId !== null && newImage !== null) {
                        const categoryIdAsNumber = parseInt(newCategoryId, 10);
                        const updatedProduct = {
                            ...productData,
                            name: newName,
                            price: newPrice,
                            cate_id: categoryIdAsNumber,
                            image: newImage
                        };

                        set(productRef, updatedProduct)
                            .then(() => {
                                console.log("Sửa sản phẩm thành công!");
                                fetchProducts();
                            })
                            .catch((error) => {
                                console.error("Lỗi:", error);
                            });
                    }
                }
            })
            .catch((error) => {
                console.error("Lỗi: ", error);
            });
    };
});