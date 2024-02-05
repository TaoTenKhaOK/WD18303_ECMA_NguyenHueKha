// function fetchOrdersWithDetails() {
//   const ordersUrl = "http://localhost:3000/orders";
//   const orderDetailsUrl = "http://localhost:3000/order_details";
//   const productsUrl = "http://localhost:3000/products";

//   fetch(ordersUrl)
//     .then((response) => response.json())
//     .then((orders) => {
//       fetch(orderDetailsUrl)
//         .then((response) => response.json())
//         .then((orderDetails) => {
//           fetch(productsUrl)
//             .then((response) => response.json())
//             .then((products) => {
//               displayOrdersWithDetails(orders, orderDetails, products);
//             })
//             .catch((error) => {
//               console.error("Error fetching products:", error);
//             });
//         })
//         .catch((error) => {
//           console.error("Error fetching order details:", error);
//         });
//     })
//     .catch((error) => {
//       console.error("Error fetching orders:", error);
//     });
// }

// function displayOrdersWithDetails(orders, orderDetails, products) {
//   const ordersContainer = document.getElementById("ordersContainer");
//   let ordersHTML = "";

//   orders.forEach((order) => {
//     const orderDetailsForOrder = orderDetails.filter(
//       (detail) => detail.order_id === order.id
//     );

//     let totalCost = 0;

//     ordersHTML += `
//         <div class="card mb-3">
//           <div class="card-header">
//             <h5 class="card-title">Đơn hàng: ${order.id}</h5>
//             <p class="card-text">Tên người nhận: ${order.customer_name}</p>
//           </div>
//           <div class="card-body">
//             <ul class="list-group">
//       `;

//     orderDetailsForOrder.forEach((detail) => {
//       const product = products.find((p) => p.id === detail.product_id);
//       if (product) {
//         const itemCost = detail.quantity * detail.unit_price;
//         totalCost += itemCost; 
//         ordersHTML += `
//             <li class="list-group-item">
//               <strong>${product.name}</strong> - Số lượng: ${detail.quantity} - Giá: ${detail.unit_price} - Thành tiền: ${itemCost}
//             </li>
//           `;
//       }
//     });

//     ordersHTML += `
//             </ul>
//           </div>
//           <div class="card-footer">
//             <p>Trạng thái: ${order.status}</p>
//             <p>Địa chỉ: ${order.customer_address}</p>
//             <p>Tổng tiền: ${totalCost}</p>
//           </div>
//         </div>
//       `;
//   });

//   ordersContainer.innerHTML = ordersHTML;
// }

// document.addEventListener("DOMContentLoaded", function () {
//   fetchOrdersWithDetails();
// });
