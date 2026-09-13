const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("show");
});

sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("show");
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
    }
});

const settingsTabs = document.querySelectorAll(".settings-tab");
const settingsPanels = document.querySelectorAll(".settings-panel");

settingsTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const section = tab.dataset.section;

        settingsTabs.forEach(item => item.classList.remove("active"));
        settingsPanels.forEach(panel => panel.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(section).classList.add("active");
    });
});

const accountForm = document.getElementById("accountForm");

accountForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();

    if (!name) {
        alert("Please enter your full name.");
        return;
    }

    document.querySelector(".profile-card h4").textContent = name;
    document.querySelector(".large-avatar").textContent = name.charAt(0).toUpperCase();
    document.querySelector(".user-avatar").textContent = name.charAt(0).toUpperCase();

    alert("Account settings saved successfully.");
});

document.getElementById("accountReset").addEventListener("click", () => {
    document.getElementById("fullName").value = "Administrator";
    document.getElementById("username").value = "admin";
    document.getElementById("email").value = "admin@hamroschool.edu.np";
    document.getElementById("phone").value = "+977 9800000000";
});

document.getElementById("schoolSave").addEventListener("click", () => {
    const schoolName = document.getElementById("schoolName").value.trim();

    if (!schoolName) {
        alert("Please enter the school name.");
        return;
    }

    document.getElementById("previewSchoolName").textContent = schoolName;
    alert("School settings saved successfully.");
});

document.getElementById("notificationSave").addEventListener("click", () => {
    const notificationSettings = {
        attendance: document.getElementById("attendanceNotification").checked,
        homework: document.getElementById("homeworkNotification").checked,
        announcements: document.getElementById("announcementNotification").checked,
        calendar: document.getElementById("calendarNotification").checked,
        system: document.getElementById("systemNotification").checked
    };

    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));

    alert("Notification preferences saved successfully.");
});

function loadNotificationSettings() {
    const saved = localStorage.getItem("notificationSettings");

    if (!saved) {
        return;
    }

    const settings = JSON.parse(saved);

    document.getElementById("attendanceNotification").checked = settings.attendance;
    document.getElementById("homeworkNotification").checked = settings.homework;
    document.getElementById("announcementNotification").checked = settings.announcements;
    document.getElementById("calendarNotification").checked = settings.calendar;
    document.getElementById("systemNotification").checked = settings.system;
}

loadNotificationSettings();

const brandColor = document.getElementById("brandColor");
const brandColorText = document.getElementById("brandColorText");

brandColor.addEventListener("input", () => {
    brandColorText.value = brandColor.value;
});

brandColorText.addEventListener("input", () => {
    const value = brandColorText.value;

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        brandColor.value = value;
        document.documentElement.style.setProperty("--primary", value);
    }
});

document.getElementById("brandName").addEventListener("input", event => {
    document.getElementById("previewSchoolName").textContent = event.target.value || "Hamro School";
});

document.getElementById("schoolLogo").addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        event.target.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        const preview = document.getElementById("previewLogo");
        preview.style.backgroundImage = `url(${reader.result})`;
        preview.style.backgroundSize = "cover";
        preview.style.backgroundPosition = "center";
        preview.textContent = "";
    };

    reader.readAsDataURL(file);
});

document.getElementById("appearanceSave").addEventListener("click", () => {
    const appearanceSettings = {
        brandName: document.getElementById("brandName").value,
        brandColor: document.getElementById("brandColor").value,
        theme: document.getElementById("themeMode").value
    };

    localStorage.setItem("appearanceSettings", JSON.stringify(appearanceSettings));

    alert("Appearance settings saved successfully.");
});

document.getElementById("appearanceReset").addEventListener("click", () => {
    document.getElementById("brandName").value = "Hamro School";
    document.getElementById("brandColor").value = "#056c24";
    document.getElementById("brandColorText").value = "#056c24";
    document.getElementById("themeMode").value = "light";

    document.documentElement.style.setProperty("--primary", "#056c24");

    const preview = document.getElementById("previewLogo");
    preview.style.backgroundImage = "";
    preview.textContent = "SS";
    document.getElementById("previewSchoolName").textContent = "Hamro School";
});

function loadAppearanceSettings() {
    const saved = localStorage.getItem("appearanceSettings");

    if (!saved) {
        return;
    }

    const settings = JSON.parse(saved);

    if (settings.brandName) {
        document.getElementById("brandName").value = settings.brandName;
        document.getElementById("previewSchoolName").textContent = settings.brandName;
    }

    if (settings.brandColor) {
        document.getElementById("brandColor").value = settings.brandColor;
        document.getElementById("brandColorText").value = settings.brandColor;
        document.documentElement.style.setProperty("--primary", settings.brandColor);
    }

    if (settings.theme) {
        document.getElementById("themeMode").value = settings.theme;
    }
}

loadAppearanceSettings();

const showPasswords = document.getElementById("showPasswords");
const passwordFields = [
    document.getElementById("currentPassword"),
    document.getElementById("newPassword"),
    document.getElementById("confirmPassword")
];

showPasswords.addEventListener("change", () => {
    passwordFields.forEach(field => {
        field.type = showPasswords.checked ? "text" : "password";
    });
});

document.getElementById("passwordForm").addEventListener("submit", event => {
    event.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Please fill in all password fields.");
        return;
    }

    if (newPassword.length < 8) {
        alert("New password must contain at least 8 characters.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
    }

    alert("Password updated successfully.");

    document.getElementById("passwordForm").reset();
    passwordFields.forEach(field => {
        field.type = "password";
    });
});

document.getElementById("logoutAll").addEventListener("click", () => {
    const confirmed = confirm("Are you sure you want to logout from all sessions?");

    if (confirmed) {
        alert("All sessions have been logged out.");
        window.location.href = "index.html";
    }
});

document.getElementById("exportSettings").addEventListener("click", () => {
    const settings = {
        account: {
            fullName: document.getElementById("fullName").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value
        },
        school: {
            name: document.getElementById("schoolName").value,
            code: document.getElementById("schoolCode").value,
            academicYear: document.getElementById("academicYear").value,
            workingDays: document.getElementById("workingDays").value,
            schoolStart: document.getElementById("schoolStart").value,
            schoolEnd: document.getElementById("schoolEnd").value
        },
        notifications: {
            attendance: document.getElementById("attendanceNotification").checked,
            homework: document.getElementById("homeworkNotification").checked,
            announcements: document.getElementById("announcementNotification").checked,
            calendar: document.getElementById("calendarNotification").checked,
            system: document.getElementById("systemNotification").checked
        },
        appearance: {
            brandName: document.getElementById("brandName").value,
            brandColor: document.getElementById("brandColor").value,
            theme: document.getElementById("themeMode").value
        }
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "hamro-school-settings.json";
    link.click();

    URL.revokeObjectURL(url);
});

document.getElementById("resetSettings").addEventListener("click", () => {
    const confirmed = confirm("Reset all saved frontend preferences?");

    if (!confirmed) {
        return;
    }

    localStorage.removeItem("notificationSettings");
    localStorage.removeItem("appearanceSettings");

    location.reload();
});

document.getElementById("topSearch").addEventListener("input", event => {
    const query = event.target.value.toLowerCase().trim();

    if (!query) {
        settingsTabs.forEach(tab => {
            tab.style.display = "flex";
        });
        return;
    }

    settingsTabs.forEach(tab => {
        const text = tab.textContent.toLowerCase();
        tab.style.display = text.includes(query) ? "flex" : "none";
    });
});