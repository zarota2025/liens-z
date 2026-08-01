/* =====================================
   LIENS Z - ORDERS
===================================== */

let orders = JSON.parse(localStorage.getItem("orders")) || [];

const ordersList = document.getElementById("orders-list");

function renderOrders() {

    ordersList.innerHTML = "";

    if (orders.length === 0) {

        ordersList.innerHTML = `
            <div class="empty-orders">
                No orders yet 📦
            </div>
        `;

        return;
    }

    orders.forEach((order, index) => {

        let productsHTML = "";

        order.products.forEach(product => {

            productsHTML += `
                <li>
                    ${product.name} × ${product.quantity}
                    - $${(product.price * product.quantity).toFixed(2)}
                </li>
            `;

        });

        ordersList.innerHTML += `

        <div class="order-card ${order.status ? order.status.toLowerCase() : 'pending'}">

            <h2>Order #${order.id}</h2>

            <p><strong>Name:</strong> ${order.customer.fullname}</p>

            <p><strong>Email:</strong> ${order.customer.email}</p>

            <p><strong>Phone:</strong> ${order.customer.phone}</p>

            <p><strong>Country:</strong> ${order.customer.country}</p>

            <p><strong>City:</strong> ${order.customer.city}</p>

            <p><strong>Address:</strong> ${order.customer.address}</p>

            <p><strong>Postal Code:</strong> ${order.customer.postal}</p>

            <p><strong>Payment:</strong> ${order.payment}</p>

            <p><strong>Date:</strong> ${order.date}</p>

            <h3>Products</h3>

            <ul>

                ${productsHTML}

            </ul>

            <h3>Total: ${order.total}</h3>

<p>
<strong>Status:</strong>

<select
class="order-status"
onchange="changeStatus(${index},this.value)">

<option value="Pending"
${order.status==="Pending"?"selected":""}>
Pending
</option>

<option value="Processing"
${order.status==="Processing"?"selected":""}>
Processing
</option>

<option value="Shipped"
${order.status==="Shipped"?"selected":""}>
Shipped
</option>

<option value="Delivered"
${order.status==="Delivered"?"selected":""}>
Delivered
</option>

</select>

</p>

            <button onclick="deleteOrder(${index})" class="delete-btn">

                🗑 Delete Order

            </button>

        </div>

        `;

    });

}

function deleteOrder(index) {

    if (!confirm("Delete this order?")) return;

    orders.splice(index, 1);

    localStorage.setItem("orders", JSON.stringify(orders));

    renderOrders();

}
function changeStatus(index, status) {

    orders[index].status = status;

    localStorage.setItem("orders", JSON.stringify(orders));

    renderOrders();

}
renderOrders();
const searchInput = document.getElementById("search-order");

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const cards = document.querySelectorAll(".order-card");

    cards.forEach(card => {

        const text = card.textContent.toLowerCase();

        if (text.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
