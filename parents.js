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

const parentSearch = document.getElementById("parentSearch");
const topSearch = document.getElementById("topSearch");
const relationshipFilter = document.getElementById("relationshipFilter");
const statusFilter = document.getElementById("statusFilter");
const parentTableBody = document.getElementById("parentTableBody");
const emptyState = document.getElementById("emptyState");
const showingCount = document.getElementById("showingCount");

function filterParents() {
    const searchValue = parentSearch.value.toLowerCase().trim();
    const relationshipValue = relationshipFilter.value;
    const statusValue = statusFilter.value;

    let visibleCount = 0;

    parentTableBody.querySelectorAll("tr").forEach(row => {
        const parentText = row.textContent.toLowerCase();
        const relationship = row.dataset.relationship;
        const status = row.dataset.status;

        const matchesSearch = parentText.includes(searchValue);
        const matchesRelationship = !relationshipValue || relationship === relationshipValue;
        const matchesStatus = !statusValue || status === statusFilter.value;

        if (matchesSearch && matchesRelationship && matchesStatus) {
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

parentSearch.addEventListener("input", filterParents);
relationshipFilter.addEventListener("change", filterParents);
statusFilter.addEventListener("change", filterParents);

topSearch.addEventListener("input", () => {
    parentSearch.value = topSearch.value;
    filterParents();
});

const parentModal = document.getElementById("parentModal");
const addParentButton = document.getElementById("addParentButton");
const closeModal = document.getElementById("closeModal");
const cancelButton = document.getElementById("cancelButton");
const parentForm = document.getElementById("parentForm");

function openParentModal() {
    parentModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeParentModal() {
    parentModal.classList.remove("show");
    document.body.style.overflow = "";
}

addParentButton.addEventListener("click", openParentModal);
closeModal.addEventListener("click", closeParentModal);
cancelButton.addEventListener("click", closeParentModal);

parentModal.addEventListener("click", event => {
    if (event.target === parentModal) {
        closeParentModal();
    }
});

parentForm.addEventListener("submit", event => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const relationship = document.getElementById("relationship").value;
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    const parentId = `PAR-2026-${String(parentTableBody.children.length + 1).padStart(3, "0")}`;

    const row = document.createElement("tr");

    row.dataset.relationship = relationship;
    row.dataset.status = "Pending";

    row.innerHTML = `
        <td>
            <div class="parent-info">
                <div class="parent-avatar avatar-1">${initials}</div>
                <div>
                    <strong>${firstName} ${lastName}</strong>
                    <span>${email || "No email provided"}</span>
                </div>
            </div>
        </td>
        <td>${parentId}</td>
        <td>${relationship}</td>
        <td>
            <div class="children-count">
                <strong>0 Children</strong>
                <span>No children linked</span>
            </div>
        </td>
        <td>${phone}</td>
        <td><span class="verification pending">Pending</span></td>
        <td><span class="status pending">Pending</span></td>
        <td>
            <div class="action-buttons">
                <button class="view-button" title="View">◉</button>
                <button class="edit-button" title="Edit">✎</button>
                <button class="more-button" title="More">⋮</button>
            </div>
        </td>
    `;

    parentTableBody.prepend(row);
    parentForm.reset();
    closeParentModal();

    attachRowActions(row);
    filterParents();

    alert(`Parent account created successfully.\nUsername: ${username}`);
});

const profileModal = document.getElementById("profileModal");
const closeProfileModal = document.getElementById("closeProfileModal");
const profileName = document.getElementById("profileName");
const profileId = document.getElementById("profileId");
const profileRelationship = document.getElementById("profileRelationship");
const profilePhone = document.getElementById("profilePhone");
const profileEmail = document.getElementById("profileEmail");
const profileStatus = document.getElementById("profileStatus");
const profileAvatar = document.getElementById("profileAvatar");
const disableAccountButton = document.getElementById("disableAccountButton");
const resetPasswordButton = document.getElementById("resetPasswordButton");
const linkChildButton = document.getElementById("linkChildButton");

let selectedParentRow = null;

function openProfile(row) {
    selectedParentRow = row;

    const name = row.querySelector(".parent-info strong").textContent;
    const email = row.querySelector(".parent-info span").textContent;
    const id = row.children[1].textContent;
    const relationship = row.children[2].textContent;
    const phone = row.children[4].textContent;
    const statusText = row.children[6].textContent.trim();
    const initials = row.querySelector(".parent-avatar").textContent;

    profileName.textContent = name;
    profileEmail.textContent = email;
    profileId.textContent = id;
    profileRelationship.textContent = relationship;
    profilePhone.textContent = phone;
    profileAvatar.textContent = initials;

    profileStatus.textContent = statusText;
    profileStatus.className = `status ${statusText.toLowerCase()}`;

    if (statusText === "Disabled") {
        disableAccountButton.textContent = "Enable Account";
    } else {
        disableAccountButton.textContent = "Disable Account";
    }

    profileModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeProfile() {
    profileModal.classList.remove("show");
    document.body.style.overflow = "";
}

closeProfileModal.addEventListener("click", closeProfile);

profileModal.addEventListener("click", event => {
    if (event.target === profileModal) {
        closeProfile();
    }
});

function attachRowActions(row) {
    const viewButton = row.querySelector(".view-button");
    const editButton = row.querySelector(".edit-button");
    const moreButton = row.querySelector(".more-button");

    viewButton.addEventListener("click", () => {
        openProfile(row);
    });

    editButton.addEventListener("click", () => {
        alert("Edit parent feature will be connected to the parent profile module.");
    });

    moreButton.addEventListener("click", () => {
        const name = row.querySelector(".parent-info strong").textContent;
        const currentStatus = row.dataset.status;

        if (currentStatus === "Disabled") {
            if (confirm(`Enable ${name}'s account?`)) {
                row.dataset.status = "Active";
                row.querySelector(".status").textContent = "Active";
                row.querySelector(".status").className = "status active";
                filterParents();
            }
        } else {
            if (confirm(`Disable ${name}'s account?`)) {
                row.dataset.status = "Disabled";
                row.querySelector(".status").textContent = "Disabled";
                row.querySelector(".status").className = "status disabled";
                filterParents();
            }
        }
    });
}

parentTableBody.querySelectorAll("tr").forEach(row => {
    attachRowActions(row);
});

disableAccountButton.addEventListener("click", () => {
    if (!selectedParentRow) {
        return;
    }

    const name = selectedParentRow.querySelector(".parent-info strong").textContent;
    const currentStatus = selectedParentRow.dataset.status;

    if (currentStatus === "Disabled") {
        selectedParentRow.dataset.status = "Active";
        selectedParentRow.querySelector(".status").textContent = "Active";
        selectedParentRow.querySelector(".status").className = "status active";
        profileStatus.textContent = "Active";
        profileStatus.className = "status active";
        disableAccountButton.textContent = "Disable Account";
        alert(`${name}'s account has been enabled.`);
    } else {
        if (confirm(`Disable ${name}'s account?`)) {
            selectedParentRow.dataset.status = "Disabled";
            selectedParentRow.querySelector(".status").textContent = "Disabled";
            selectedParentRow.querySelector(".status").className = "status disabled";
            profileStatus.textContent = "Disabled";
            profileStatus.className = "status disabled";
            disableAccountButton.textContent = "Enable Account";
            alert(`${name}'s account has been disabled.`);
        }
    }

    filterParents();
});

resetPasswordButton.addEventListener("click", () => {
    if (!selectedParentRow) {
        return;
    }

    const name = selectedParentRow.querySelector(".parent-info strong").textContent;

    if (confirm(`Reset account access for ${name}?`)) {
        alert(`A password reset request has been created for ${name}.`);
    }
});

linkChildButton.addEventListener("click", () => {
    if (!selectedParentRow) {
        return;
    }

    const childName = prompt("Enter the student name to link:");

    if (!childName || !childName.trim()) {
        return;
    }

    const childrenList = document.getElementById("childrenList");

    const childItem = document.createElement("div");
    childItem.className = "child-item";

    const initials = childName
        .trim()
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();

    childItem.innerHTML = `
        <div class="child-avatar">${initials}</div>
        <div>
            <strong>${childName.trim()}</strong>
            <span>Student record linked to parent account</span>
        </div>
        <span class="verification verified">Verified</span>
    `;

    childrenList.appendChild(childItem);

    const childrenCell = selectedParentRow.children[3];
    const childrenStrong = childrenCell.querySelector("strong");
    const childrenSpan = childrenCell.querySelector("span");

    const currentText = childrenStrong.textContent;
    const currentCount = parseInt(currentText) || 0;
    const newCount = currentCount + 1;

    childrenStrong.textContent = `${newCount} ${newCount === 1 ? "Child" : "Children"}`;
    childrenSpan.textContent = `${childName.trim()}`;

    alert(`${childName.trim()} has been linked successfully.`);
});

document.getElementById("exportButton").addEventListener("click", () => {
    const rows = parentTableBody.querySelectorAll("tr");

    let csv = "Parent Name,Parent ID,Relationship,Linked Children,Contact,Verification,Status\n";

    rows.forEach(row => {
        if (row.style.display === "none") {
            return;
        }

        const name = row.querySelector(".parent-info strong").textContent;
        const id = row.children[1].textContent;
        const relationship = row.children[2].textContent;
        const children = row.children[3].textContent.trim().replace(/\s+/g, " ");
        const contact = row.children[4].textContent;
        const verification = row.children[5].textContent.trim();
        const status = row.children[6].textContent.trim();

        csv += `"${name}","${id}","${relationship}","${children}","${contact}","${verification}","${status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "parents.csv";
    link.click();

    URL.revokeObjectURL(url);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
    }
});