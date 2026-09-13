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
const homeworkForm = document.getElementById("homeworkForm");
const homeworkTableBody = document.getElementById("homeworkTableBody");
const emptyState = document.getElementById("emptyState");

const classFilter = document.getElementById("classFilter");
const sectionFilter = document.getElementById("sectionFilter");
const subjectFilter = document.getElementById("subjectFilter");
const statusFilter = document.getElementById("statusFilter");
const homeworkSearch = document.getElementById("homeworkSearch");
const topSearch = document.getElementById("topSearch");

let editingRow = null;

const today = new Date();
const todayValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

document.getElementById("formAssignedDate").value = todayValue;

function openModal(row = null) {
    editingRow = row;
    modalOverlay.classList.add("show");

    if (!row) {
        document.getElementById("modalTitle").textContent = "Create Homework";
        homeworkForm.reset();
        document.getElementById("formAssignedDate").value = todayValue;
        document.getElementById("parentVisible").checked = true;
        return;
    }

    document.getElementById("modalTitle").textContent = "Edit Homework";

    document.getElementById("formTitle").value = row.querySelector(".homework-info strong").textContent.trim();
    document.getElementById("formDescription").value = row.querySelector(".homework-info span").textContent.trim();

    const classSection = row.children[1].textContent.trim().split("-");

    if (classSection.length === 2) {
        document.getElementById("formClass").value = classSection[0].trim();
        document.getElementById("formSection").value = classSection[1].trim();
    }

    document.getElementById("formSubject").value = row.children[2].textContent.trim();
    document.getElementById("formTeacher").value = row.children[3].textContent.trim();
    document.getElementById("formAssignedDate").value = convertTextDateToInput(row.children[4].textContent.trim());
    document.getElementById("formDueDate").value = convertTextDateToInput(row.children[5].textContent.trim());
    document.getElementById("formPriority").value = row.querySelector(".priority-badge").textContent.trim();
    document.getElementById("formStatus").value = row.querySelector(".status-badge").textContent.trim();
}

function closeModalWindow() {
    modalOverlay.classList.remove("show");
    homeworkForm.reset();
    document.getElementById("formAssignedDate").value = todayValue;
    document.getElementById("parentVisible").checked = true;
    editingRow = null;
}

function convertTextDateToInput(value) {
    const parts = value.split(" ");

    if (parts.length !== 3) {
        return "";
    }

    const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    };

    const day = parts[0].padStart(2, "0");
    const month = months[parts[1]];
    const year = parts[2];

    return month ? `${year}-${month}-${day}` : "";
}

function formatDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function getPriorityClass(priority) {
    return priority.toLowerCase();
}

function getStatusClass(status) {
    return status.toLowerCase().replace(" ", "-");
}

function updateStatistics() {
    const rows = Array.from(homeworkTableBody.querySelectorAll("tr"));

    let active = 0;
    let completed = 0;
    let overdue = 0;

    rows.forEach(row => {
        const status = row.querySelector(".status-badge").textContent.trim();

        if (status === "Active") {
            active++;
        }

        if (status === "Completed") {
            completed++;
        }

        if (status === "Overdue") {
            overdue++;
        }
    });

    document.getElementById("totalHomework").textContent = rows.length + 119;
    document.getElementById("activeHomework").textContent = active + 83;
    document.getElementById("completedHomework").textContent = completed + 28;
    document.getElementById("dueSoonHomework").textContent = Math.max(7, active);
}

function filterHomework() {
    const selectedClass = classFilter.value;
    const selectedSection = sectionFilter.value;
    const selectedSubject = subjectFilter.value;
    const selectedStatus = statusFilter.value;
    const searchValue = homeworkSearch.value.trim().toLowerCase();

    let visible = 0;

    Array.from(homeworkTableBody.querySelectorAll("tr")).forEach(row => {
        const rowClass = row.dataset.class;
        const rowSection = row.dataset.section;
        const rowSubject = row.dataset.subject;
        const rowStatus = row.dataset.status;

        const title = row.querySelector(".homework-info strong").textContent.toLowerCase();
        const description = row.querySelector(".homework-info span").textContent.toLowerCase();
        const teacher = row.children[3].textContent.toLowerCase();

        const matchesClass = selectedClass === "all" || rowClass === selectedClass;
        const matchesSection = selectedSection === "all" || rowSection === selectedSection;
        const matchesSubject = selectedSubject === "all" || rowSubject === selectedSubject;
        const matchesStatus = selectedStatus === "all" || rowStatus === selectedStatus;

        const matchesSearch =
            !searchValue ||
            title.includes(searchValue) ||
            description.includes(searchValue) ||
            teacher.includes(searchValue);

        const show = matchesClass && matchesSection && matchesSubject && matchesStatus && matchesSearch;

        row.style.display = show ? "" : "none";

        if (show) {
            visible++;
        }
    });

    emptyState.classList.toggle("show", visible === 0);
}

