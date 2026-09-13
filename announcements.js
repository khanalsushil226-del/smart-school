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

const announcementModal = document.getElementById("announcementModal");
const viewModal = document.getElementById("viewModal");
const addAnnouncementButton = document.getElementById("addAnnouncementButton");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const closeViewModal = document.getElementById("closeViewModal");
const closeViewButton = document.getElementById("closeViewButton");
const announcementForm = document.getElementById("announcementForm");
const table = document.getElementById("announcementTable");

let editingRow = null;

const announcementDetails = {
    1: "The school will conduct a Parent-Teacher Meeting for Grade 10 students. Parents are requested to attend the meeting and discuss their child's academic progress, attendance and classroom performance.",
    2: "From next week, the school operating hours will be from 9:00 AM to 4:00 PM. All students and parents are requested to follow the updated schedule.",
    3: "The monthly assessment schedule has been published. Students should review the schedule and prepare according to the assigned subjects and dates.",
    4: "The annual Science Exhibition will be organized at the school. Students interested in participating should coordinate with their respective subject teachers.",
    5: "Students are reminded to return all borrowed library books by the specified deadline so that library records remain up to date.",
    6: "Preparation for the upcoming Sports Day has started. Students participating in different events should follow instructions provided by their sports teachers.",
    7: "The Dashain holiday schedule is being finalized. The final holiday dates and school reopening information will be published after approval.",
    8: "The school will organize the annual student photo session. Class-wise schedules and required instructions will be shared before the event."
};

function openCreateModal() {
    editingRow = null;
    document.getElementById("modalTitle").textContent = "Create Announcement";
    announcementForm.reset();
    document.getElementById("status").value = "Published";
    document.getElementById("priority").value = "Normal";
    announcementModal.classList.add("show");
}

function closeCreateModal() {
    announcementModal.classList.remove("show");
    editingRow = null;
}

function getRowData(row) {
    const cells = row.querySelectorAll("td");

    return {
        id: row.dataset.id,
        title: cells[0].querySelector("strong").textContent,
        summary: cells[0].querySelector("span").textContent,
        audience: cells[1].textContent.trim(),
        date: cells[2].textContent.trim(),
        priority: cells[3].textContent.trim(),
        status: cells[4].textContent.trim(),
        creator: cells[5].textContent.trim()
    };
}

function createRow(data) {
    const row = document.createElement("tr");
    row.dataset.id = data.id;

    const priorityClass = data.priority.toLowerCase();
    const statusClass = data.status.toLowerCase();

    row.innerHTML = `
        <td>
            <div class="announcement-title">
                <div class="announcement-symbol">${data.symbol || "◌"}</div>
                <div>
                    <strong>${data.title}</strong>
                    <span>${data.summary}</span>
                </div>
            </div>
        </td>
        <td><span class="audience-badge">${data.audience}</span></td>
        <td>${data.date || "—"}</td>
        <td><span class="priority ${priorityClass}">${data.priority}</span></td>
        <td><span class="status ${statusClass}">${data.status}</span></td>
        <td>${data.creator || "Administrator"}</td>
        <td>
            <div class="action-buttons">
                <button class="view-button" data-action="view">View</button>
                <button class="edit-button" data-action="edit">Edit</button>
                <button class="delete-button" data-action="delete">Delete</button>
            </div>
        </td>
    `;

    return row;
}

function updateStatistics() {
    const rows = [...table.querySelectorAll("tr")];

    const total = rows.length;
    const published = rows.filter(row => {
        return row.querySelector(".status").textContent.trim() === "Published";
    }).length;

    const drafts = rows.filter(row => {
        return row.querySelector(".status").textContent.trim() === "Draft";
    }).length;

    const highPriority = rows.filter(row => {
        return row.querySelector(".priority").textContent.trim() === "High";
    }).length;

    document.getElementById("totalAnnouncements").textContent = total;
    document.getElementById("publishedAnnouncements").textContent = published;
    document.getElementById("draftAnnouncements").textContent = drafts;
    document.getElementById("priorityAnnouncements").textContent = highPriority;
}

function filterAnnouncements() {
    const search = document.getElementById("announcementSearch").value.toLowerCase().trim();
    const status = document.getElementById("statusFilter").value;
    const priority = document.getElementById("priorityFilter").value;

    const rows = [...table.querySelectorAll("tr")];
    let visibleCount = 0;

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const rowStatus = row.querySelector(".status").textContent.trim();
        const rowPriority = row.querySelector(".priority").textContent.trim();

        const matchesSearch = !search || text.includes(search);
        const matchesStatus = status === "all" || rowStatus === status;
        const matchesPriority = priority === "all" || rowPriority === priority;

        const visible = matchesSearch && matchesStatus && matchesPriority;

        row.style.display = visible ? "" : "none";

        if (visible) {
            visibleCount++;
        }
    });

    document.getElementById("recordCount").textContent = `Showing ${visibleCount} announcements`;

    document.getElementById("emptyState").classList.toggle("show", visibleCount === 0);
}

