const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const userModal = document.getElementById("userModal");
const viewModal = document.getElementById("viewModal");

const addUserButton = document.getElementById("addUserButton");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const closeViewModal = document.getElementById("closeViewModal");
const closeViewButton = document.getElementById("closeViewButton");

const userForm = document.getElementById("userForm");
const usersTableBody = document.getElementById("usersTableBody");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const topSearch = document.getElementById("topSearch");
const accountTypeFilter = document.getElementById("accountTypeFilter");
const statusFilter = document.getElementById("statusFilter");

const accountType = document.getElementById("accountType");
const role = document.getElementById("role");

const users = [
    {
        id: 1,
        name: "Ramesh Karki",
        username: "ramesh.karki",
        phone: "9841234567",
        accountType: "Teacher",
        role: "Class Teacher",
        department: "Mathematics",
        classAssignment: "Grade 8",
        section: "A",
        subject: "Mathematics",
        parentStudent: "",
        status: "Active",
        lastLogin: "Today, 09:42 AM"
    },
    {
        id: 2,
        name: "Sita Thapa",
        username: "sita.thapa",
        phone: "9851234567",
        accountType: "Teacher",
        role: "Subject Teacher",
        department: "Science",
        classAssignment: "Grade 7",
        section: "B",
        subject: "Science",
        parentStudent: "",
        status: "Active",
        lastLogin: "Today, 08:55 AM"
    },
    {
        id: 3,
        name: "Anu Shrestha",
        username: "anu.shrestha",
        phone: "9861234567",
        accountType: "Teacher",
        role: "Subject Teacher",
        department: "English",
        classAssignment: "Grade 6",
        section: "A",
        subject: "English",
        parentStudent: "",
        status: "Active",
        lastLogin: "Yesterday, 04:18 PM"
    },
    {
        id: 4,
        name: "Sagar Adhikari",
        username: "sagar.adhikari",
        phone: "9871234567",
        accountType: "Teacher",
        role: "Subject Teacher",
        department: "Computer Science",
        classAssignment: "Grade 9",
        section: "A",
        subject: "Computer Science",
        parentStudent: "",
        status: "Active",
        lastLogin: "Today, 07:40 AM"
    },
    {
        id: 5,
        name: "Admin User",
        username: "admin",
        phone: "9801234567",
        accountType: "Administrator",
        role: "Super Admin",
        department: "Administration",
        classAssignment: "",
        section: "",
        subject: "",
        parentStudent: "",
        status: "Active",
        lastLogin: "Today, 10:05 AM"
    },
    {
        id: 6,
        name: "Maya Sharma",
        username: "maya.sharma",
        phone: "9811234567",
        accountType: "Parent",
        role: "Parent",
        department: "",
        classAssignment: "Grade 5",
        section: "A",
        subject: "",
        parentStudent: "Rahul Sharma",
        status: "Active",
        lastLogin: "Today, 07:25 AM"
    },
    {
        id: 7,
        name: "Dipak Pradhan",
        username: "dipak.pradhan",
        phone: "9821234567",
        accountType: "Parent",
        role: "Parent",
        department: "",
        classAssignment: "Grade 8",
        section: "B",
        subject: "",
        parentStudent: "Bijay Pradhan",
        status: "Active",
        lastLogin: "Yesterday, 08:14 PM"
    },
    {
        id: 8,
        name: "Hari Gurung",
        username: "hari.gurung",
        phone: "9831234567",
        accountType: "Teacher",
        role: "Class Teacher",
        department: "Nepali",
        classAssignment: "Grade 10",
        section: "A",
        subject: "Nepali",
        parentStudent: "",
        status: "Disabled",
        lastLogin: "Sep 8, 2026"
    }
];

let editingUserId = null;
let selectedUserId = null;

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

function updateStats() {
    const total = users.length;
    const active = users.filter(user => user.status === "Active").length;
    const teachers = users.filter(user => user.accountType === "Teacher").length;
    const parents = users.filter(user => user.accountType === "Parent").length;

    document.getElementById("totalUsers").textContent = total;
    document.getElementById("activeUsers").textContent = active;
    document.getElementById("teacherUsers").textContent = teachers;
    document.getElementById("parentUsers").textContent = parents;
}

