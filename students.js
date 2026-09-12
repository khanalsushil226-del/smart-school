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

const studentSearch = document.getElementById("studentSearch");
const topSearch = document.getElementById("topSearch");
const classFilter = document.getElementById("classFilter");
const sectionFilter = document.getElementById("sectionFilter");
const statusFilter = document.getElementById("statusFilter");
const emptyState = document.getElementById("emptyState");
const showingCount = document.getElementById("showingCount");

function getStudentRows() {
    return document.querySelectorAll("#studentTableBody tr");
}

function filterStudents() {
    const searchValue = studentSearch.value.toLowerCase().trim();
    const classValue = classFilter.value;
    const sectionValue = sectionFilter.value;
    const statusValue = statusFilter.value;

    let visibleCount = 0;

    getStudentRows().forEach(row => {
        const studentText = row.textContent.toLowerCase();
        const studentClass = row.dataset.class;
        const studentSection = row.dataset.section;
        const studentStatus = row.dataset.status;

        const matchesSearch = studentText.includes(searchValue);
        const matchesClass = !classValue || studentClass === classValue;
        const matchesSection = !sectionValue || studentSection === sectionValue;
        const matchesStatus = !statusValue || studentStatus === statusValue;

        if (matchesSearch && matchesClass && matchesSection && matchesStatus) {
            row.style.display = "";
            visibleCount++;
        } else {
            row.style.display = "none";
        }
    });

    showingCount.textContent = visibleCount;

    if (visibleCount === 0) {
        emptyState.classList.add("show");
    } else {
        emptyState.classList.remove("show");
    }
}

studentSearch.addEventListener("input", () => {
    topSearch.value = studentSearch.value;
    filterStudents();
});

topSearch.addEventListener("input", () => {
    studentSearch.value = topSearch.value;
    filterStudents();
});

classFilter.addEventListener("change", filterStudents);
sectionFilter.addEventListener("change", filterStudents);
statusFilter.addEventListener("change", filterStudents);

const modal = document.getElementById("studentModal");
const addStudentButton = document.getElementById("addStudentButton");
const closeModal = document.getElementById("closeModal");
const cancelButton = document.getElementById("cancelButton");
const studentForm = document.getElementById("studentForm");

function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeStudentModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

addStudentButton.addEventListener("click", openModal);
closeModal.addEventListener("click", closeStudentModal);
cancelButton.addEventListener("click", closeStudentModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeStudentModal();
    }
});

studentForm.addEventListener("submit", event => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const admissionNumber = document.getElementById("admissionNumber").value.trim();
    const gender = document.getElementById("gender").value;
    const studentClass = document.getElementById("studentClass").value;
    const studentSection = document.getElementById("studentSection").value;
    const parentName = document.getElementById("parentName").value.trim();
    const email = document.getElementById("email").value.trim();

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    const row = document.createElement("tr");

    row.dataset.class = studentClass;
    row.dataset.section = studentSection;
    row.dataset.status = "Active";

    row.innerHTML = `
        <td>
            <div class="student-info">
                <div class="student-avatar">${initials}</div>
                <div>
                    <strong>${firstName} ${lastName}</strong>
                    <span>${email || "No email provided"}</span>
                </div>
            </div>
        </td>

        <td>${studentId}</td>
        <td>${admissionNumber}</td>
        <td>${studentClass}</td>
        <td>${studentSection}</td>
        <td>${gender}</td>
        <td>${parentName}</td>

        <td>
            <span class="status active">Active</span>
        </td>

        <td>
            <div class="action-buttons">
                <button class="view-button" title="View">◉</button>
                <button class="edit-button" title="Edit">✎</button>
                <button class="delete-button" title="Delete">×</button>
            </div>
        </td>
    `;

    document.getElementById("studentTableBody").prepend(row);

    studentForm.reset();
    document.getElementById("academicYear").value = "2026";

    closeStudentModal();
    attachRowActions(row);
    updateStatistics();
    filterStudents();
});

function attachRowActions(row) {
    const deleteButton = row.querySelector(".delete-button");

    deleteButton.addEventListener("click", () => {
        const studentName = row.querySelector(".student-info strong").textContent;

        if (confirm(`Are you sure you want to delete ${studentName}?`)) {
            row.remove();
            updateStatistics();
            filterStudents();
        }
    });

    const viewButton = row.querySelector(".view-button");

    viewButton.addEventListener("click", () => {
        const studentId = row.children[1].textContent.trim();
        window.location.href = `student-profile.html?id=${encodeURIComponent(studentId)}`;
    });

    const editButton = row.querySelector(".edit-button");

    editButton.addEventListener("click", () => {
        alert("Edit student feature will be connected to the student profile module.");
    });
}

function updateStatistics() {
    const rows = getStudentRows();

    let activeCount = 0;
    let inactiveCount = 0;

    rows.forEach(row => {
        if (row.dataset.status === "Active") {
            activeCount++;
        }

        if (row.dataset.status === "Inactive") {
            inactiveCount++;
        }
    });

    document.getElementById("totalStudents").textContent = 1248 + rows.length - 5;
    document.getElementById("activeStudents").textContent = 1198 + activeCount - 4;
    document.getElementById("inactiveStudents").textContent = 50 + inactiveCount - 1;
}

document.querySelectorAll("#studentTableBody tr").forEach(row => {
    attachRowActions(row);
});

document.getElementById("exportButton").addEventListener("click", () => {
    const rows = getStudentRows();
    let csv = "Student Name,Student ID,Admission Number,Class,Section,Gender,Parent/Guardian,Status\n";

    rows.forEach(row => {
        if (row.style.display === "none") {
            return;
        }

        const name = row.querySelector(".student-info strong").textContent;
        const id = row.children[1].textContent;
        const admissionNumber = row.children[2].textContent;
        const studentClass = row.children[3].textContent;
        const section = row.children[4].textContent;
        const gender = row.children[5].textContent;
        const parent = row.children[6].textContent;
        const status = row.children[7].textContent.trim();

        csv += `"${name}","${id}","${admissionNumber}","${studentClass}","${section}","${gender}","${parent}","${status}"\n`;
    });

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "students.csv";
    link.click();

    URL.revokeObjectURL(url);
});

filterStudents();