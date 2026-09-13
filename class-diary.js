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
const viewOverlay = document.getElementById("viewOverlay");
const diaryForm = document.getElementById("diaryForm");
const diaryTableBody = document.getElementById("diaryTableBody");
const emptyState = document.getElementById("emptyState");

const dateFilter = document.getElementById("dateFilter");
const classFilter = document.getElementById("classFilter");
const sectionFilter = document.getElementById("sectionFilter");
const subjectFilter = document.getElementById("subjectFilter");
const diarySearch = document.getElementById("diarySearch");
const topSearch = document.getElementById("topSearch");

let editingRow = null;

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
const todayDay = String(today.getDate()).padStart(2, "0");

dateFilter.value = `${todayYear}-${todayMonth}-${todayDay}`;
document.getElementById("formDate").value = `${todayYear}-${todayMonth}-${todayDay}`;

function openModal(row = null) {
    editingRow = row;
    modalOverlay.classList.add("show");

    if (row) {
        document.getElementById("modalTitle").textContent = "Edit Diary Entry";

        const date = row.children[0].textContent;
        const classSection = row.children[1].textContent.trim();
        const subject = row.children[2].textContent.trim();
        const teacher = row.children[3].textContent.trim();
        const topic = row.querySelector(".topic-info strong").textContent;
        const homework = row.children[5].textContent.trim();
        const status = row.querySelector(".status-badge").textContent.trim();

        document.getElementById("formSubject").value = subject;
        document.getElementById("formTeacher").value = teacher;
        document.getElementById("formTopic").value = topic;
        document.getElementById("formHomework").value = homework;
        document.getElementById("formStatus").value = status;

        const parts = classSection.split("-");

        if (parts.length === 2) {
            document.getElementById("formClass").value = parts[0].trim();
            document.getElementById("formSection").value = parts[1].trim();
        }
    } else {
        document.getElementById("modalTitle").textContent = "Add Diary Entry";
        diaryForm.reset();
        document.getElementById("formDate").value = `${todayYear}-${todayMonth}-${todayDay}`;
    }
}

function closeModalWindow() {
    modalOverlay.classList.remove("show");
    diaryForm.reset();
    document.getElementById("formDate").value = `${todayYear}-${todayMonth}-${todayDay}`;
    editingRow = null;
}

document.getElementById("addDiary").addEventListener("click", () => {
    openModal();
});

document.getElementById("closeModal").addEventListener("click", closeModalWindow);
document.getElementById("cancelModal").addEventListener("click", closeModalWindow);

modalOverlay.addEventListener("click", event => {
    if (event.target === modalOverlay) {
        closeModalWindow();
    }
});

document.getElementById("closeView").addEventListener("click", () => {
    viewOverlay.classList.remove("show");
});

viewOverlay.addEventListener("click", event => {
    if (event.target === viewOverlay) {
        viewOverlay.classList.remove("show");
    }
});

function formatDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function getStatusClass(status) {
    if (status === "Completed") {
        return "completed";
    }

    if (status === "In Progress") {
        return "in-progress";
    }

    return "pending";
}

function updateStatistics() {
    const rows = Array.from(diaryTableBody.querySelectorAll("tr"));

    document.getElementById("totalEntries").textContent = rows.length + 81;

    const teachers = new Set();
    const classes = new Set();

    rows.forEach(row => {
        teachers.add(row.children[3].textContent.trim());
        classes.add(row.children[1].textContent.trim());
    });

    document.getElementById("teacherCount").textContent = teachers.size + 13;
    document.getElementById("classCount").textContent = classes.size + 8;
}

function filterDiary() {
    const selectedDate = dateFilter.value;
    const selectedClass = classFilter.value;
    const selectedSection = sectionFilter.value;
    const selectedSubject = subjectFilter.value;
    const searchValue = diarySearch.value.trim().toLowerCase();

    let visible = 0;

    Array.from(diaryTableBody.querySelectorAll("tr")).forEach(row => {
        const rowDate = row.children[0].textContent.trim();
        const rowClass = row.dataset.class;
        const rowSection = row.dataset.section;
        const rowSubject = row.dataset.subject;

        const topic = row.querySelector(".topic-info strong").textContent.toLowerCase();
        const teacher = row.children[3].textContent.toLowerCase();
        const subject = row.children[2].textContent.toLowerCase();

        const formattedFilterDate = selectedDate ? formatDate(selectedDate) : "";

        const matchesDate = !selectedDate || rowDate === formattedFilterDate;
        const matchesClass = selectedClass === "all" || rowClass === selectedClass;
        const matchesSection = selectedSection === "all" || rowSection === selectedSection;
        const matchesSubject = selectedSubject === "all" || rowSubject === selectedSubject;
        const matchesSearch =
            !searchValue ||
            topic.includes(searchValue) ||
            teacher.includes(searchValue) ||
            subject.includes(searchValue);

        const show = matchesDate && matchesClass && matchesSection && matchesSubject && matchesSearch;

        row.style.display = show ? "" : "none";

        if (show) {
            visible++;
        }
    });

    emptyState.classList.toggle("show", visible === 0);
}

