const students = {
    STU001: {
        firstName: "Rahul",
        lastName: "Sharma",
        gender: "Male",
        dateOfBirth: "12 March 2010",
        studentId: "STU001",
        admissionNumber: "ADM-2026-001",
        className: "Grade 10",
        section: "A",
        rollNumber: "01",
        academicYear: "2026",
        parentName: "Rajesh Sharma",
        relationship: "Father",
        parentContact: "9800000000",
        parentEmail: "rajesh@example.com",
        status: "Active",
        attendance: {
            percentage: "96.2%",
            present: 145,
            absent: 4,
            late: 2,
            total: 151
        },
        results: [
            ["Mathematics", "92", "A+"],
            ["Science", "88", "A"],
            ["English", "85", "A"],
            ["Social Studies", "90", "A+"],
            ["Computer Science", "94", "A+"]
        ],
        remarks: [
            {
                title: "Excellent classroom participation",
                text: "Shows strong participation in classroom activities and demonstrates consistent academic effort.",
                date: "10 September 2026"
            },
            {
                title: "Strong academic progress",
                text: "Has shown noticeable improvement in Mathematics and Science during the current term.",
                date: "28 August 2026"
            }
        ],
        achievements: [
            {
                title: "Inter-School Quiz Competition",
                text: "Participated in the district-level inter-school quiz competition.",
                date: "August 2026"
            },
            {
                title: "School Football Team",
                text: "Selected as a member of the school football team.",
                date: "July 2026"
            }
        ],
        certificates: [
            {
                title: "Academic Excellence Certificate",
                text: "Certificate for outstanding academic performance.",
                date: "2026"
            }
        ],
        documents: [
            {
                title: "Birth Certificate",
                type: "PDF Document",
                size: "1.2 MB"
            },
            {
                title: "Previous Academic Record",
                type: "PDF Document",
                size: "850 KB"
            }
        ]
    },

    STU002: {
        firstName: "Anisha",
        lastName: "Shrestha",
        gender: "Female",
        dateOfBirth: "24 July 2011",
        studentId: "STU002",
        admissionNumber: "ADM-2026-002",
        className: "Grade 9",
        section: "B",
        rollNumber: "08",
        academicYear: "2026",
        parentName: "Suresh Shrestha",
        relationship: "Father",
        parentContact: "9811111111",
        parentEmail: "suresh@example.com",
        status: "Active",
        attendance: {
            percentage: "94.8%",
            present: 143,
            absent: 6,
            late: 2,
            total: 151
        },
        results: [
            ["Mathematics", "89", "A"],
            ["Science", "91", "A+"],
            ["English", "87", "A"],
            ["Social Studies", "84", "A"],
            ["Computer Science", "93", "A+"]
        ],
        remarks: [
            {
                title: "Very consistent student",
                text: "Maintains consistent academic performance and completes assigned work on time.",
                date: "8 September 2026"
            },
            {
                title: "Good communication skills",
                text: "Demonstrates confidence during presentations and classroom discussions.",
                date: "21 August 2026"
            }
        ],
        achievements: [
            {
                title: "Debate Competition",
                text: "Secured second position in the school-level debate competition.",
                date: "August 2026"
            }
        ],
        certificates: [
            {
                title: "Debate Competition Certificate",
                text: "Certificate for participation and achievement in debate competition.",
                date: "2026"
            }
        ],
        documents: [
            {
                title: "Birth Certificate",
                type: "PDF Document",
                size: "980 KB"
            }
        ]
    },

    STU003: {
        firstName: "Bijay",
        lastName: "Pradhan",
        gender: "Male",
        dateOfBirth: "5 January 2010",
        studentId: "STU003",
        admissionNumber: "ADM-2026-003",
        className: "Grade 10",
        section: "A",
        rollNumber: "12",
        academicYear: "2026",
        parentName: "Milan Pradhan",
        relationship: "Father",
        parentContact: "9822222222",
        parentEmail: "milan@example.com",
        status: "Active",
        attendance: {
            percentage: "91.5%",
            present: 138,
            absent: 10,
            late: 3,
            total: 151
        },
        results: [
            ["Mathematics", "82", "A"],
            ["Science", "85", "A"],
            ["English", "80", "A"],
            ["Social Studies", "78", "B+"],
            ["Computer Science", "89", "A"]
        ],
        remarks: [
            {
                title: "Improving academic performance",
                text: "Showing steady improvement and responding well to teacher guidance.",
                date: "5 September 2026"
            }
        ],
        achievements: [
            {
                title: "Science Exhibition",
                text: "Participated in the annual school science exhibition.",
                date: "July 2026"
            }
        ],
        certificates: [],
        documents: [
            {
                title: "Birth Certificate",
                type: "PDF Document",
                size: "1.1 MB"
            }
        ]
    },

    STU004: {
        firstName: "Sabina",
        lastName: "Magar",
        gender: "Female",
        dateOfBirth: "18 November 2011",
        studentId: "STU004",
        admissionNumber: "ADM-2026-004",
        className: "Grade 9",
        section: "A",
        rollNumber: "17",
        academicYear: "2026",
        parentName: "Kamala Magar",
        relationship: "Mother",
        parentContact: "9833333333",
        parentEmail: "kamala@example.com",
        status: "Active",
        attendance: {
            percentage: "97.1%",
            present: 147,
            absent: 3,
            late: 1,
            total: 151
        },
        results: [
            ["Mathematics", "95", "A+"],
            ["Science", "93", "A+"],
            ["English", "90", "A+"],
            ["Social Studies", "92", "A+"],
            ["Computer Science", "96", "A+"]
        ],
        remarks: [
            {
                title: "Outstanding performance",
                text: "Consistently performs at a high level and demonstrates excellent discipline.",
                date: "9 September 2026"
            }
        ],
        achievements: [
            {
                title: "Art Competition Winner",
                text: "Won first position in the school-level art competition.",
                date: "August 2026"
            }
        ],
        certificates: [
            {
                title: "Art Competition Certificate",
                text: "First position certificate from the annual art competition.",
                date: "2026"
            },
            {
                title: "Academic Excellence Certificate",
                text: "Certificate for outstanding academic performance.",
                date: "2026"
            }
        ],
        documents: [
            {
                title: "Birth Certificate",
                type: "PDF Document",
                size: "900 KB"
            },
            {
                title: "Previous Academic Record",
                type: "PDF Document",
                size: "760 KB"
            }
        ]
    },

    STU005: {
        firstName: "Arjun",
        lastName: "Singh",
        gender: "Male",
        dateOfBirth: "30 September 2010",
        studentId: "STU005",
        admissionNumber: "ADM-2026-005",
        className: "Grade 10",
        section: "B",
        rollNumber: "05",
        academicYear: "2026",
        parentName: "Ramesh Singh",
        relationship: "Father",
        parentContact: "9844444444",
        parentEmail: "ramesh@example.com",
        status: "Inactive",
        attendance: {
            percentage: "78.4%",
            present: 118,
            absent: 29,
            late: 4,
            total: 151
        },
        results: [
            ["Mathematics", "72", "B+"],
            ["Science", "75", "B+"],
            ["English", "79", "B+"],
            ["Social Studies", "81", "A"],
            ["Computer Science", "86", "A"]
        ],
        remarks: [
            {
                title: "Attendance needs attention",
                text: "Student should maintain regular attendance to ensure continuity in academic progress.",
                date: "3 September 2026"
            }
        ],
        achievements: [],
        certificates: [],
        documents: [
            {
                title: "Birth Certificate",
                type: "PDF Document",
                size: "1 MB"
            }
        ]
    }
};