addAnnouncementButton.addEventListener("click", openCreateModal);

closeModal.addEventListener("click", closeCreateModal);
cancelModal.addEventListener("click", closeCreateModal);

closeViewModal.addEventListener("click", () => {
    viewModal.classList.remove("show");
});

closeViewButton.addEventListener("click", () => {
    viewModal.classList.remove("show");
});

announcementModal.addEventListener("click", event => {
    if (event.target === announcementModal) {
        closeCreateModal();
    }
});

viewModal.addEventListener("click", event => {
    if (event.target === viewModal) {
        viewModal.classList.remove("show");
    }
});

announcementForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const audience = document.getElementById("audience").value;
    const priority = document.getElementById("priority").value;
    const publishDate = document.getElementById("publishDate").value;
    const status = document.getElementById("status").value;
    const description = document.getElementById("description").value.trim();

    const formattedDate = publishDate
        ? new Date(`${publishDate}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
        : "—";

    const summary = description.length > 75
        ? `${description.substring(0, 75)}...`
        : description;

    if (editingRow) {
        const titleElement = editingRow.querySelector(".announcement-title strong");
        const summaryElement = editingRow.querySelector(".announcement-title span");
        const audienceElement = editingRow.querySelector(".audience-badge");
        const dateElement = editingRow.children[2];
        const priorityElement = editingRow.querySelector(".priority");
        const statusElement = editingRow.querySelector(".status");

        titleElement.textContent = title;
        summaryElement.textContent = summary;
        audienceElement.textContent = audience;
        dateElement.textContent = formattedDate;
        priorityElement.textContent = priority;
        statusElement.textContent = status;

        priorityElement.className = `priority ${priority.toLowerCase()}`;
        statusElement.className = `status ${status.toLowerCase()}`;

        announcementDetails[editingRow.dataset.id] = description;

        alert("Announcement updated successfully.");
    } else {
        const newId = Date.now().toString();

        const newRow = createRow({
            id: newId,
            title,
            summary,
            audience,
            date: formattedDate,
            priority,
            status,
            creator: "Administrator",
            symbol: "◌"
        });

        table.insertBefore(newRow, table.firstChild);
        announcementDetails[newId] = description;

        alert("Announcement created successfully.");
    }

    updateStatistics();
    filterAnnouncements();
    closeCreateModal();
});

table.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const row = button.closest("tr");
    const action = button.dataset.action;
    const data = getRowData(row);

    if (action === "view") {
        document.getElementById("viewTitle").textContent = data.title;
        document.getElementById("viewAudience").textContent = data.audience;
        document.getElementById("viewPriority").textContent = data.priority;
        document.getElementById("viewStatus").textContent = data.status;
        document.getElementById("viewDate").textContent = data.date;
        document.getElementById("viewDescription").textContent =
            announcementDetails[data.id] || data.summary;

        viewModal.classList.add("show");
    }

    if (action === "edit") {
        editingRow = row;

        document.getElementById("modalTitle").textContent = "Edit Announcement";
        document.getElementById("title").value = data.title;
        document.getElementById("audience").value = data.audience;
        document.getElementById("priority").value = data.priority;
        document.getElementById("status").value = data.status;

        const dateText = data.date;

        if (dateText !== "—") {
            const parsedDate = new Date(dateText);

            if (!Number.isNaN(parsedDate.getTime())) {
                document.getElementById("publishDate").value =
                    parsedDate.toISOString().split("T")[0];
            }
        }

        document.getElementById("description").value =
            announcementDetails[data.id] || data.summary;

        announcementModal.classList.add("show");
    }

    if (action === "delete") {
        const confirmed = confirm(
            `Are you sure you want to delete "${data.title}"?`
        );

        if (confirmed) {
            delete announcementDetails[data.id];
            row.remove();
            updateStatistics();
            filterAnnouncements();
        }
    }
});

const announcementSearch = document.getElementById("announcementSearch");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const topSearch = document.getElementById("topSearch");

announcementSearch.addEventListener("input", filterAnnouncements);
statusFilter.addEventListener("change", filterAnnouncements);
priorityFilter.addEventListener("change", filterAnnouncements);

topSearch.addEventListener("input", () => {
    announcementSearch.value = topSearch.value;
    filterAnnouncements();
});

document.querySelector(".notification-button").addEventListener("click", () => {
    alert("You have 3 unread notifications.");
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});

document.getElementById("exportButton").addEventListener("click", () => {
    const rows = [...table.querySelectorAll("tr")].filter(row => {
        return row.style.display !== "none";
    });

    const headers = [
        "Announcement",
        "Target Audience",
        "Published",
        "Priority",
        "Status",
        "Created By"
    ];

    const csvRows = [headers];

    rows.forEach(row => {
        const data = getRowData(row);

        csvRows.push([
            data.title,
            data.audience,
            data.date,
            data.priority,
            data.status,
            data.creator
        ]);
    });

    const csv = csvRows
        .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "school-announcements.csv";
    link.click();

    URL.revokeObjectURL(url);
});

updateStatistics();
filterAnnouncements();