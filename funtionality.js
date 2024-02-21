const searchProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => showDetails(data));
};

const showDetails = (products) => {
  const details = document.getElementById("display-card");
  products.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
  <figure><img src="${
    element.image
  }" alt="Shoes" class="object-contain h-80" /></figure>
  <div class="card-body">
    <h2 class="card-title">${element.title.slice(0, 20)} ...</h2>
    <p>${element.description.slice(
      0,
      30
    )} ... <span class="font-bold"> read more </span></p>
    <h2 class="font-bold text-xl">$ ${element.price}</h2>
    <div class="card-actions justify-end">
      <button class="btn btn-primary mr-4" onclick="addToCard(${element.id},${
      element.price
    })" >Buy Now</button>
      <button class="btn btn-primary">Remove</button>
    </div>
  </div>
</div>

    `;
    details.appendChild(div);
  });
};
let count = 0;
const addToCard = (id, price, newPrice) => {
  count = count + 1;
  document.getElementById("total-products").innerHTML = count;
  updatePrice(price);
  total();
};

const total = () => {
  const price = parseFloat(document.getElementById("price").innerText);
  const deliver = parseFloat(
    document.getElementById("delivery-charge").innerText
  );
  const total = price + deliver;
  document.getElementById("total").innerText = total;
};

const updatePrice = (price) => {
  const oldPrice = document.getElementById("price").innerText;
  const oldPriceFloat = parseFloat(oldPrice);
  const newPrice = price + oldPriceFloat;
  document.getElementById("price").innerText = newPrice.toFixed(2);
  DeliveryCharge(newPrice);
};

const DeliveryCharge = (newPrice) => {
  let DeliveryCharge;
  if (newPrice <= 500) {
    return (document.getElementById("delivery-charge").innerText = 0);
  }
  if (newPrice > 500 && newPrice < 1000) {
    document.getElementById("delivery-charge").innerText = 50;
  } else if (newPrice >= 1000) {
    document.getElementById("delivery-charge").innerText = 100;
  }
};

const orderProducts = () => {
  const totalPrice = document.getElementById("total").innerText;
  const priceWithTax = parseFloat(totalPrice * 0.15).toFixed(2);
  const grandTotal = parseFloat(priceWithTax + totalPrice).toFixed(2);
  const discount = parseFloat(grandTotal * 0.5).toFixed(2);
  const finalTotal = parseFloat (grandTotal - discount).toFixed(2);

  document.getElementById("tax").innerText = priceWithTax;
  document.getElementById("grand-total").innerText = grandTotal;
  document.getElementById("discount").innerText = discount;
  document.getElementById("final-total").innerText = finalTotal;
};

// const removeItem = () => {};
searchProducts();
