//retrieve id of the Order
const getOrderId = window.location.search;
const orderId = getOrderId.replace("?","");

const orderMessage = document.getElementById('order-message')
orderMessage.innerHTML = 
`
    <span>Nous confirmons votre commande n° <span class="fw-bold">${orderId}</span><span>
`