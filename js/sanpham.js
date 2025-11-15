// ===== DỮ LIỆU SẢN PHẨM =====
const allProducts = [
  { name: "Cam sành", price: 45000, tag: "Mới nhập", origin: "Việt Nam", img: "assets/img/cam.jpg" },
  { name: "Nho đỏ", price: 90000, tag: "Mới nhập", origin: "Nhập khẩu", img: "assets/img/nho.jpg" },
  { name: "Táo Gala", price: 55000, tag: "Sắp hết", origin: "Nhập khẩu", img: "assets/img/tao.jpg" },
  { name: "Lê xanh", price: 75000, tag: "Mới nhập", origin: "Việt Nam", img: "assets/img/le.jpg" },
  { name: "Dưa hấu ruột đỏ", price: 30000, tag: "Ưa chuộng", origin: "Việt Nam", img: "assets/img/dua-hau.jpg" },
  { name: "Kiwi vàng", price: 120000, tag: "Nhập khẩu", origin: "Úc", img: "assets/img/kiwi.jpg" },
  { name: "Thanh long ruột đỏ", price: 40000, tag: "Đặc sản Việt", origin: "Việt Nam", img: "assets/img/thanh-long.jpg" },
  { name: "Xoài cát Hòa Lộc", price: 60000, tag: "Việt Nam", origin: "Việt Nam", img: "assets/img/xoai.jpg" },
  { name: "Chôm chôm", price: 35000, tag: "Theo mùa", origin: "Việt Nam", img: "assets/img/chom-chom.jpg" },
  { name: "Dâu tây Đà Lạt", price: 150000, tag: "Nhập nội địa", origin: "Việt Nam", img: "assets/img/dau-tay.jpg" },
  { name: "Cam Mỹ", price: 140000, tag: "Nhập khẩu", origin: "Nhập khẩu", img: "assets/img/cam-my.jpg" },
  { name: "Lựu đỏ", price: 90000, tag: "Nhập khẩu", origin: "Thái Lan", img: "assets/img/luu.jpg" }
];

const productsPerPage = 6;
let currentPage = 1;

const grid = document.getElementById("productGrid");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");

let filteredProducts = [...allProducts];

// ====== HÀM LỌC SẢN PHẨM ======
function applyFilters() {
  let keyword = searchInput.value.toLowerCase();

  // Tìm kiếm
  filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );

  // Lọc xuất xứ
  const origins = [...document.querySelectorAll(".origin-filter:checked")].map(i => i.value);

  if (origins.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      origins.includes(p.origin)
    );
  }

  // Lọc theo giá
  const priceFilter = document.querySelector(".price-filter:checked");
  if (priceFilter) {
    const value = priceFilter.value;

    filteredProducts = filteredProducts.filter(p => {
      if (value == 1) return p.price < 50000;
      if (value == 2) return p.price >= 50000 && p.price <= 100000;
      if (value == 3) return p.price > 100000;
    });
  }

  currentPage = 1;
  renderProducts(currentPage);
}

function renderProducts(page) {
  grid.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const products = filteredProducts.slice(start, start + productsPerPage);

  if (products.length === 0) {
    grid.innerHTML = `<p style="text-align:center; color:#777;">Không tìm thấy sản phẩm nào phù hợp.</p>`;
    pagination.style.display = "none";
    return;
  }

  products.forEach(p => {
    const isLow = p.tag.toLowerCase() === "sắp hết";
    const tagClass = isLow ? "tag low-stock" : "tag";
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>

      <p class="price">${p.price.toLocaleString("vi-VN")}đ / kg</p>
      <span class="${tagClass}">${p.tag}</span>
      <button class="btn-add">Thêm vào giỏ</button>
    `;
    grid.appendChild(card);
  });

  updatePagination();
}

function updatePagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.textContent = i;
    btn.className = "page-btn" + (i === currentPage ? " active" : "");
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentPage = i;
      renderProducts(currentPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll lên đầu trang khi đổi trang
    });

    pagination.appendChild(btn);
  }
}

function searchProducts(keyword) {
  keyword = keyword.toLowerCase();
  filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(keyword));
  currentPage = 1;
  renderProducts(currentPage);
}

searchBtn.addEventListener("click", () => searchProducts(searchInput.value.trim()));
searchInput.addEventListener("keyup", e => { if (e.key === "Enter") searchProducts(searchInput.value.trim()); });
renderProducts(currentPage);
