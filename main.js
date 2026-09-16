document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("orderForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const item = document.getElementById("item").value.trim();
  const qty = document.getElementById("qty").value.trim();
  const msg = `Namaste, mera naam ${name} hai.%0APhone: ${phone}%0AItem: ${item}%0AQuantity: ${qty}%0ARudraksh Dry Fruits and Spices se order karna hai.`;
  window.open(`https://wa.me/919876543210?text=${msg}`, "_blank");
});
