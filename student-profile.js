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

const editStudent = document.getElementById("editStudent");
const editModal = document.getElementById("editModal");
const modalClose = document.getElementById("modalClose");
const cancelEdit = document.getElementById("cancelEdit");
const editStudentForm = document.getElementById("editStudentForm");

editStudent.addEventListener("click", () => {
    editModal.classList.add("show");
});

modalClose.addEventListener("click", () => {
    editModal.classList.remove("show");
});

cancelEdit.addEventListener("click", () => {
    editModal.classList.remove("show");
});

editModal.querySelector(".modal-overlay").addEventListener("click", () => {
    editModal.classList.remove("show");
});

editStudentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Student information updated successfully.");
    editModal.classList.remove("show");
});

document.getElementById("moreButton").addEventListener("click", () => {
    alert("More student actions will be added here.");
});

document.getElementById("addRemark").addEventListener("click", () => {
    alert("Add teacher remark feature will be connected here.");
});

document.querySelector(".add-activity").addEventListener("click", () => {
    alert("Add ECA or achievement feature will be connected here.");
});

document.getElementById("uploadDocument").addEventListener("click", () => {
    alert("Document upload feature will be connected here.");
});

document.querySelectorAll(".document-action").forEach(button => {
    button.addEventListener("click", () => {
        alert("Document download will be connected here.");
    });
});

document.querySelector(".contact-parent").addEventListener("click", () => {
    alert("Parent contact feature will be connected here.");
});