document.getElementById("addHomework").addEventListener("click", () => {
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

[classFilter, sectionFilter, subjectFilter, statusFilter, homeworkSearch].forEach(element => {
    element.addEventListener("input", filterHomework);
    element.addEventListener("change", filterHomework);
});

topSearch.addEventListener("input", () => {
    homeworkSearch.value = topSearch.value;
    filterHomework();
});

homeworkForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("formTitle").value.trim();
    const selectedClass = document.getElementById("formClass").value;
    const section = document.getElementById("formSection").value;
    const subject = document.getElementById("formSubject").value;
    const teacher = document.getElementById("formTeacher").value.trim();
    const description = document.getElementById("formDescription").value.trim();
    const assignedDate = document.getElementById("formAssignedDate").value;
    const dueDate = document.getElementById("formDueDate").value;
    const priority = document.getElementById("formPriority").value;
    const status = document.getElementById("formStatus").value;
    const attachment = document.getElementById("formAttachment").value.trim() || "No reference added";
    const parentVisible = document.getElementById("parentVisible").checked;

    if (!title || !selectedClass || !section || !subject || !teacher || !assignedDate || !dueDate) {
        return;
    }

    const statusClass = getStatusClass(status);
    const priorityClass = getPriorityClass(priority);

    if (editingRow) {
        editingRow.children[0].innerHTML = `
            <div class="homework-info">
                <strong>${title}</strong>
                <span>${description || "Homework assignment"}</span>
            </div>
        `;

        editingRow.children[1].innerHTML = `<span class="class-badge">${selectedClass} - ${section}</span>`;
        editingRow.children[2].textContent = subject;
        editingRow.children[3].textContent = teacher;
        editingRow.children[4].textContent = formatDate(assignedDate);
        editingRow.children[5].textContent = formatDate(dueDate);

        editingRow.children[6].innerHTML = `
            <span class="priority-badge ${priorityClass}">${priority}</span>
        `;

        editingRow.children[7].innerHTML = `
            <span class="status-badge ${statusClass}">${status}</span>
        `;

        editingRow.dataset.class = selectedClass;
        editingRow.dataset.section = section;
        editingRow.dataset.subject = subject;
        editingRow.dataset.status = status;

        editingRow.dataset.description = description;
        editingRow.dataset.attachment = attachment;
        editingRow.dataset.parentVisible = parentVisible;

        closeModalWindow();
        updateStatistics();
        filterHomework();
        return;
    }

    const row = document.createElement("tr");

    row.dataset.class = selectedClass;
    row.dataset.section = section;
    row.dataset.subject = subject;
    row.dataset.status = status;
    row.dataset.description = description;
    row.dataset.attachment = attachment;
    row.dataset.parentVisible = parentVisible;

    row.innerHTML = `
        <td>
            <div class="homework-info">
                <strong>${title}</strong>
                <span>${description || "Homework assignment"}</span>
            </div>
        </td>
        <td>
            <span class="class-badge">${selectedClass} - ${section}</span>
        </td>
        <td>${subject}</td>
        <td>${teacher}</td>
        <td>${formatDate(assignedDate)}</td>
        <td>${formatDate(dueDate)}</td>
        <td>
            <span class="priority-badge ${priorityClass}">${priority}</span>
        </td>
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

    homeworkTableBody.prepend(row);

    closeModalWindow();
    updateStatistics();
    filterHomework();
});

document.addEventListener("click", event => {
    const row = event.target.closest("tr");

    if (!row || !row.parentElement.isSameNode(homeworkTableBody)) {
        return;
    }

    if (event.target.classList.contains("edit-button")) {
        openModal(row);
    }

    if (event.target.classList.contains("delete-button")) {
        if (confirm("Are you sure you want to delete this homework?")) {
            row.remove();
            updateStatistics();
            filterHomework();
        }
    }

    if (event.target.classList.contains("view-button")) {
        const title = row.querySelector(".homework-info strong").textContent.trim();
        const description = row.dataset.description || row.querySelector(".homework-info span").textContent.trim();
        const classSection = row.children[1].textContent.trim();
        const subject = row.children[2].textContent.trim();
        const teacher = row.children[3].textContent.trim();
        const assigned = row.children[4].textContent.trim();
        const due = row.children[5].textContent.trim();
        const priority = row.querySelector(".priority-badge").textContent.trim();
        const status = row.querySelector(".status-badge").textContent.trim();
        const attachment = row.dataset.attachment || "No reference added";
        const parentVisible = row.dataset.parentVisible !== "false";

        document.getElementById("viewTitle").textContent = title;
        document.getElementById("viewSubject").textContent = subject;
        document.getElementById("viewClass").textContent = classSection;
        document.getElementById("viewTeacher").textContent = teacher;
        document.getElementById("viewAssigned").textContent = assigned;
        document.getElementById("viewDue").textContent = due;
        document.getElementById("viewPriority").textContent = priority;
        document.getElementById("viewStatus").textContent = status;
        document.getElementById("viewDescription").textContent = description;
        document.getElementById("viewAttachment").textContent = attachment;
        document.getElementById("viewParentVisibility").textContent =
            parentVisible ? "Visible to parents" : "Hidden from parents";

        viewOverlay.classList.add("show");
    }
});

document.getElementById("exportHomework").addEventListener("click", () => {
    const rows = Array.from(homeworkTableBody.querySelectorAll("tr"))
        .filter(row => row.style.display !== "none");

    let csv = "Homework,Class,Subject,Teacher,Assigned Date,Due Date,Priority,Status\n";

    rows.forEach(row => {
        const title = row.querySelector(".homework-info strong").textContent.trim();
        const className = row.children[1].textContent.trim();
        const subject = row.children[2].textContent.trim();
        const teacher = row.children[3].textContent.trim();
        const assigned = row.children[4].textContent.trim();
        const due = row.children[5].textContent.trim();
        const priority = row.querySelector(".priority-badge").textContent.trim();
        const status = row.querySelector(".status-badge").textContent.trim();

        csv += `"${title}","${className}","${subject}","${teacher}","${assigned}","${due}","${priority}","${status}"\n`;
    });

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "homework-records.csv";
    link.click();

    URL.revokeObjectURL(url);
});

updateStatistics();