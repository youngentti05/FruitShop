console.log("main.js loaded ✅");

// --- Toggle giữa Login và Register ---
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

// Hiển thị form đăng nhập mặc định
loginForm.classList.add('active');

if (switchToRegister && switchToLogin) {
  switchToRegister.addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
  });

  switchToLogin.addEventListener('click', e => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
  });
}

// --- Hiển thị thông báo ---
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

// --- Xử lý đăng nhập / đăng ký ---
const loginFormEl = document.querySelector('#loginForm form');
const registerFormEl = document.querySelector('#registerForm form');

if (loginFormEl) {
  loginFormEl.addEventListener('submit', e => {
    e.preventDefault();
    showMessage("Đăng nhập thành công!");
    setTimeout(() => window.location.href = "index.html", 1800);
  });
}

if (registerFormEl) {
  registerFormEl.addEventListener('submit', e => {
    e.preventDefault();
    showMessage("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
    setTimeout(() => {
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    }, 1800);
  });
}