[dateFilter, classFilter, sectionFilter, subjectFilter, diarySearch].forEach(element => {
    element.addEventListener("input", filterDiary);
    element.addEventListener("change", filterDiary);
});

topSearch.addEventListener("input", () => {
    diarySearch.value = topSearch.value;
    filterDiary();
});

diaryForm.addEventListener("submit", event => {
    event.preventDefault();

    const date = document.getElementById("formDate").value;
    const selectedClass = document.getElementById("formClass").value;
    const section = document.getElementById("formSection").value;
    const subject = document.getElementById("formSubject").value;
    const teacher = document.getElementById("formTeacher").value.trim();
    const topic = document.getElementById("formTopic").value.trim();
    const notes = document.getElementById("formNotes").value.trim();
    const homework = document.getElementById("formHomework").value.trim() || "—";
    const status = document.getElementById("formStatus").value;

    if (!date || !selectedClass || !section || !subject || !teacher || !topic) {
        return;
    }

    const statusClass = getStatusClass(status);

    if (editingRow) {
        editingRow.children[0].textContent = formatDate(date);
        editingRow.children[1].innerHTML = `<span class="class-badge">${selectedClass} - ${section}</span>`;
        editingRow.children[2].textContent = subject;
        editingRow.children[3].textContent = teacher;
        editingRow.querySelector(".topic-info strong").textContent = topic;
        editingRow.querySelector(".topic-info span").textContent = notes || "Classroom lesson";
        editingRow.children[5].textContent = homework;

        const statusBadge = editingRow.querySelector(".status-badge");
        statusBadge.textContent = status;
        statusBadge.className = `status-badge ${statusClass}`;

        editingRow.dataset.class = selectedClass;
        editingRow.dataset.section = section;
        editingRow.dataset.subject = subject;

        closeModalWindow();
        filterDiary();
        updateStatistics();
        return;
    }

    const row = document.createElement("tr");

    row.dataset.class = selectedClass;
    row.dataset.section = section;
    row.dataset.subject = subject;

    row.innerHTML = `
        <td>${formatDate(date)}</td>
        <td>
            <span class="class-badge">${selectedClass} - ${section}</span>
        </td>
        <td>${subject}</td>
        <td>${teacher}</td>
        <td>
            <div class="topic-info">
                <strong>${topic}</strong>
                <span>${notes || "Classroom lesson"}</span>
            </div>
        </td>
        <td>${homework}</td>
        <td>
            <span class="status-badge ${statusClass}">${status}</span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="view-button">View</button>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        </td>
    `;

    diaryTableBody.prepend(row);

    closeModalWindow();
    updateStatistics();
    filterDiary();
});

document.addEventListener("click", event => {
    const row = event.target.closest("tr");

    if (!row || !row.parentElement.isSameNode(diaryTableBody)) {
        return;
    }

    if (event.target.classList.contains("edit-button")) {
        openModal(row);
    }

    if (event.target.classList.contains("delete-button")) {
        if (confirm("Are you sure you want to delete this diary entry?")) {
            row.remove();
            updateStatistics();
            filterDiary();
        }
    }

    if (event.target.classList.contains("view-button")) {
        const topic = row.querySelector(".topic-info strong").textContent;
        const notes = row.querySelector(".topic-info span").textContent;
        const subject = row.children[2].textContent.trim();
        const teacher = row.children[3].textContent.trim();
        const date = row.children[0].textContent.trim();
        const classSection = row.children[1].textContent.trim();
        const homework = row.children[5].textContent.trim();
        const status = row.querySelector(".status-badge").textContent.trim();

        document.getElementById("viewTopic").textContent = topic;
        document.getElementById("viewSubject").textContent = subject;
        document.getElementById("viewDate").textContent = date;
        document.getElementById("viewClass").textContent = classSection;
        document.getElementById("viewTeacher").textContent = teacher;
        document.getElementById("viewStatus").textContent = status;
        document.getElementById("viewNotes").textContent = notes;
        document.getElementById("viewHomework").textContent = homework;

        viewOverlay.classList.add("show");
    }
});

document.getElementById("exportDiary").addEventListener("click", () => {
    const rows = Array.from(diaryTableBody.querySelectorAll("tr"))
        .filter(row => row.style.display !== "none");

    let csv = "Date,Class,Subject,Teacher,Lesson/Topic,Homework,Status\n";

    rows.forEach(row => {
        const date = row.children[0].textContent.trim();
        const className = row.children[1].textContent.trim();
        const subject = row.children[2].textContent.trim();
        const teacher = row.children[3].textContent.trim();
        const topic = row.querySelector(".topic-info strong").textContent.trim();
        const homework = row.children[5].textContent.trim();
        const status = row.querySelector(".status-badge").textContent.trim();

        csv += `"${date}","${className}","${subject}","${teacher}","${topic}","${homework}","${status}"\n`;
    });

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "class-diary.csv";
    link.click();

    URL.revokeObjectURL(url);
});

updateStatistics();