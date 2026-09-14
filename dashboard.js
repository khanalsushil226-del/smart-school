const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

if (menuButton && sidebar && sidebarOverlay) {
    menuButton.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        sidebarOverlay.classList.toggle("show");
    });

    sidebarOverlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
    });
}

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");

        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});

const attendancePeriod = document.getElementById("attendancePeriod");
const attendanceBars = document.getElementById("attendanceBars");

const attendanceData = {
    "This Week": {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        values: [92, 95, 91, 97, 94, 96, 93]
    },
    "This Month": {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [93, 95, 91, 96]
    },
    "This Term": {
        labels: ["Jun", "Jul", "Aug", "Sep"],
        values: [91, 94, 93, 95]
    }
};

function renderAttendanceChart(period) {
    const data = attendanceData[period];

    attendanceBars.innerHTML = "";

    data.labels.forEach((label, index) => {
        const group = document.createElement("div");
        group.className = "bar-group";

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${data.values[index]}%`;

        const labelElement = document.createElement("span");
        labelElement.textContent = label;

        group.appendChild(bar);
        group.appendChild(labelElement);
        attendanceBars.appendChild(group);
    });
}

if (attendancePeriod && attendanceBars) {
    renderAttendanceChart(attendancePeriod.value);

    attendancePeriod.addEventListener("change", () => {
        renderAttendanceChart(attendancePeriod.value);
    });
}

window.addEventListener("scroll", () => {
    const header = document.querySelector(".topbar");

    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }
});