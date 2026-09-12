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

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
    }
});

const topSearch = document.getElementById("topSearch");

topSearch.addEventListener("input", () => {
    const searchValue = topSearch.value.toLowerCase().trim();

    document.querySelectorAll(".student-row").forEach(row => {
        const studentText = row.textContent.toLowerCase();

        if (studentText.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

const addStudentButton = document.getElementById("addStudentButton");

addStudentButton.addEventListener("click", () => {
    window.location.href = "students.html";
});

const attendancePeriod = document.getElementById("attendancePeriod");

attendancePeriod.addEventListener("change", () => {
    const period = attendancePeriod.value;

    if (period === "This Month") {
        document.querySelector(".attendance-card .card-header p").textContent = "Student attendance for this month";
    } else if (period === "This Term") {
        document.querySelector(".attendance-card .card-header p").textContent = "Student attendance for this term";
    } else {
        document.querySelector(".attendance-card .card-header p").textContent = "Student attendance for this week";
    }
});