const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");
const loginMessage = document.getElementById("loginMessage");

passwordToggle.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";
    passwordToggle.textContent = isPassword ? "🙈" : "👁";
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        loginMessage.textContent = "Please enter your username and password.";
        loginMessage.style.color = "#dc2626";
        return;
    }

    loginMessage.textContent = "Login successful!";
    loginMessage.style.color = "#056c24";
});