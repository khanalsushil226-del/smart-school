const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("change", () => {
    passwordInput.type = showPassword.checked ? "text" : "password";
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value;

    if (username === "admin" && password === "admin@123") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password");
    }
});