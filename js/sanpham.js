// ===== DỮ LIỆU SẢN PHẨM =====
const allProducts = [
  { name: "Cam sành", price: "45.000đ / kg", tag: "Mới nhập", img: "assets/img/cam.jpg" },
  { name: "Nho đỏ", price: "90.000đ / kg", tag: "Mới nhập", img: "assets/img/nho.jpg" },
  { name: "Táo Gala", price: "55.000đ / kg", tag: "Sắp hết", img: "assets/img/tao.jpg" },
  { name: "Lê xanh", price: "75.000đ / kg", tag: "Mới nhập", img: "assets/img/le.jpg" },
  { name: "Dưa hấu ruột đỏ", price: "30.000đ / kg", tag: "Ưa chuộng", img: "assets/img/dua-hau.jpg" },
  { name: "Kiwi vàng", price: "120.000đ / kg", tag: "Nhập khẩu", img: "assets/img/kiwi.jpg" },
  { name: "Thanh long ruột đỏ", price: "40.000đ / kg", tag: "Đặc sản Việt", img: "assets/img/thanh-long.jpg" },
  { name: "Xoài cát Hòa Lộc", price: "60.000đ / kg", tag: "Việt Nam", img: "assets/img/xoai.jpg" },
  { name: "Chôm chôm", price: "35.000đ / kg", tag: "Theo mùa", img: "assets/img/chom-chom.jpg" },
  { name: "Dâu tây Đà Lạt", price: "150.000đ / kg", tag: "Nhập nội địa", img: "assets/img/dau-tay.jpg" },
  { name: "Cam Mỹ", price: "140.000đ / kg", tag: "Nhập khẩu", img: "assets/img/cam-my.jpg" },
  { name: "Lựu đỏ", price: "90.000đ / kg", tag: "Nhập khẩu", img: "assets/img/luu.jpg" }
];

// ===== PHÂN TRANG =====
const productsPerPage = 6; // hiển thị 3x2
let currentPage = 1;

// ===== PHẦN TỬ HTML =====
const grid = document.getElementById("productGrid");
const pagination = document.querySelector(".pagination");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// ===== BIẾN DỮ LIỆU =====
let filteredProducts = [...allProducts]; // mặc định hiển thị tất cả

// ===== HÀM HIỂN THỊ SẢN PHẨM =====
function renderProducts(page) {
  grid.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const products = filteredProducts.slice(start, end);

  if (products.length === 0) {
    grid.innerHTML = `<p style="grid-column: span 3; text-align:center; color:#777;">Không tìm thấy sản phẩm nào phù hợp.</p>`;
    pagination.style.display = "none";
    return;
  } else {
    pagination.style.display = "flex";
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${p.price}</p>
      <span class="tag">${p.tag}</span>
      <button class="btn-add">Thêm vào giỏ</button>
    `;
    grid.appendChild(card);
  });

  updatePagination();
}

// ===== HÀM CẬP NHẬT PHÂN TRANG =====
function updatePagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.textContent = i;
    btn.className = "page-btn" + (i === currentPage ? " active" : "");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderProducts(currentPage);
    });
    pagination.appendChild(btn);
  }
}

// ===== HÀM TÌM KIẾM SẢN PHẨM =====
function searchProducts(keyword) {
  keyword = keyword.toLowerCase();
  filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(keyword));
  currentPage = 1;
  renderProducts(currentPage);
}

// ===== SỰ KIỆN TÌM KIẾM =====
searchBtn.addEventListener("click", () => {
  searchProducts(searchInput.value.trim());
});

searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    searchProducts(searchInput.value.trim());
  }
});

// ===== KHỞI TẠO TRANG 1 =====
renderProducts(currentPage);
