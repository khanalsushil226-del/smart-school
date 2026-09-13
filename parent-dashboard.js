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

const children = {
    rahul: {
        initials: "RS",
        name: "Rahul Sharma",
        className: "Grade 10 • Section A • Roll No. 12",
        id: "ST-1001",
        teacher: "Mr. Ramesh Karki",
        attendance: "94.8%",
        present: "172",
        absent: "7",
        late: "3",
        homework: "8"
    },
    priya: {
        initials: "PS",
        name: "Priya Sharma",
        className: "Grade 7 • Section B • Roll No. 8",
        id: "ST-2048",
        teacher: "Ms. Sita Thapa",
        attendance: "96.2%",
        present: "181",
        absent: "5",
        late: "2",
        homework: "6"
    }
};

const childCards = document.querySelectorAll(".child-card");

const studentAvatar = document.getElementById("studentAvatar");
const studentName = document.getElementById("studentName");
const studentClass = document.getElementById("studentClass");
const studentId = document.getElementById("studentId");
const classTeacher = document.getElementById("classTeacher");
const attendanceValue = document.getElementById("attendanceValue");
const homeworkValue = document.getElementById("homeworkValue");
const circleAttendance = document.getElementById("circleAttendance");
const presentDays = document.getElementById("presentDays");
const absentDays = document.getElementById("absentDays");
const lateDays = document.getElementById("lateDays");

function updateChild(childKey) {
    const child = children[childKey];

    childCards.forEach(card => {
        card.classList.toggle("active", card.dataset.child === childKey);
    });

    studentAvatar.textContent = child.initials;
    studentName.textContent = child.name;
    studentClass.textContent = child.className;
    studentId.textContent = child.id;
    classTeacher.textContent = child.teacher;
    attendanceValue.textContent = child.attendance;
    homeworkValue.textContent = child.homework;
    circleAttendance.textContent = child.attendance;
    presentDays.textContent = child.present;
    absentDays.textContent = child.absent;
    lateDays.textContent = child.late;
}

childCards.forEach(card => {
    card.addEventListener("click", () => {
        updateChild(card.dataset.child);
    });
});

const notificationButton = document.getElementById("notificationButton");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotifications = document.getElementById("closeNotifications");
const markRead = document.getElementById("markRead");
const notificationValue = document.getElementById("notificationValue");

notificationButton.addEventListener("click", event => {
    event.stopPropagation();
    notificationPanel.classList.toggle("show");
});

closeNotifications.addEventListener("click", () => {
    notificationPanel.classList.remove("show");
});

document.addEventListener("click", event => {
    if (!notificationPanel.contains(event.target) && !notificationButton.contains(event.target)) {
        notificationPanel.classList.remove("show");
    }
});

markRead.addEventListener("click", () => {
    document.querySelectorAll(".notification-item").forEach(item => {
        item.classList.remove("unread");
        const dot = item.querySelector(".notification-dot");
        if (dot) {
            dot.style.display = "none";
        }
    });

    notificationValue.textContent = "0";
    notificationButton.querySelector("b").style.display = "none";
    document.querySelector(".notification-panel-header span").textContent = "No unread notifications";
});

const topSearch = document.getElementById("topSearch");

topSearch.addEventListener("input", () => {
    const query = topSearch.value.toLowerCase().trim();

    document.querySelectorAll(".panel").forEach(panel => {
        const text = panel.textContent.toLowerCase();

        if (!query) {
            panel.style.display = "";
            return;
        }

        panel.style.display = text.includes(query) ? "" : "none";
    });

    if (!query) {
        document.querySelectorAll(".panel").forEach(panel => {
            panel.style.display = "";
        });
    }
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});

updateChild("rahul");