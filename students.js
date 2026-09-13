const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const studentModal = document.getElementById("studentModal");
const viewModal = document.getElementById("viewModal");

const addStudentButton = document.getElementById("addStudentButton");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const closeViewModal = document.getElementById("closeViewModal");
const closeViewButton = document.getElementById("closeViewButton");
const editFromViewButton = document.getElementById("editFromViewButton");

const studentForm = document.getElementById("studentForm");
const studentsTableBody = document.getElementById("studentsTableBody");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const topSearch = document.getElementById("topSearch");
const classFilter = document.getElementById("classFilter");
const sectionFilter = document.getElementById("sectionFilter");
const genderFilter = document.getElementById("genderFilter");
const statusFilter = document.getElementById("statusFilter");

const students = [
    {
        id: 1,
        name: "Rahul Sharma",
        studentId: "STU-00124",
        admissionNumber: "ADM-2026-001",
        dateOfBirth: "2014-05-12",
        gender: "Male",
        bloodGroup: "A+",
        academicYear: "2083 BS",
        className: "Grade 5",
        section: "A",
        rollNumber: "12",
        status: "Active",
        previousSchool: "Little Stars School",
        parentName: "Maya Sharma",
        relationship: "Mother",
        parentPhone: "9811234567",
        parentEmail: "maya@example.com",
        address: "Bhadrapur, Jhapa",
        attendance: "96%",
        result: "A",
        achievementsCount: "3",
        remarks: "Consistent academic performance and active classroom participation.",
        achievements: "Football, Quiz Competition, Science Exhibition"
    },
    {
        id: 2,
        name: "Anisha Shrestha",
        studentId: "STU-00125",
        admissionNumber: "ADM-2026-002",
        dateOfBirth: "2013-09-21",
        gender: "Female",
        bloodGroup: "B+",
        academicYear: "2083 BS",
        className: "Grade 6",
        section: "A",
        rollNumber: "8",
        status: "Active",
        previousSchool: "Green Valley School",
        parentName: "Prakash Shrestha",
        relationship: "Father",
        parentPhone: "9821234567",
        parentEmail: "prakash@example.com",
        address: "Damak, Jhapa",
        attendance: "94%",
        result: "A+",
        achievementsCount: "5",
        remarks: "Excellent student with strong communication skills.",
        achievements: "Debate, Art Competition, Singing, Quiz, ECA"
    },
    {
        id: 3,
        name: "Bijay Pradhan",
        studentId: "STU-00126",
        admissionNumber: "ADM-2026-003",
        dateOfBirth: "2012-11-03",
        gender: "Male",
        bloodGroup: "O+",
        academicYear: "2083 BS",
        className: "Grade 8",
        section: "B",
        rollNumber: "17",
        status: "Active",
        previousSchool: "Mount Everest School",
        parentName: "Dipak Pradhan",
        relationship: "Father",
        parentPhone: "9831234567",
        parentEmail: "dipak@example.com",
        address: "Mechinagar, Jhapa",
        attendance: "91%",
        result: "B+",
        achievementsCount: "2",
        remarks: "Good classroom performance. Encouraged to participate more in activities.",
        achievements: "Basketball, Science Club"
    },
    {
        id: 4,
        name: "Sabina Magar",
        studentId: "STU-00127",
        admissionNumber: "ADM-2026-004",
        dateOfBirth: "2011-07-18",
        gender: "Female",
        bloodGroup: "O+",
        academicYear: "2083 BS",
        className: "Grade 10",
        section: "A",
        rollNumber: "4",
        status: "Active",
        previousSchool: "Sunrise Academy",
        parentName: "Rita Magar",
        relationship: "Mother",
        parentPhone: "9841234567",
        parentEmail: "rita@example.com",
        address: "Birtamode, Jhapa",
        attendance: "98%",
        result: "A+",
        achievementsCount: "6",
        remarks: "Excellent academic results and leadership qualities.",
        achievements: "Student Council, Debate, Volleyball, Quiz, Music, ECA"
    },
    {
        id: 5,
        name: "Arjun Singh",
        studentId: "STU-00128",
        admissionNumber: "ADM-2026-005",
        dateOfBirth: "2014-02-14",
        gender: "Male",
        bloodGroup: "AB+",
        academicYear: "2083 BS",
        className: "Grade 5",
        section: "B",
        rollNumber: "21",
        status: "Inactive",
        previousSchool: "Himalayan School",
        parentName: "Rajan Singh",
        relationship: "Father",
        parentPhone: "9851234567",
        parentEmail: "rajan@example.com",
        address: "Kakarvitta, Jhapa",
        attendance: "82%",
        result: "B",
        achievementsCount: "1",
        remarks: "Student record currently inactive.",
        achievements: "Football"
    }
];

