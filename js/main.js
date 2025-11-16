console.log("main.js loaded ✅");

// Lấy DOM
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");

// Hiển thị form login mặc định
loginForm.classList.add("show");
registerForm.classList.add("hidden");

// Chuyển sang form Đăng ký
switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  loginForm.classList.remove("show");

  registerForm.classList.remove("hidden");
  registerForm.classList.add("show");
});

// Chuyển sang form Đăng nhập
switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  registerForm.classList.remove("show");

  loginForm.classList.remove("hidden");
  loginForm.classList.add("show");
});

// Popup thông báo
function showMessage(msg, type = "success") {
  const alertBox = document.createElement('div');
  alertBox.className = `alert ${type}`;
  alertBox.innerText = msg;
  document.body.appendChild(alertBox);

  setTimeout(() => alertBox.classList.add('show'), 100);
  setTimeout(() => {
    alertBox.classList.remove('show');
    setTimeout(() => alertBox.remove(), 400);
  }, 2000);
}

// Submit Login
const loginFormEl = loginForm.querySelector("form");
loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  showMessage("Đăng nhập thành công!");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
});

// Submit Register
const registerFormEl = registerForm.querySelector("form");
registerFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  showMessage("Đăng ký thành công! Hãy đăng nhập.");

  setTimeout(() => {
    registerForm.classList.remove("show");
    registerForm.classList.add("hidden");

    loginForm.classList.remove("hidden");
    loginForm.classList.add("show");
  }, 1500);
});
