const parents = [
    {
        id: "PAR001",
        firstName: "Rajesh",
        lastName: "Sharma",
        relationship: "Father",
        phone: "9800000000",
        email: "rajesh@example.com",
        username: "rajesh.sharma",
        verification: "Verified",
        status: "Active",
        emergencyName: "Sita Sharma",
        emergencyNumber: "9812345678",
        children: [
            {
                name: "Rahul Sharma",
                id: "STU001",
                className: "Grade 10",
                section: "A"
            }
        ]
    },
    {
        id: "PAR002",
        firstName: "Sita",
        lastName: "Sharma",
        relationship: "Mother",
        phone: "9812345678",
        email: "sita@example.com",
        username: "sita.sharma",
        verification: "Verified",
        status: "Active",
        emergencyName: "Rajesh Sharma",
        emergencyNumber: "9800000000",
        children: [
            {
                name: "Rahul Sharma",
                id: "STU001",
                className: "Grade 10",
                section: "A"
            },
            {
                name: "Anisha Sharma",
                id: "STU006",
                className: "Grade 6",
                section: "B"
            }
        ]
    },
    {
        id: "PAR003",
        firstName: "Suresh",
        lastName: "Shrestha",
        relationship: "Father",
        phone: "9822222222",
        email: "suresh@example.com",
        username: "suresh.shrestha",
        verification: "Verified",
        status: "Active",
        emergencyName: "Mina Shrestha",
        emergencyNumber: "9833333333",
        children: [
            {
                name: "Anisha Shrestha",
                id: "STU002",
                className: "Grade 9",
                section: "B"
            }
        ]
    },
    {
        id: "PAR004",
        firstName: "Kamala",
        lastName: "Magar",
        relationship: "Mother",
        phone: "9833333333",
        email: "kamala@example.com",
        username: "kamala.magar",
        verification: "Verified",
        status: "Active",
        emergencyName: "Dinesh Magar",
        emergencyNumber: "9844444444",
        children: [
            {
                name: "Sabina Magar",
                id: "STU004",
                className: "Grade 9",
                section: "A"
            }
        ]
    },
    {
        id: "PAR005",
        firstName: "Ramesh",
        lastName: "Singh",
        relationship: "Father",
        phone: "9844444444",
        email: "ramesh@example.com",
        username: "ramesh.singh",
        verification: "Pending",
        status: "Active",
        emergencyName: "Sunita Singh",
        emergencyNumber: "9855555555",
        children: [
            {
                name: "Arjun Singh",
                id: "STU005",
                className: "Grade 10",
                section: "B"
            }
        ]
    },
    {
        id: "PAR006",
        firstName: "Mina",
        lastName: "Gurung",
        relationship: "Guardian",
        phone: "9866666666",
        email: "mina@example.com",
        username: "mina.gurung",
        verification: "Pending",
        status: "Disabled",
        emergencyName: "Hari Gurung",
        emergencyNumber: "9877777777",
        children: [
            {
                name: "Prakash Gurung",
                id: "STU007",
                className: "Grade 8",
                section: "A"
            }
        ]
    }
];

let selectedParent = null;

const parentTableBody = document.getElementById("parentTableBody");
const parentSearch = document.getElementById("parentSearch");
const topSearch = document.getElementById("topSearch");
const relationshipFilter = document.getElementById("relationshipFilter");
const verificationFilter = document.getElementById("verificationFilter");
const statusFilter = document.getElementById("statusFilter");
const emptyState = document.getElementById("emptyState");

const parentModal = document.getElementById("parentModal");
const profileModal = document.getElementById("profileModal");

const addParentButton = document.getElementById("addParentButton");
const closeParentModal = document.getElementById("closeParentModal");
const cancelParent = document.getElementById("cancelParent");
const closeProfileModal = document.getElementById("closeProfileModal");

const parentForm = document.getElementById("parentForm");

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const profileName = document.getElementById("profileName");
const profileAvatar = document.getElementById("profileAvatar");
const profileRelationship = document.getElementById("profileRelationship");
const profileVerification = document.getElementById("profileVerification");
const profileStatus = document.getElementById("profileStatus");
const profilePhone = document.getElementById("profilePhone");
const profileEmail = document.getElementById("profileEmail");
const profileUsername = document.getElementById("profileUsername");
const profileEmergency = document.getElementById("profileEmergency");
const childrenList = document.getElementById("childrenList");

const resetAccessButton = document.getElementById("resetAccessButton");
const toggleAccountButton = document.getElementById("toggleAccountButton");
const linkChildButton = document.getElementById("linkChildButton");

