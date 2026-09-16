const products = [
  { id: 1, name: "California Badam / Almonds 250g", cat: "nuts", price: 249, mrp: 299, off: "17%", img: "mix.jpg" },
  { id: 2, name: "Premium Kaju W320 250g", cat: "nuts", price: 289, mrp: 349, off: "17%", img: "kaju.jpg" },
  { id: 3, name: "Akbari Pista Roasted Salted 200g", cat: "nuts", price: 399, mrp: 449, off: "11%", img: "dryfruits.jpg" },
  { id: 4, name: "Akhrot Giri / Walnut Kernels 250g", cat: "nuts", price: 369, mrp: 429, off: "14%", img: "mix.jpg" },
  { id: 5, name: "Kishmish Seedless 250g", cat: "dates", price: 89, mrp: 119, off: "25%", img: "mix.jpg" },
  { id: 6, name: "Afghani Anjeer 200g", cat: "dates", price: 279, mrp: 329, off: "15%", img: "mix.jpg" },
  { id: 7, name: "Kimia Dates 500g", cat: "dates", price: 199, mrp: 249, off: "20%", img: "mix.jpg" },
  { id: 8, name: "Panchmeva Mix 500g", cat: "combo", price: 449, mrp: 549, off: "18%", img: "mix.jpg" },
  { id: 9, name: "Roasted Makhana 100g", cat: "snack", price: 149, mrp: 189, off: "21%", img: "kaju.jpg" },
  { id: 10, name: "Chia + Flax Seeds 200g", cat: "seeds", price: 159, mrp: 199, off: "20%", img: "mix.jpg" },
  { id: 11, name: "Haldi Powder 200g", cat: "spice", price: 55, mrp: 75, off: "27%", img: "haldi.jpg" },
  { id: 12, name: "Lal Mirch Powder 200g", cat: "spice", price: 65, mrp: 85, off: "24%", img: "masala.jpg" },
  { id: 13, name: "Jeera Whole 200g", cat: "spice", price: 79, mrp: 99, off: "20%", img: "spices.jpg" },
  { id: 14, name: "Garam Masala 100g", cat: "spice", price: 69, mrp: 89, off: "22%", img: "spices.jpg" },
  { id: 15, name: "Atta 5kg packed", cat: "grocery", price: 245, mrp: 275, off: "11%", img: "kaju.jpg" },
  { id: 16, name: "Basmati Rice 1kg", cat: "grocery", price: 129, mrp: 159, off: "19%", img: "kaju.jpg" }
];

let filter = "all";
let query = "";
const cart = [];

const grid = document.getElementById("grid");
function render() {
  const list = products.filter((p) => {
    const okCat = filter === "all" || p.cat === filter;
    const okQ = !query || p.name.toLowerCase().includes(query);
    return okCat && okQ;
  });
  grid.innerHTML = list.map((p) => `
    <article class="card">
      <span class="off">${p.off} off</span>
      <img src="${p.img}" alt="${p.name}" />
      <div class="body">
        <h4>${p.name}</h4>
        <div><span class="mrp">₹${p.mrp}</span> <span class="price">₹${p.price}</span></div>
        <div class="unit">Indicative shop rate · confirm at counter</div>
        <button class="add" data-id="${p.id}">Add to cart</button>
      </div>
    </article>
  `).join("") || "<p>No items found.</p>";
}
render();

document.getElementById("pills").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  filter = btn.dataset.filter;
  document.querySelectorAll("#pills button").forEach((b) => b.classList.toggle("active", b === btn));
  render();
});
document.querySelectorAll("[data-filter]").forEach((el) => {
  if (el.closest("#pills")) return;
  el.addEventListener("click", () => {
    filter = el.dataset.filter || "all";
    render();
  });
});
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  query = document.getElementById("q").value.trim().toLowerCase();
  filter = document.getElementById("catSelect").value;
  render();
  document.getElementById("shop").scrollIntoView();
});
document.getElementById("q").addEventListener("input", (e) => {
  query = e.target.value.trim().toLowerCase();
  render();
});

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-id]");
  if (!btn) return;
  const p = products.find((x) => x.id === Number(btn.dataset.id));
  const existing = cart.find((x) => x.id === p.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...p, qty: 1 });
  syncCart();
});

const cartEl = document.getElementById("cart");
const overlay = document.getElementById("overlay");
document.getElementById("openCart").addEventListener("click", () => { cartEl.classList.add("open"); overlay.classList.add("show"); });
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
function closeCart() { cartEl.classList.remove("open"); overlay.classList.remove("show"); }

function syncCart() {
  document.getElementById("cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0);
  const box = document.getElementById("cartItems");
  if (!cart.length) { box.textContent = "Empty"; document.getElementById("cartTotal").textContent = "0"; return; }
  box.innerHTML = cart.map((i) => `<div class="cart-item"><span>${i.name} × ${i.qty}</span><b>₹${i.price * i.qty}</b></div>`).join("");
  document.getElementById("cartTotal").textContent = cart.reduce((s, i) => s + i.price * i.qty, 0);
}

document.getElementById("waOrder").addEventListener("click", () => {
  if (!cart.length) return;
  const lines = cart.map((i) => `${i.name} x${i.qty}`).join("%0A");
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  window.open(`https://wa.me/910000000420?text=Rudraksh order:%0A${lines}%0ATotal: ₹${total}`, "_blank");
});
