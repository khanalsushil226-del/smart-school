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

const modalOverlay = document.getElementById("modalOverlay");
const addTimetable = document.getElementById("addTimetable");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const timetableForm = document.getElementById("timetableForm");
const scheduleList = document.getElementById("scheduleList");
const emptyState = document.getElementById("emptyState");

const classFilter = document.getElementById("classFilter");
const sectionFilter = document.getElementById("sectionFilter");
const academicYear = document.getElementById("academicYear");

let editingCard = null;

function openModal(card = null) {
    editingCard = card;
    modalOverlay.classList.add("show");

    if (card) {
        document.getElementById("modalTitle").textContent = "Edit Timetable Entry";

        const subject = card.querySelector(".period-details strong").textContent;
        const teacher = card.querySelector(".period-details span").textContent;
        const room = card.querySelector(".room strong").textContent;

        document.getElementById("formSubject").value = subject;
        document.getElementById("formTeacher").value = teacher;
        document.getElementById("formRoom").value = room;
    } else {
        document.getElementById("modalTitle").textContent = "Add Timetable Entry";
        timetableForm.reset();
    }
}

function closeTimetableModal() {
    modalOverlay.classList.remove("show");
    timetableForm.reset();
    editingCard = null;
}

addTimetable.addEventListener("click", () => {
    openModal();
});

closeModal.addEventListener("click", closeTimetableModal);
cancelModal.addEventListener("click", closeTimetableModal);

modalOverlay.addEventListener("click", event => {
    if (event.target === modalOverlay) {
        closeTimetableModal();
    }
});

document.querySelectorAll(".day-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".day-tab").forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        if (tab.dataset.day !== "Monday") {
            scheduleList.innerHTML = "";
            emptyState.classList.add("show");
        } else {
            location.reload();
        }
    });
});

document.addEventListener("click", event => {
    if (event.target.classList.contains("edit-button")) {
        openModal(event.target.closest(".period-card"));
    }

    if (event.target.classList.contains("delete-button")) {
        const card = event.target.closest(".period-card");

        if (confirm("Are you sure you want to delete this timetable entry?")) {
            card.closest(".period-row").remove();
            updateStatistics();
            checkEmptyState();
        }
    }
});

timetableForm.addEventListener("submit", event => {
    event.preventDefault();

    const subject = document.getElementById("formSubject").value.trim();
    const teacher = document.getElementById("formTeacher").value.trim();
    const room = document.getElementById("formRoom").value.trim();
    const startTime = document.getElementById("formStartTime").value;
    const endTime = document.getElementById("formEndTime").value;

    if (!subject || !teacher || !room || !startTime || !endTime) {
        return;
    }

    if (editingCard) {
        editingCard.querySelector(".period-details strong").textContent = subject;
        editingCard.querySelector(".period-details span").textContent = teacher;
        editingCard.querySelector(".room strong").textContent = room;

        closeTimetableModal();
        return;
    }

    const startDate = new Date(`1970-01-01T${startTime}`);
    const endDate = new Date(`1970-01-01T${endTime}`);

    const startFormatted = startDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

    const endFormatted = endDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

    const initials = subject
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 1)
        .toUpperCase();

    const row = document.createElement("div");
    row.className = "period-row";

    row.innerHTML = `
        <div class="period-time">
            <strong>${startFormatted}</strong>
            <span>${endFormatted}</span>
        </div>
        <div class="period-card">
            <div class="subject-icon">${initials}</div>
            <div class="period-details">
                <strong>${subject}</strong>
                <span>${teacher}</span>
            </div>
            <div class="room">
                <span>Room</span>
                <strong>${room}</strong>
            </div>
            <div class="period-actions">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        </div>
    `;

    scheduleList.appendChild(row);

    emptyState.classList.remove("show");

    updateStatistics();
    closeTimetableModal();
});

function updateStatistics() {
    const periods = document.querySelectorAll(".period-card").length;

    document.getElementById("totalPeriods").textContent = periods + 36;
}

function checkEmptyState() {
    const periods = document.querySelectorAll(".period-card").length;

    emptyState.classList.toggle("show", periods === 0);
}

[classFilter, sectionFilter, academicYear].forEach(filter => {
    filter.addEventListener("change", () => {
        document.querySelectorAll(".day-tab").forEach(tab => {
            tab.classList.remove("active");
        });

        document.querySelector('.day-tab[data-day="Monday"]').classList.add("active");

        scheduleList.style.display = "flex";
        emptyState.classList.remove("show");
    });
});

document.getElementById("exportTimetable").addEventListener("click", () => {
    const rows = document.querySelectorAll(".period-card");

    let csv = "Subject,Teacher,Room\n";

    rows.forEach(row => {
        const subject = row.querySelector(".period-details strong").textContent;
        const teacher = row.querySelector(".period-details span").textContent;
        const room = row.querySelector(".room strong").textContent;

        csv += `"${subject}","${teacher}","${room}"\n`;
    });

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "timetable.csv";
    link.click();

    URL.revokeObjectURL(url);
});