let editingStudentId = null;
let selectedStudentId = null;

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

function updateStats() {
    const active = students.filter(student => student.status === "Active").length;
    const inactive = students.filter(student => student.status === "Inactive").length;

    document.getElementById("totalStudents").textContent =
        (1248 - 5 + students.length).toLocaleString();

    document.getElementById("activeStudents").textContent =
        (1198 - 5 + active).toLocaleString();

    document.getElementById("inactiveStudents").textContent =
        (50 - 1 + inactive).toLocaleString();

    document.getElementById("newAdmissions").textContent = "38";
}

function renderStudents() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredStudents = students.filter(student => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm) ||
            student.studentId.toLowerCase().includes(searchTerm) ||
            student.admissionNumber.toLowerCase().includes(searchTerm);

        const matchesClass =
            classFilter.value === "all" ||
            student.className === classFilter.value;

        const matchesSection =
            sectionFilter.value === "all" ||
            student.section === sectionFilter.value;

        const matchesGender =
            genderFilter.value === "all" ||
            student.gender === genderFilter.value;

        const matchesStatus =
            statusFilter.value === "all" ||
            student.status === statusFilter.value;

        return (
            matchesSearch &&
            matchesClass &&
            matchesSection &&
            matchesGender &&
            matchesStatus
        );
    });

    studentsTableBody.innerHTML = "";

    filteredStudents.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="student-cell">
                    <div class="student-avatar">${getInitials(student.name)}</div>
                    <div>
                        <div class="student-name">${student.name}</div>
                        <div class="student-phone">${student.parentPhone || "No parent phone"}</div>
                    </div>
                </div>
            </td>
            <td>${student.studentId}</td>
            <td>${student.admissionNumber}</td>
            <td>${student.className}</td>
            <td>${student.section}</td>
            <td>${student.gender}</td>
            <td>${student.parentName}</td>
            <td>
                <span class="status-badge ${student.status === "Active" ? "status-active" : "status-inactive"}">
                    ${student.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="table-action" data-action="view" data-id="${student.id}">View</button>
                    <button class="table-action" data-action="edit" data-id="${student.id}">Edit</button>
                    <button class="table-action" data-action="delete" data-id="${student.id}">Delete</button>
                </div>
            </td>
        `;

        studentsTableBody.appendChild(row);
    });

    emptyState.classList.toggle("show", filteredStudents.length === 0);

    updateStats();
}

function resetForm() {
    studentForm.reset();
    editingStudentId = null;
    document.getElementById("modalTitle").textContent = "Add Student";
}

function openAddModal() {
    resetForm();
    studentModal.classList.add("show");
}

function closeStudentModal() {
    studentModal.classList.remove("show");
}

function saveStudent(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("studentName").value.trim(),
        studentId: document.getElementById("studentId").value.trim(),
        admissionNumber: document.getElementById("admissionNumber").value.trim(),
        dateOfBirth: document.getElementById("dateOfBirth").value,
        gender: document.getElementById("gender").value,
        bloodGroup: document.getElementById("bloodGroup").value,
        academicYear: document.getElementById("academicYear").value + " BS",
        className: document.getElementById("className").value,
        section: document.getElementById("section").value,
        rollNumber: document.getElementById("rollNumber").value.trim(),
        status: document.getElementById("studentStatus").value,
        previousSchool: document.getElementById("previousSchool").value.trim(),
        parentName: document.getElementById("parentName").value.trim(),
        relationship: document.getElementById("relationship").value,
        parentPhone: document.getElementById("parentPhone").value.trim(),
        parentEmail: document.getElementById("parentEmail").value.trim(),
        address: document.getElementById("address").value.trim(),
        remarks: document.getElementById("remarks").value.trim() || "No remarks recorded.",
        achievements: document.getElementById("achievements").value.trim() || "No achievements recorded.",
        attendance: "100%",
        result: "Pending",
        achievementsCount: "0"
    };

    if (editingStudentId) {
        const student = students.find(item => item.id === editingStudentId);

        if (student) {
            Object.assign(student, formData);
        }
    } else {
        const studentIdExists = students.some(
            student => student.studentId.toLowerCase() === formData.studentId.toLowerCase()
        );

        const admissionExists = students.some(
            student => student.admissionNumber.toLowerCase() === formData.admissionNumber.toLowerCase()
        );

        if (studentIdExists) {
            alert("This Student ID already exists.");
            return;
        }

        if (admissionExists) {
            alert("This Admission Number already exists.");
            return;
        }

        students.push({
            id: Date.now(),
            ...formData
        });
    }

    closeStudentModal();
    renderStudents();
}

function editStudent(id) {
    const student = students.find(item => item.id === id);

    if (!student) {
        return;
    }

    editingStudentId = id;

    document.getElementById("modalTitle").textContent = "Edit Student";
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("admissionNumber").value = student.admissionNumber;
    document.getElementById("dateOfBirth").value = student.dateOfBirth || "";
    document.getElementById("gender").value = student.gender;
    document.getElementById("bloodGroup").value = student.bloodGroup || "";
    document.getElementById("academicYear").value = student.academicYear.replace(" BS", "");
    document.getElementById("className").value = student.className;
    document.getElementById("section").value = student.section;
    document.getElementById("rollNumber").value = student.rollNumber || "";
    document.getElementById("studentStatus").value = student.status;
    document.getElementById("previousSchool").value = student.previousSchool || "";
    document.getElementById("parentName").value = student.parentName;
    document.getElementById("relationship").value = student.relationship || "";
    document.getElementById("parentPhone").value = student.parentPhone || "";
    document.getElementById("parentEmail").value = student.parentEmail || "";
    document.getElementById("address").value = student.address || "";
    document.getElementById("remarks").value = student.remarks || "";
    document.getElementById("achievements").value = student.achievements || "";

    studentModal.classList.add("show");
}

function openViewModal(id) {
    const student = students.find(item => item.id === id);

    if (!student) {
        return;
    }

    selectedStudentId = id;

    document.getElementById("viewAvatar").textContent = getInitials(student.name);
    document.getElementById("viewName").textContent = student.name;
    document.getElementById("viewStudentId").textContent =
        `${student.studentId} • ${student.className} - ${student.section}`;

    const statusElement = document.getElementById("viewStatus");

    statusElement.textContent = student.status;
    statusElement.className =
        `status-badge ${student.status === "Active" ? "status-active" : "status-inactive"}`;

    document.getElementById("viewDob").textContent =
        student.dateOfBirth || "Not provided";

    document.getElementById("viewGender").textContent =
        student.gender || "Not provided";

    document.getElementById("viewBloodGroup").textContent =
        student.bloodGroup || "Not provided";

    document.getElementById("viewAdmission").textContent =
        student.admissionNumber;

    document.getElementById("viewAcademicYear").textContent =
        student.academicYear;

    document.getElementById("viewClass").textContent =
        student.className;

    document.getElementById("viewSection").textContent =
        student.section;

    document.getElementById("viewRoll").textContent =
        student.rollNumber || "Not assigned";

    document.getElementById("viewParent").textContent =
        student.parentName || "Not provided";

    document.getElementById("viewRelationship").textContent =
        student.relationship || "Not provided";

    document.getElementById("viewParentPhone").textContent =
        student.parentPhone || "Not provided";

    document.getElementById("viewParentEmail").textContent =
        student.parentEmail || "Not provided";

    document.getElementById("viewAddress").textContent =
        student.address || "Not provided";

    document.getElementById("viewAttendance").textContent =
        student.attendance || "Not available";

    document.getElementById("viewResult").textContent =
        student.result || "Pending";

    document.getElementById("viewAchievementCount").textContent =
        student.achievementsCount || "0";

    document.getElementById("viewRemarks").textContent =
        student.remarks || "No remarks recorded.";

    document.getElementById("viewAchievements").textContent =
        student.achievements || "No achievements recorded.";

    viewModal.classList.add("show");
}

function deleteStudent(id) {
    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return;
    }

    const student = students[index];

    if (confirm(`Delete the record for ${student.name}?`)) {
        students.splice(index, 1);
        renderStudents();
    }
}

function exportCSV() {
    const headers = [
        "Student Name",
        "Student ID",
        "Admission Number",
        "Date of Birth",
        "Gender",
        "Blood Group",
        "Academic Year",
        "Class",
        "Section",
        "Roll Number",
        "Status",
        "Parent / Guardian",
        "Relationship",
        "Parent Phone",
        "Parent Email",
        "Address",
        "Teacher Remarks",
        "Achievements / ECA"
    ];

    const rows = students.map(student => [
        student.name,
        student.studentId,
        student.admissionNumber,
        student.dateOfBirth,
        student.gender,
        student.bloodGroup,
        student.academicYear,
        student.className,
        student.section,
        student.rollNumber,
        student.status,
        student.parentName,
        student.relationship,
        student.parentPhone,
        student.parentEmail,
        student.address,
        student.remarks,
        student.achievements
    ]);

    const csv = [
        headers,
        ...rows
    ]
        .map(row =>
            row
                .map(value => `"${String(value || "").replace(/"/g, '""')}"`)
                .join(",")
        )
        .join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student-records.csv";
    link.click();

    URL.revokeObjectURL(url);
}

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

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});