function getInitials(firstName, lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function renderParents(data = parents) {
    parentTableBody.innerHTML = "";

    if (!data.length) {
        emptyState.classList.add("show");
        return;
    }

    emptyState.classList.remove("show");

    data.forEach(parent => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="parent-info">
                    <div class="parent-avatar">${getInitials(parent.firstName, parent.lastName)}</div>
                    <div>
                        <strong>${parent.firstName} ${parent.lastName}</strong>
                        <span>${parent.email || "No email address"}</span>
                    </div>
                </div>
            </td>

            <td>${parent.relationship}</td>

            <td>${parent.phone}</td>

            <td>
                <span class="children-count">
                    ${parent.children.length} ${parent.children.length === 1 ? "Child" : "Children"}
                </span>
            </td>

            <td>
                <span class="status-badge ${parent.verification.toLowerCase()}">
                    ${parent.verification}
                </span>
            </td>

            <td>
                <span class="status-badge ${parent.status.toLowerCase()}">
                    ${parent.status}
                </span>
            </td>

            <td>
                <div class="action-buttons">
                    <button class="action-button view-button" data-id="${parent.id}">
                        View
                    </button>
                    <button class="action-button link-button" data-id="${parent.id}">
                        Link Child
                    </button>
                </div>
            </td>
        `;

        parentTableBody.appendChild(row);
    });

    document.querySelectorAll(".view-button").forEach(button => {
        button.addEventListener("click", () => {
            openProfile(button.dataset.id);
        });
    });

    document.querySelectorAll(".link-button").forEach(button => {
        button.addEventListener("click", () => {
            linkChild(button.dataset.id);
        });
    });
}

function filterParents() {
    const searchValue = parentSearch.value.toLowerCase().trim();
    const relationshipValue = relationshipFilter.value;
    const verificationValue = verificationFilter.value;
    const statusValue = statusFilter.value;

    const filtered = parents.filter(parent => {
        const fullName = `${parent.firstName} ${parent.lastName}`.toLowerCase();

        const matchesSearch =
            fullName.includes(searchValue) ||
            parent.phone.toLowerCase().includes(searchValue) ||
            parent.email.toLowerCase().includes(searchValue) ||
            parent.username.toLowerCase().includes(searchValue) ||
            parent.children.some(child =>
                child.name.toLowerCase().includes(searchValue)
            );

        const matchesRelationship =
            !relationshipValue || parent.relationship === relationshipValue;

        const matchesVerification =
            !verificationValue || parent.verification === verificationValue;

        const matchesStatus =
            !statusValue || parent.status === statusValue;

        return (
            matchesSearch &&
            matchesRelationship &&
            matchesVerification &&
            matchesStatus
        );
    });

    renderParents(filtered);
}

function syncSearch(source, target) {
    target.value = source.value;
    filterParents();
}

parentSearch.addEventListener("input", () => {
    syncSearch(parentSearch, topSearch);
});

topSearch.addEventListener("input", () => {
    syncSearch(topSearch, parentSearch);
});

relationshipFilter.addEventListener("change", filterParents);
verificationFilter.addEventListener("change", filterParents);
statusFilter.addEventListener("change", filterParents);

function openModal(modal) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeModal(modal) {
    modal.classList.remove("show");

    if (!parentModal.classList.contains("show") && !profileModal.classList.contains("show")) {
        document.body.style.overflow = "";
    }
}

addParentButton.addEventListener("click", () => {
    parentForm.reset();
    openModal(parentModal);
});

closeParentModal.addEventListener("click", () => {
    closeModal(parentModal);
});

cancelParent.addEventListener("click", () => {
    closeModal(parentModal);
});

closeProfileModal.addEventListener("click", () => {
    closeModal(profileModal);
});

parentModal.addEventListener("click", event => {
    if (event.target === parentModal) {
        closeModal(parentModal);
    }
});

profileModal.addEventListener("click", event => {
    if (event.target === profileModal) {
        closeModal(profileModal);
    }
});

parentForm.addEventListener("submit", event => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const relationship = document.getElementById("relationship").value;
    const phone = document.getElementById("contactNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const status = document.getElementById("accountStatus").value;
    const emergencyName = document.getElementById("emergencyName").value.trim();
    const emergencyNumber = document.getElementById("emergencyNumber").value.trim();

    const newParent = {
        id: `PAR${String(parents.length + 1).padStart(3, "0")}`,
        firstName,
        lastName,
        relationship,
        phone,
        email,
        username,
        verification: "Pending",
        status,
        emergencyName,
        emergencyNumber,
        children: []
    };

    parents.unshift(newParent);

    closeModal(parentModal);
    renderParents();
    updateStatistics();

    alert(`${firstName} ${lastName} has been added successfully.`);
});

function openProfile(parentId) {
    selectedParent = parents.find(parent => parent.id === parentId);

    if (!selectedParent) {
        return;
    }

    const fullName = `${selectedParent.firstName} ${selectedParent.lastName}`;

    profileName.textContent = fullName;
    profileAvatar.textContent = getInitials(
        selectedParent.firstName,
        selectedParent.lastName
    );

    profileRelationship.textContent = selectedParent.relationship;

    profileVerification.textContent = selectedParent.verification;
    profileVerification.className = `status-badge ${selectedParent.verification.toLowerCase()}`;

    profileStatus.textContent = selectedParent.status;
    profileStatus.className = `status-badge ${selectedParent.status.toLowerCase()}`;

    profilePhone.textContent = selectedParent.phone;
    profileEmail.textContent = selectedParent.email || "No email address";
    profileUsername.textContent = selectedParent.username;

    profileEmergency.textContent =
        selectedParent.emergencyName && selectedParent.emergencyNumber
            ? `${selectedParent.emergencyName} · ${selectedParent.emergencyNumber}`
            : "Not provided";

    renderChildren();

    toggleAccountButton.textContent =
        selectedParent.status === "Active"
            ? "Disable Account"
            : "Enable Account";

    openModal(profileModal);
}

function renderChildren() {
    childrenList.innerHTML = "";

    if (!selectedParent.children.length) {
        childrenList.innerHTML = `
            <div class="child-item">
                <div class="child-info">
                    <div class="child-avatar">+</div>
                    <div>
                        <strong>No linked children</strong>
                        <span>Link a student to this parent account.</span>
                    </div>
                </div>
            </div>
        `;

        return;
    }

    selectedParent.children.forEach(child => {
        const item = document.createElement("div");
        item.className = "child-item";

        item.innerHTML = `
            <div class="child-info">
                <div class="child-avatar">${getInitials(child.name.split(" ")[0], child.name.split(" ").slice(1).join(" "))}</div>
                <div>
                    <strong>${child.name}</strong>
                    <span>${child.id} · ${child.className} · Section ${child.section}</span>
                </div>
            </div>

            <button class="child-action" data-student="${child.id}">
                View Student
            </button>
        `;

        childrenList.appendChild(item);
    });

    document.querySelectorAll(".child-action").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = `student-profile.html?id=${encodeURIComponent(button.dataset.student)}`;
        });
    });
}

function linkChild(parentId) {
    const parent = parents.find(item => item.id === parentId);

    if (!parent) {
        return;
    }

    const studentName = prompt("Enter the student name to link:");

    if (!studentName) {
        return;
    }

    const studentId = prompt("Enter the student ID:");

    if (!studentId) {
        return;
    }

    const className = prompt("Enter the student's class:");

    if (!className) {
        return;
    }

    const section = prompt("Enter the student's section:");

    if (!section) {
        return;
    }

    parent.children.push({
        name: studentName.trim(),
        id: studentId.trim(),
        className: className.trim(),
        section: section.trim()
    });

    renderParents();
    updateStatistics();

    if (selectedParent && selectedParent.id === parent.id) {
        renderChildren();
    }

    alert(`${studentName} has been linked successfully.`);
}

linkChildButton.addEventListener("click", () => {
    if (!selectedParent) {
        return;
    }

    linkChild(selectedParent.id);
});

resetAccessButton.addEventListener("click", () => {
    if (!selectedParent) {
        return;
    }

    const confirmed = confirm(
        `Reset account access for ${selectedParent.firstName} ${selectedParent.lastName}?`
    );

    if (!confirmed) {
        return;
    }

    alert(`Access reset instructions have been generated for ${selectedParent.firstName} ${selectedParent.lastName}.`);
});

toggleAccountButton.addEventListener("click", () => {
    if (!selectedParent) {
        return;
    }

    if (selectedParent.status === "Active") {
        const confirmed = confirm(
            `Disable the account for ${selectedParent.firstName} ${selectedParent.lastName}?`
        );

        if (!confirmed) {
            return;
        }

        selectedParent.status = "Disabled";
    } else {
        selectedParent.status = "Active";
    }

    profileStatus.textContent = selectedParent.status;
    profileStatus.className = `status-badge ${selectedParent.status.toLowerCase()}`;

    toggleAccountButton.textContent =
        selectedParent.status === "Active"
            ? "Disable Account"
            : "Enable Account";

    renderParents();
    updateStatistics();
});

function updateStatistics() {
    const total = parents.length;
    const verified = parents.filter(parent => parent.verification === "Verified").length;
    const active = parents.filter(parent => parent.status === "Active").length;

    document.getElementById("totalParents").textContent = 280 + total;
    document.getElementById("verifiedParents").textContent = 266 + verified;
    document.getElementById("activeParents").textContent = 272 + active;
}

document.getElementById("exportButton").addEventListener("click", () => {
    const headers = [
        "Parent ID",
        "Parent Name",
        "Relationship",
        "Phone",
        "Email",
        "Username",
        "Children",
        "Verification",
        "Account Status"
    ];

    const rows = parents.map(parent => [
        parent.id,
        `${parent.firstName} ${parent.lastName}`,
        parent.relationship,
        parent.phone,
        parent.email,
        parent.username,
        parent.children.map(child => child.name).join("; "),
        parent.verification,
        parent.status
    ]);

    const csv = [
        headers,
        ...rows
    ]
        .map(row =>
            row
                .map(value => `"${String(value).replace(/"/g, '""')}"`)
                .join(",")
        )
        .join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "parent-records.csv";
    link.click();

    URL.revokeObjectURL(url);
});

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

document.querySelectorAll(".sidebar-nav a, .sidebar-bottom a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});

renderParents();
updateStatistics();