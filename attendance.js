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

const attendanceDate = document.getElementById("attendanceDate");
const classFilter = document.getElementById("classFilter");
const sectionFilter = document.getElementById("sectionFilter");
const studentSearch = document.getElementById("studentSearch");
const topSearch = document.getElementById("topSearch");
const tableBody = document.getElementById("attendanceTableBody");
const emptyState = document.getElementById("emptyState");

const presentStat = document.getElementById("presentStat");
const absentStat = document.getElementById("absentStat");
const lateStat = document.getElementById("lateStat");
const rateStat = document.getElementById("rateStat");

const studentCount = document.getElementById("studentCount");
const summaryPresent = document.getElementById("summaryPresent");
const summaryAbsent = document.getElementById("summaryAbsent");
const summaryLate = document.getElementById("summaryLate");

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

attendanceDate.value = `${year}-${month}-${day}`;

function getRows() {
    return Array.from(tableBody.querySelectorAll("tr"));
}

function getStatus(row) {
    const activeButton = row.querySelector(".status-button.active");
    return activeButton ? activeButton.dataset.status : "present";
}

function updateSummary() {
    const visibleRows = getRows().filter(row => row.style.display !== "none");

    let present = 0;
    let absent = 0;
    let late = 0;

    visibleRows.forEach(row => {
        const status = getStatus(row);

        if (status === "present") {
            present++;
        }

        if (status === "absent") {
            absent++;
        }

        if (status === "late") {
            late++;
        }
    });

    const total = visibleRows.length;
    const rate = total ? ((present + late) / total) * 100 : 0;

    studentCount.textContent = `${total} Student${total === 1 ? "" : "s"}`;
    summaryPresent.textContent = present;
    summaryAbsent.textContent = absent;
    summaryLate.textContent = late;

    presentStat.textContent = 1179 + present - 6;
    absentStat.textContent = 42 + absent - 1;
    lateStat.textContent = 21 + late - 1;
    rateStat.textContent = `${rate.toFixed(1)}%`;
}

function filterStudents() {
    const selectedClass = classFilter.value;
    const selectedSection = sectionFilter.value;
    const searchValue = studentSearch.value.trim().toLowerCase();

    let visibleCount = 0;

    getRows().forEach(row => {
        const studentName = row.querySelector(".student-info strong").textContent.toLowerCase();
        const studentId = row.children[1].textContent.toLowerCase();
        const rowClass = row.dataset.class;
        const rowSection = row.dataset.section;

        const matchesClass = selectedClass === "all" || rowClass === selectedClass;
        const matchesSection = selectedSection === "all" || rowSection === selectedSection;
        const matchesSearch = !searchValue || studentName.includes(searchValue) || studentId.includes(searchValue);

        const shouldShow = matchesClass && matchesSection && matchesSearch;

        row.style.display = shouldShow ? "" : "none";

        if (shouldShow) {
            visibleCount++;
        }
    });

    emptyState.classList.toggle("show", visibleCount === 0);

    updateSummary();
}

function setStatus(button) {
    const row = button.closest("tr");
    const buttons = row.querySelectorAll(".status-button");

    buttons.forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");

    updateSummary();
}

document.querySelectorAll(".status-button").forEach(button => {
    button.addEventListener("click", () => {
        setStatus(button);
    });
});

[classFilter, sectionFilter, studentSearch].forEach(element => {
    element.addEventListener("input", filterStudents);
    element.addEventListener("change", filterStudents);
});

topSearch.addEventListener("input", () => {
    studentSearch.value = topSearch.value;
    filterStudents();
});

document.getElementById("markAllPresent").addEventListener("click", () => {
    getRows()
        .filter(row => row.style.display !== "none")
        .forEach(row => {
            row.querySelectorAll(".status-button").forEach(button => {
                button.classList.remove("active");
            });

            row.querySelector('[data-status="present"]').classList.add("active");
        });

    updateSummary();
});

document.getElementById("saveAttendance").addEventListener("click", () => {
    alert("Attendance has been saved successfully.");
});

updateSummary();