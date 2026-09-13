const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const roleModal = document.getElementById("roleModal");
const addRoleButton = document.getElementById("addRoleButton");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const roleForm = document.getElementById("roleForm");

const rolesList = document.getElementById("rolesList");
const roleSearch = document.getElementById("roleSearch");
const topSearch = document.getElementById("topSearch");
const roleEmptyState = document.getElementById("roleEmptyState");

const selectedRoleName = document.getElementById("selectedRoleName");
const selectedRoleDescription = document.getElementById("selectedRoleDescription");
const selectedPermissionCount = document.getElementById("selectedPermissionCount");
const selectedUserCount = document.getElementById("selectedUserCount");
const permissionTableBody = document.getElementById("permissionTableBody");

const editRoleButton = document.getElementById("editRoleButton");
const savePermissionsButton = document.getElementById("savePermissionsButton");

const permissionModules = [
    "School Setup",
    "Users & Accounts",
    "Roles & Permissions",
    "Students",
    "Parents",
    "Attendance",
    "Timetable",
    "Class Diary",
    "Homework",
    "Announcements",
    "School Calendar"
];

const roles = [
    {
        id: 1,
        name: "Super Admin",
        description: "Full system access",
        status: "Active",
        users: 1,
        permissions: createPermissions("full")
    },
    {
        id: 2,
        name: "School Admin",
        description: "School administration access",
        status: "Active",
        users: 3,
        permissions: createPermissions("admin")
    },
    {
        id: 3,
        name: "Class Teacher",
        description: "Class management and academic access",
        status: "Active",
        users: 18,
        permissions: createPermissions("teacher")
    },
    {
        id: 4,
        name: "Subject Teacher",
        description: "Subject and classroom access",
        status: "Active",
        users: 30,
        permissions: createPermissions("subject")
    },
    {
        id: 5,
        name: "Parent",
        description: "Linked child information access",
        status: "Active",
        users: 39,
        permissions: createPermissions("parent")
    },
    {
        id: 6,
        name: "Account Staff",
        description: "Administrative support access",
        status: "Active",
        users: 1,
        permissions: createPermissions("account")
    }
];

let selectedRoleId = 1;
let editingRoleId = null;

function createPermission(view, create, edit, remove) {
    return {
        view,
        create,
        edit,
        delete: remove
    };
}

function createPermissions(type) {
    const permissions = {};

    permissionModules.forEach(module => {
        if (type === "full") {
            permissions[module] = createPermission(true, true, true, true);
        }

        if (type === "admin") {
            permissions[module] = createPermission(true, true, true, true);
        }

        if (type === "teacher") {
            const allowed = [
                "Students",
                "Parents",
                "Attendance",
                "Timetable",
                "Class Diary",
                "Homework",
                "Announcements",
                "School Calendar"
            ].includes(module);

            permissions[module] = createPermission(
                allowed,
                ["Attendance", "Class Diary", "Homework", "Announcements"].includes(module),
                ["Students", "Parents", "Attendance", "Timetable", "Class Diary", "Homework", "Announcements"].includes(module),
                ["Class Diary", "Homework"].includes(module)
            );
        }

        if (type === "subject") {
            const allowed = [
                "Students",
                "Attendance",
                "Timetable",
                "Class Diary",
                "Homework",
                "Announcements",
                "School Calendar"
            ].includes(module);

            permissions[module] = createPermission(
                allowed,
                ["Attendance", "Class Diary", "Homework"].includes(module),
                ["Attendance", "Timetable", "Class Diary", "Homework"].includes(module),
                ["Class Diary", "Homework"].includes(module)
            );
        }

        if (type === "parent") {
            const allowed = [
                "Students",
                "Parents",
                "Attendance",
                "Timetable",
                "Class Diary",
                "Homework",
                "Announcements",
                "School Calendar"
            ].includes(module);

            permissions[module] = createPermission(
                allowed,
                false,
                false,
                false
            );
        }

        if (type === "account") {
            permissions[module] = createPermission(
                ["Students", "Parents", "Attendance"].includes(module),
                ["Students", "Parents"].includes(module),
                ["Students", "Parents"].includes(module),
                false
            );
        }
    });

    return permissions;
}

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

function updateStats() {
    document.getElementById("totalRoles").textContent = roles.length;
    document.getElementById("activeRoles").textContent =
        roles.filter(role => role.status === "Active").length;
    document.getElementById("permissionGroups").textContent = permissionModules.length;
    document.getElementById("assignedUsers").textContent =
        roles.reduce((total, role) => total + role.users, 0);
}

function renderRoles() {
    const searchTerm = roleSearch.value.toLowerCase().trim();

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchTerm) ||
        role.description.toLowerCase().includes(searchTerm)
    );

    rolesList.innerHTML = "";

    filteredRoles.forEach(role => {
        const button = document.createElement("button");

        button.className = `role-item ${role.id === selectedRoleId ? "selected" : ""}`;
        button.dataset.id = role.id;

        button.innerHTML = `
            <div class="role-icon">${getInitials(role.name)}</div>
            <div class="role-info">
                <strong>${role.name}</strong>
                <span>${role.description}</span>
            </div>
            <span class="role-count">${role.users}</span>
        `;

        rolesList.appendChild(button);
    });

    roleEmptyState.classList.toggle("show", filteredRoles.length === 0);

    updateStats();
}