function renderUsers() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const typeValue = accountTypeFilter.value;
    const statusValue = statusFilter.value;

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm);

        const matchesType =
            typeValue === "all" || user.accountType === typeValue;

        const matchesStatus =
            statusValue === "all" || user.status === statusValue;

        return matchesSearch && matchesType && matchesStatus;
    });

    usersTableBody.innerHTML = "";

    filteredUsers.forEach(user => {
        const row = document.createElement("tr");

        const assignment = user.accountType === "Parent"
            ? user.parentStudent || "No student linked"
            : user.classAssignment
                ? `${user.classAssignment}${user.section ? ` - ${user.section}` : ""}`
                : user.department || "Not assigned";

        const assignmentSecondary = user.accountType === "Parent"
            ? `${user.classAssignment || ""}${user.section ? ` - Section ${user.section}` : ""}`
            : user.subject || user.department || "General";

        row.innerHTML = `
            <td>
                <div class="user-cell">
                    <div class="user-avatar">${getInitials(user.name)}</div>
                    <div>
                        <div class="user-name">${user.name}</div>
                        <div class="user-phone">${user.phone || "No phone"}</div>
                    </div>
                </div>
            </td>
            <td>${user.username}</td>
            <td><span class="type-badge">${user.accountType}</span></td>
            <td>${user.role}</td>
            <td>
                <div class="assignment">
                    <strong>${assignment}</strong>
                    <span>${assignmentSecondary}</span>
                </div>
            </td>
            <td>
                <span class="status-badge ${user.status === "Active" ? "status-active" : "status-disabled"}">
                    ${user.status}
                </span>
            </td>
            <td>${user.lastLogin}</td>
            <td>
                <div class="action-buttons">
                    <button class="table-action" data-action="view" data-id="${user.id}">View</button>
                    <button class="table-action" data-action="edit" data-id="${user.id}">Edit</button>
                    <button class="table-action" data-action="delete" data-id="${user.id}">Delete</button>
                </div>
            </td>
        `;

        usersTableBody.appendChild(row);
    });

    emptyState.classList.toggle("show", filteredUsers.length === 0);
    updateStats();
}

function populateRoles(type) {
    const roles = {
        Administrator: ["Super Admin", "School Admin", "Account Admin"],
        Teacher: ["Class Teacher", "Subject Teacher", "Coordinator"],
        Parent: ["Parent"]
    };

    role.innerHTML = `<option value="">Select role</option>`;

    (roles[type] || []).forEach(roleName => {
        const option = document.createElement("option");
        option.value = roleName;
        option.textContent = roleName;
        role.appendChild(option);
    });
}

function resetForm() {
    userForm.reset();
    editingUserId = null;
    document.getElementById("modalTitle").textContent = "Add User";
    role.innerHTML = `<option value="">Select role</option>`;
    document.getElementById("password").required = true;
}

function openAddModal() {
    resetForm();
    userModal.classList.add("show");
}

function closeAddModal() {
    userModal.classList.remove("show");
}

function editUser(id) {
    const user = users.find(item => item.id === id);

    if (!user) {
        return;
    }

    editingUserId = id;

    document.getElementById("modalTitle").textContent = "Edit User";
    document.getElementById("fullName").value = user.name;
    document.getElementById("username").value = user.username;
    document.getElementById("phone").value = user.phone || "";
    document.getElementById("password").value = "";
    document.getElementById("password").required = false;
    document.getElementById("accountType").value = user.accountType;

    populateRoles(user.accountType);
    role.value = user.role;

    document.getElementById("department").value = user.department || "";
    document.getElementById("status").value = user.status;
    document.getElementById("classAssignment").value = user.classAssignment || "";
    document.getElementById("section").value = user.section || "";
    document.getElementById("subject").value = user.subject || "";
    document.getElementById("parentStudent").value = user.parentStudent || "";

    userModal.classList.add("show");
}

function openViewModal(id) {
    const user = users.find(item => item.id === id);

    if (!user) {
        return;
    }

    selectedUserId = id;

    document.getElementById("viewAvatar").textContent = getInitials(user.name);
    document.getElementById("viewName").textContent = user.name;
    document.getElementById("viewUsername").textContent = `@${user.username}`;

    const viewStatus = document.getElementById("viewStatus");
    viewStatus.textContent = user.status;
    viewStatus.className = `status-badge ${user.status === "Active" ? "status-active" : "status-disabled"}`;

    document.getElementById("viewAccountType").textContent = user.accountType;
    document.getElementById("viewRole").textContent = user.role || "Not assigned";
    document.getElementById("viewDepartment").textContent = user.department || "Not assigned";
    document.getElementById("viewPhone").textContent = user.phone || "Not provided";
    document.getElementById("viewClass").textContent = user.classAssignment || "Not assigned";
    document.getElementById("viewSection").textContent = user.section || "Not assigned";
    document.getElementById("viewSubject").textContent = user.subject || user.parentStudent || "Not assigned";
    document.getElementById("viewLastLogin").textContent = user.lastLogin;

    const disableButton = document.getElementById("disableAccountButton");
    disableButton.textContent = user.status === "Active" ? "Disable Account" : "Enable Account";

    viewModal.classList.add("show");
}

