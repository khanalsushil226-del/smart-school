const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const showPassword = document.getElementById("showPassword");
const loginMessage = document.getElementById("loginMessage");

showPassword.addEventListener("change", () => {
    passwordInput.type = showPassword.checked ? "text" : "password";
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