function countPermissions(role) {
    let count = 0;

    Object.values(role.permissions).forEach(permission => {
        count += Object.values(permission).filter(Boolean).length;
    });

    return count;
}

function renderPermissions() {
    const role = roles.find(item => item.id === selectedRoleId);

    if (!role) {
        return;
    }

    selectedRoleName.textContent = role.name;
    selectedRoleDescription.textContent = role.description;
    selectedPermissionCount.textContent = countPermissions(role);
    selectedUserCount.textContent = role.users;

    permissionTableBody.innerHTML = "";

    permissionModules.forEach(module => {
        const permission = role.permissions[module];

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${module}</td>
            <td><input class="permission-checkbox" type="checkbox" data-module="${module}" data-permission="view" ${permission.view ? "checked" : ""}></td>
            <td><input class="permission-checkbox" type="checkbox" data-module="${module}" data-permission="create" ${permission.create ? "checked" : ""}></td>
            <td><input class="permission-checkbox" type="checkbox" data-module="${module}" data-permission="edit" ${permission.edit ? "checked" : ""}></td>
            <td><input class="permission-checkbox" type="checkbox" data-module="${module}" data-permission="delete" ${permission.delete ? "checked" : ""}></td>
        `;

        permissionTableBody.appendChild(row);
    });
}

function selectRole(id) {
    selectedRoleId = id;
    renderRoles();
    renderPermissions();
}

function resetRoleForm() {
    roleForm.reset();
    editingRoleId = null;
    document.getElementById("modalTitle").textContent = "Add Role";
}

function openAddRoleModal() {
    resetRoleForm();
    roleModal.classList.add("show");
}

function closeRoleModal() {
    roleModal.classList.remove("show");
}

function openEditRoleModal() {
    const role = roles.find(item => item.id === selectedRoleId);

    if (!role) {
        return;
    }

    editingRoleId = role.id;

    document.getElementById("modalTitle").textContent = "Edit Role";
    document.getElementById("roleName").value = role.name;
    document.getElementById("roleDescription").value = role.description;
    document.getElementById("roleStatus").value = role.status;

    document.querySelector('input[name="permissionPreset"][value="custom"]').checked = true;

    roleModal.classList.add("show");
}

function getPresetPermissions(preset) {
    if (preset === "full") {
        return createPermissions("full");
    }

    if (preset === "view") {
        const permissions = {};

        permissionModules.forEach(module => {
            permissions[module] = createPermission(true, false, false, false);
        });

        return permissions;
    }

    if (preset === "academic") {
        return createPermissions("teacher");
    }

    return createPermissions("view");
}

function saveRole(event) {
    event.preventDefault();

    const name = document.getElementById("roleName").value.trim();
    const description = document.getElementById("roleDescription").value.trim();
    const status = document.getElementById("roleStatus").value;

    const preset = document.querySelector(
        'input[name="permissionPreset"]:checked'
    ).value;

    if (editingRoleId) {
        const role = roles.find(item => item.id === editingRoleId);

        if (role) {
            role.name = name;
            role.description = description;
            role.status = status;
        }
    } else {
        const exists = roles.some(
            role => role.name.toLowerCase() === name.toLowerCase()
        );

        if (exists) {
            alert("A role with this name already exists.");
            return;
        }

        const newRole = {
            id: Date.now(),
            name,
            description,
            status,
            users: 0,
            permissions: getPresetPermissions(preset)
        };

        roles.push(newRole);
        selectedRoleId = newRole.id;
    }

    closeRoleModal();
    renderRoles();
    renderPermissions();
}

function savePermissions() {
    const role = roles.find(item => item.id === selectedRoleId);

    if (!role) {
        return;
    }

    document.querySelectorAll(".permission-checkbox").forEach(checkbox => {
        const module = checkbox.dataset.module;
        const permissionName = checkbox.dataset.permission;

        role.permissions[module][permissionName] = checkbox.checked;
    });

    selectedPermissionCount.textContent = countPermissions(role);

    alert(`Permissions saved for ${role.name}.`);
}

rolesList.addEventListener("click", event => {
    const roleItem = event.target.closest(".role-item");

    if (!roleItem) {
        return;
    }

    selectRole(Number(roleItem.dataset.id));
});

permissionTableBody.addEventListener("change", event => {
    if (!event.target.classList.contains("permission-checkbox")) {
        return;
    }

    const role = roles.find(item => item.id === selectedRoleId);

    if (!role) {
        return;
    }

    const module = event.target.dataset.module;
    const permissionName = event.target.dataset.permission;

    role.permissions[module][permissionName] = event.target.checked;

    selectedPermissionCount.textContent = countPermissions(role);
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

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});

addRoleButton.addEventListener("click", openAddRoleModal);
editRoleButton.addEventListener("click", openEditRoleModal);
savePermissionsButton.addEventListener("click", savePermissions);

closeModal.addEventListener("click", closeRoleModal);
cancelModal.addEventListener("click", closeRoleModal);

roleForm.addEventListener("submit", saveRole);

roleSearch.addEventListener("input", renderRoles);

topSearch.addEventListener("input", () => {
    roleSearch.value = topSearch.value;
    renderRoles();
});

window.addEventListener("click", event => {
    if (event.target === roleModal) {
        closeRoleModal();
    }
});

renderRoles();
renderPermissions();