addStudentButton.addEventListener("click", openAddModal);

closeModal.addEventListener("click", closeStudentModal);
cancelModal.addEventListener("click", closeStudentModal);

closeViewModal.addEventListener("click", () => {
    viewModal.classList.remove("show");
});

closeViewButton.addEventListener("click", () => {
    viewModal.classList.remove("show");
});

editFromViewButton.addEventListener("click", () => {
    if (!selectedStudentId) {
        return;
    }

    viewModal.classList.remove("show");
    editStudent(selectedStudentId);
});

studentForm.addEventListener("submit", saveStudent);

searchInput.addEventListener("input", renderStudents);
classFilter.addEventListener("change", renderStudents);
sectionFilter.addEventListener("change", renderStudents);
genderFilter.addEventListener("change", renderStudents);
statusFilter.addEventListener("change", renderStudents);

topSearch.addEventListener("input", () => {
    searchInput.value = topSearch.value;
    renderStudents();
});

studentsTableBody.addEventListener("click", event => {
    const button = event.target.closest(".table-action");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "view") {
        openViewModal(id);
    }

    if (action === "edit") {
        editStudent(id);
    }

    if (action === "delete") {
        deleteStudent(id);
    }
});

document.getElementById("exportButton").addEventListener("click", exportCSV);

window.addEventListener("click", event => {
    if (event.target === studentModal) {
        closeStudentModal();
    }

    if (event.target === viewModal) {
        viewModal.classList.remove("show");
    }
});

renderStudents();