const params = new URLSearchParams(window.location.search);
const studentIdFromUrl = params.get("id") || "STU001";
const student = students[studentIdFromUrl] || students.STU001;

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const backButton = document.getElementById("backButton");
const editButton = document.getElementById("editButton");

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

document.querySelectorAll(".sidebar-nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});

backButton.addEventListener("click", () => {
    window.location.href = "students.html";
});

editButton.addEventListener("click", () => {
    alert(`Edit student: ${student.firstName} ${student.lastName}`);
});

function getInitials(firstName, lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function renderStudent() {
    const fullName = `${student.firstName} ${student.lastName}`;
    const initials = getInitials(student.firstName, student.lastName);

    document.title = `${fullName} | Student Profile`;

    setText("studentName", fullName);
    setText("breadcrumbName", fullName);
    setText("studentMeta", `${student.studentId} · ${student.className} · Section ${student.section}`);
    setText("studentAcademicYear", `Academic Year ${student.academicYear}`);
    setText("studentAvatar", initials);

    setText("firstName", student.firstName);
    setText("lastName", student.lastName);
    setText("gender", student.gender);
    setText("dateOfBirth", student.dateOfBirth);

    setText("studentId", student.studentId);
    setText("admissionNumber", student.admissionNumber);
    setText("studentClass", student.className);
    setText("studentSection", student.section);
    setText("rollNumber", student.rollNumber);
    setText("academicYear", student.academicYear);

    setText("parentName", student.parentName);
    setText("relationship", student.relationship);
    setText("parentContact", student.parentContact);
    setText("parentEmail", student.parentEmail);
    setText("guardianAvatar", getInitials(student.parentName, ""));

    setText("studentStatus", student.status);
    document.getElementById("studentStatus").className = `status-badge ${student.status.toLowerCase()}`;

    setText("attendancePercentage", student.attendance.percentage);
    setText("presentDays", student.attendance.present);
    setText("absentDays", student.attendance.absent);
    setText("lateDays", student.attendance.late);
    setText("totalDays", student.attendance.total);

    document.getElementById("attendanceBar").style.width = student.attendance.percentage;
}

function renderResults() {
    const table = document.getElementById("resultsTable");

    table.innerHTML = student.results.map(result => `
        <tr>
            <td>${result[0]}</td>
            <td>${result[1]}</td>
            <td><span class="grade">${result[2]}</span></td>
        </tr>
    `).join("");
}

function renderRemarks() {
    const container = document.getElementById("remarksList");

    if (!student.remarks.length) {
        container.innerHTML = "<p>No teacher remarks available.</p>";
        return;
    }

    container.innerHTML = student.remarks.map(remark => `
        <div class="remark-item">
            <strong>${remark.title}</strong>
            <p>${remark.text}</p>
            <span class="remark-date">${remark.date}</span>
        </div>
    `).join("");
}

function renderAchievements() {
    const container = document.getElementById("achievementList");

    if (!student.achievements.length) {
        container.innerHTML = "<p>No achievements or ECA records available.</p>";
        return;
    }

    container.innerHTML = student.achievements.map(item => `
        <div class="achievement-item">
            <strong>${item.title}</strong>
            <p>${item.text}</p>
            <span class="remark-date">${item.date}</span>
        </div>
    `).join("");
}

function renderCertificates() {
    const container = document.getElementById("certificateList");

    if (!student.certificates.length) {
        container.innerHTML = "<p>No certificates available.</p>";
        return;
    }

    container.innerHTML = student.certificates.map(item => `
        <div class="document-item">
            <div class="document-info">
                <div class="document-icon">▤</div>
                <div class="document-meta">
                    <strong>${item.title}</strong>
                    <span>${item.text} · ${item.date}</span>
                </div>
            </div>

            <span class="document-action">View</span>
        </div>
    `).join("");
}

function renderDocuments() {
    const container = document.getElementById("documentList");

    if (!student.documents.length) {
        container.innerHTML = "<p>No documents available.</p>";
        return;
    }

    container.innerHTML = student.documents.map(document => `
        <div class="document-item">
            <div class="document-info">
                <div class="document-icon">PDF</div>
                <div class="document-meta">
                    <strong>${document.title}</strong>
                    <span>${document.type} · ${document.size}</span>
                </div>
            </div>

            <span class="document-action">View</span>
        </div>
    `).join("");
}

renderStudent();
renderResults();
renderRemarks();
renderAchievements();
renderCertificates();
renderDocuments();