function saveUser(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("fullName").value.trim(),
        username: document.getElementById("username").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        accountType: document.getElementById("accountType").value,
        role: document.getElementById("role").value,
        department: document.getElementById("department").value,
        status: document.getElementById("status").value,
        classAssignment: document.getElementById("classAssignment").value,
        section: document.getElementById("section").value,
        subject: document.getElementById("subject").value.trim(),
        parentStudent: document.getElementById("parentStudent").value.trim()
    };

    if (editingUserId) {
        const user = users.find(item => item.id === editingUserId);

        if (user) {
            Object.assign(user, formData);
        }
    } else {
        const usernameExists = users.some(
            user => user.username.toLowerCase() === formData.username.toLowerCase()
        );

        if (usernameExists) {
            alert("This username is already in use.");
            return;
        }

        users.push({
            id: Date.now(),
            ...formData,
            lastLogin: "Never"
        });
    }

    closeAddModal();
    renderUsers();
}

function deleteUser(id) {
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return;
    }

    const user = users[userIndex];

    if (user.username === "admin") {
        alert("The main administrator account cannot be deleted.");
        return;
    }

    if (confirm(`Delete the account for ${user.name}?`)) {
        users.splice(userIndex, 1);
        renderUsers();
    }
}

function toggleAccount() {
    const user = users.find(item => item.id === selectedUserId);

    if (!user) {
        return;
    }

    user.status = user.status === "Active" ? "Disabled" : "Active";

    openViewModal(user.id);
    renderUsers();
}

function resetPassword() {
    const user = users.find(item => item.id === selectedUserId);

    if (!user) {
        return;
    }

    if (confirm(`Reset the password for ${user.name}?`)) {
        alert(`Password reset initiated for ${user.username}.`);
    }
}

function exportCSV() {
    const headers = [
        "Name",
        "Username",
        "Phone",
        "Account Type",
        "Role",
        "Department",
        "Class",
        "Section",
        "Subject",
        "Linked Student",
        "Status",
        "Last Login"
    ];

    const rows = users.map(user => [
        user.name,
        user.username,
        user.phone,
        user.accountType,
        user.role,
        user.department,
        user.classAssignment,
        user.section,
        user.subject,
        user.parentStudent,
        user.status,
        user.lastLogin
    ]);

    const csv = [
        headers,
        ...rows
    ]
        .map(row => row.map(value => `"${String(value || "").replace(/"/g, '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "users-accounts.csv";
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

addUserButton.addEventListener("click", openAddModal);
closeModal.addEventListener("click", closeAddModal);
cancelModal.addEventListener("click", closeAddModal);

closeViewModal.addEventListener("click", () => {
    viewModal.classList.remove("show");
});

closeViewButton.addEventListener("click", () => {
    viewModal.classList.remove("show");
});

accountType.addEventListener("change", event => {
    populateRoles(event.target.value);
});

userForm.addEventListener("submit", saveUser);

searchInput.addEventListener("input", renderUsers);
accountTypeFilter.addEventListener("change", renderUsers);
statusFilter.addEventListener("change", renderUsers);

topSearch.addEventListener("input", () => {
    searchInput.value = topSearch.value;
    renderUsers();
});

usersTableBody.addEventListener("click", event => {
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
        editUser(id);
    }

    if (action === "delete") {
        deleteUser(id);
    }
});

document.getElementById("resetPasswordButton").addEventListener("click", resetPassword);
document.getElementById("disableAccountButton").addEventListener("click", toggleAccount);
document.getElementById("exportButton").addEventListener("click", exportCSV);

window.addEventListener("click", event => {
    if (event.target === userModal) {
        closeAddModal();
    }

    if (event.target === viewModal) {
        viewModal.classList.remove("show");
    }
});

renderUsers();