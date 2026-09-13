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

document.querySelectorAll(".setup-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.section;

        document.querySelectorAll(".setup-tab").forEach(item => {
            item.classList.remove("active");
        });

        document.querySelectorAll(".setup-section").forEach(section => {
            section.classList.remove("active");
        });

        tab.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});

const logoInput = document.getElementById("logoInput");
const schoolLogoPreview = document.getElementById("schoolLogoPreview");

logoInput.addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        schoolLogoPreview.innerHTML = `<img src="${reader.result}" alt="School Logo">`;
    };

    reader.readAsDataURL(file);
});

const modal = document.getElementById("setupModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLabel = document.getElementById("modalLabel");
const modalInput = document.getElementById("modalInput");
const setupForm = document.getElementById("setupForm");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");

let currentAction = "";

function openSetupModal(action) {
    currentAction = action;

    const settings = {
        "add-year": {
            title: "Add Academic Year",
            description: "Create a new academic year.",
            label: "Academic Year",
            placeholder: "Example: 2084 B.S."
        },
        "add-class": {
            title: "Add Class",
            description: "Create a new grade or class.",
            label: "Class Name",
            placeholder: "Example: Grade 7"
        },
        "add-subject": {
            title: "Add Subject",
            description: "Add a new academic subject.",
            label: "Subject Name",
            placeholder: "Example: Physics"
        },
        "add-department": {
            title: "Add Department",
            description: "Create a new school department.",
            label: "Department Name",
            placeholder: "Example: Humanities Department"
        },
        "add-group": {
            title: "Add Group",
            description: "Create a house, club or ECA group.",
            label: "Group Name",
            placeholder: "Example: Sports Club"
        },
        "add-term": {
            title: "Add Academic Term",
            description: "Create a new academic term or semester.",
            label: "Term Name",
            placeholder: "Example: Third Term"
        },
        "add-fee": {
            title: "Add Fee Category",
            description: "Create a new fee category.",
            label: "Fee Category",
            placeholder: "Example: Computer Lab Fee"
        }
    };

    const setting = settings[action];

    if (!setting) {
        return;
    }

    modalTitle.textContent = setting.title;
    modalDescription.textContent = setting.description;
    modalLabel.textContent = setting.label;
    modalInput.placeholder = setting.placeholder;
    modalInput.value = "";

    modal.classList.add("show");
    setTimeout(() => modalInput.focus(), 50);
}

document.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => {
        openSetupModal(button.dataset.action);
    });
});

function closeSetupModal() {
    modal.classList.remove("show");
    setupForm.reset();
}

closeModal.addEventListener("click", closeSetupModal);
cancelModal.addEventListener("click", closeSetupModal);

modal.querySelector(".modal-overlay").addEventListener("click", closeSetupModal);

setupForm.addEventListener("submit", event => {
    event.preventDefault();

    const value = modalInput.value.trim();

    if (!value) {
        return;
    }

    if (currentAction === "add-year") {
        const list = document.getElementById("academicYearsList");

        list.insertAdjacentHTML("beforeend", `
            <div class="data-row">
                <div>
                    <strong>${value}</strong>
                    <span>New Academic Year</span>
                </div>
                <span class="status-badge">Upcoming</span>
                <button class="icon-button" data-delete="year">×</button>
            </div>
        `);
    }

    if (currentAction === "add-class") {
        const list = document.getElementById("classList");

        list.insertAdjacentHTML("beforeend", `
            <div class="class-card">
                <div>
                    <strong>${value}</strong>
                    <span>0 sections</span>
                </div>
                <div class="section-tags"></div>
                <button class="text-button" data-edit="class">Manage</button>
            </div>
        `);
    }

    if (currentAction === "add-subject") {
        const list = document.getElementById("subjectList");

        list.insertAdjacentHTML("beforeend", `
            <div class="subject-item">
                <span>${value}</span>
                <button>×</button>
            </div>
        `);
    }

    if (currentAction === "add-department") {
        const list = document.getElementById("departmentList");

        list.insertAdjacentHTML("beforeend", `
            <span>${value} <button>×</button></span>
        `);
    }

    if (currentAction === "add-group") {
        const list = document.getElementById("groupList");

        list.insertAdjacentHTML("beforeend", `
            <span>${value} <button>×</button></span>
        `);
    }

    if (currentAction === "add-term") {
        const list = document.getElementById("termList");

        list.insertAdjacentHTML("beforeend", `
            <div class="term-row">
                <div>
                    <strong>${value}</strong>
                    <span>New Academic Term</span>
                </div>
                <span class="status-badge">Upcoming</span>
                <button class="icon-button">×</button>
            </div>
        `);
    }

    if (currentAction === "add-fee") {
        const list = document.getElementById("feeList");

        list.insertAdjacentHTML("beforeend", `
            <div class="fee-row">
                <span>${value}</span>
                <strong>Rs. 0</strong>
                <span>Monthly</span>
                <span class="status-badge active">Active</span>
                <button class="icon-button">×</button>
            </div>
        `);
    }

    closeSetupModal();
});

document.addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-delete]");
    const removableButton = event.target.closest(".subject-item button, .tag-list button, .term-row .icon-button, .fee-row .icon-button");

    if (deleteButton || removableButton) {
        const target = deleteButton || removableButton;
        const row = target.closest(".data-row, .subject-item, .tag-list > span, .term-row, .fee-row");

        if (row && confirm("Are you sure you want to remove this item?")) {
            row.remove();
        }
    }
});

document.querySelectorAll(".grading-option input").forEach(input => {
    input.addEventListener("change", () => {
        document.querySelectorAll(".grading-option").forEach(option => {
            option.classList.remove("active");
        });

        input.closest(".grading-option").classList.add("active");
    });
});

document.getElementById("saveAllButton").addEventListener("click", () => {
    const schoolData = {
        name: document.getElementById("schoolName").value,
        code: document.getElementById("schoolCode").value,
        description: document.getElementById("schoolDescription").value,
        email: document.getElementById("schoolEmail").value,
        phone: document.getElementById("schoolPhone").value,
        website: document.getElementById("schoolWebsite").value,
        address: document.getElementById("schoolAddress").value,
        calendar: document.getElementById("calendarType").value,
        academicYear: document.getElementById("academicYear").value,
        startTime: document.getElementById("schoolStart").value,
        endTime: document.getElementById("schoolEnd").value
    };

    localStorage.setItem("schoolSetupData", JSON.stringify(schoolData));

    alert("School setup changes saved successfully.");
});

function loadSavedData() {
    const savedData = localStorage.getItem("schoolSetupData");

    if (!savedData) {
        return;
    }

    const data = JSON.parse(savedData);

    if (data.name) document.getElementById("schoolName").value = data.name;
    if (data.code) document.getElementById("schoolCode").value = data.code;
    if (data.description) document.getElementById("schoolDescription").value = data.description;
    if (data.email) document.getElementById("schoolEmail").value = data.email;
    if (data.phone) document.getElementById("schoolPhone").value = data.phone;
    if (data.website) document.getElementById("schoolWebsite").value = data.website;
    if (data.address) document.getElementById("schoolAddress").value = data.address;
    if (data.calendar) document.getElementById("calendarType").value = data.calendar;
    if (data.academicYear) document.getElementById("academicYear").value = data.academicYear;
    if (data.startTime) document.getElementById("schoolStart").value = data.startTime;
    if (data.endTime) document.getElementById("schoolEnd").value = data.endTime;
}

loadSavedData();

document.querySelectorAll(".nav-item").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        }
    });
});