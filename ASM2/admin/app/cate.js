import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

// show cate
const categoriesTableBody = document.getElementById("categories-table");

function renderTable(categories) {
    categoriesTableBody.innerHTML = "";

    categories.forEach((category) => {
        const row = `<tr>
                        <td>${category.id}</td>
                        <td>${category.name}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editCategory('${category.id}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteCategory('${category.id}')">Delete</button>
                        </td>
                    </tr>`;
        categoriesTableBody.innerHTML += row;
    });
}
function fetchCategories() {
    const categoriesRef = child(dbRef, "categories");

    get(categoriesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const categoriesData = snapshot.val();
            const categoriesArray = Object.keys(categoriesData).map((key) => ({
                id: key,
                name: categoriesData[key].name,
            }));
            renderTable(categoriesArray);
        }
    }).catch((error) => {
        console.error("Lỗi: ", error);
    });
}
fetchCategories();
// remove
window.deleteCategory = function(categoryId) {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");

    if (isConfirmed) {
        const categoryRef = child(dbRef, `categories/${categoryId}`);

        remove(categoryRef)
            .then(() => {
                console.log("Xoá thành công!");
                fetchCategories(); 
            })
            .catch((error) => {
                console.error("Lỗi:", error);
            });
    }
}
// edit
window.editCategory = function(categoryId) {
    const newCategoryName = prompt("Nhập tên mới cho danh mục:");

    if (newCategoryName !== null) {
        const categoryRef = child(dbRef, `categories/${categoryId}`);

        update(categoryRef, { name: newCategoryName })
            .then(() => {
                console.log("Sửa danh mục thành công!");
                fetchCategories()
            })
            .catch((error) => {
                console.error("Lỗi:", error);
            });
    }
};
// add
window.addCategory = function() {
    const newCategoryName = prompt("Nhập tên danh mục mới:");

    if (newCategoryName !== null) {
        const categoriesRef = child(dbRef, 'categories');

        const newCategoryRef = push(categoriesRef);
        set(newCategoryRef, { name: newCategoryName })
            .then(() => {
                console.log("Thêm danh mục thành công!!!");
                fetchCategories(); 
            })
            .catch((error) => {
                console.error("Lỗi:", error);
            });
    }
};