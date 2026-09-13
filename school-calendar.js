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

const events = [
    {
        id: 1,
        title: "Parent-Teacher Meeting",
        date: "2026-09-18",
        startTime: "10:00",
        endTime: "13:00",
        category: "Meeting",
        audience: "Parents",
        location: "School Hall",
        description: "Parent-Teacher Meeting for Grade 10 students to discuss academic progress, attendance and classroom performance."
    },
    {
        id: 2,
        title: "Monthly Assessment",
        date: "2026-09-21",
        startTime: "09:30",
        endTime: "12:00",
        category: "Exam",
        audience: "Students",
        location: "Classrooms",
        description: "Monthly assessment for selected subjects. Students should follow the published assessment schedule."
    },
    {
        id: 3,
        title: "Science Exhibition",
        date: "2026-09-24",
        startTime: "10:00",
        endTime: "15:00",
        category: "Event",
        audience: "Students & Parents",
        location: "School Ground",
        description: "Annual Science Exhibition featuring student projects and practical demonstrations."
    },
    {
        id: 4,
        title: "School Holiday",
        date: "2026-09-27",
        startTime: "",
        endTime: "",
        category: "Holiday",
        audience: "Everyone",
        location: "School Closed",
        description: "School will remain closed on this date."
    },
    {
        id: 5,
        title: "Sports Day",
        date: "2026-09-30",
        startTime: "09:00",
        endTime: "16:00",
        category: "Event",
        audience: "Students & Parents",
        location: "School Ground",
        description: "Annual Sports Day with participation from students across different grades."
    },
    {
        id: 6,
        title: "Teacher Staff Meeting",
        date: "2026-09-16",
        startTime: "14:00",
        endTime: "15:30",
        category: "Meeting",
        audience: "Teachers",
        location: "Staff Room",
        description: "Monthly staff meeting to review academic activities and upcoming school programs."
    },
    {
        id: 7,
        title: "Dashain Holiday",
        date: "2026-10-17",
        startTime: "",
        endTime: "",
        category: "Holiday",
        audience: "Everyone",
        location: "School Closed",
        description: "School holiday for the Dashain festival period."
    },
    {
        id: 8,
        title: "School Photo Day",
        date: "2026-10-05",
        startTime: "09:00",
        endTime: "14:00",
        category: "Event",
        audience: "Students",
        location: "School Hall",
        description: "Annual student photograph session arranged class by class."
    }
];

let currentDate = new Date(2026, 8, 1);
let editingEventId = null;

const calendarGrid = document.getElementById("calendarGrid");
const calendarMonth = document.getElementById("calendarMonth");
const eventsList = document.getElementById("eventsList");
const eventsEmpty = document.getElementById("eventsEmpty");
const eventSearch = document.getElementById("eventSearch");
const categoryFilter = document.getElementById("categoryFilter");

const eventModal = document.getElementById("eventModal");
const viewModal = document.getElementById("viewModal");
const eventForm = document.getElementById("eventForm");

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function formatTime(time) {
    if (!time) {
        return "";
    }

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}

function getEventClass(category) {
    return category.toLowerCase();
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    calendarMonth.textContent = `${monthNames[month]} ${year}`;

    calendarGrid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    const today = new Date();
    const todayString =
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    for (let i = 0; i < totalCells; i++) {
        const day = document.createElement("div");
        day.className = "calendar-day";

        let cellDate;
        let dayNumber;

        if (i < firstDay) {
            dayNumber = daysInPreviousMonth - firstDay + i + 1;
            cellDate = new Date(year, month - 1, dayNumber);
            day.classList.add("other-month");
        } else if (i >= firstDay + daysInMonth) {
            dayNumber = i - firstDay - daysInMonth + 1;
            cellDate = new Date(year, month + 1, dayNumber);
            day.classList.add("other-month");
        } else {
            dayNumber = i - firstDay + 1;
            cellDate = new Date(year, month, dayNumber);
        }

        const dateString =
            `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, "0")}-${String(cellDate.getDate()).padStart(2, "0")}`;

        if (dateString === todayString) {
            day.classList.add("today");
        }

        const number = document.createElement("div");
        number.className = "day-number";
        number.textContent = dayNumber;

        day.appendChild(number);

        const dayEvents = events.filter(event => event.date === dateString);

        dayEvents.slice(0, 3).forEach(event => {
            const eventElement = document.createElement("div");
            eventElement.className = `calendar-event ${getEventClass(event.category)}`;
            eventElement.textContent = event.title;

            eventElement.addEventListener("click", eventClick => {
                eventClick.stopPropagation();
                openViewModal(event);
            });

            day.appendChild(eventElement);
        });

        if (dayEvents.length > 3) {
            const more = document.createElement("div");
            more.className = "calendar-event";
            more.textContent = `+${dayEvents.length - 3} more`;
            day.appendChild(more);
        }

        day.addEventListener("click", () => {
            openCreateModal(dateString);
        });

        calendarGrid.appendChild(day);
    }
}

function renderEvents() {
    const search = eventSearch.value.toLowerCase().trim();
    const category = categoryFilter.value;

    const filteredEvents = [...events]
        .filter(event => {
            const searchableText = [
                event.title,
                event.category,
                event.audience,
                event.location,
                event.description
            ].join(" ").toLowerCase();

            const matchesSearch = !search || searchableText.includes(search);
            const matchesCategory =
                category === "all" || event.category === category;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    eventsList.innerHTML = "";

    filteredEvents.forEach(event => {
        const item = document.createElement("div");
        item.className = "event-item";

        const time = event.startTime
            ? `${formatTime(event.startTime)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ""}`
            : "All day";

        item.innerHTML = `
            <div class="event-date-row">
                <span class="event-date">${formatDate(event.date)}</span>
                <span class="event-category">${event.category}</span>
            </div>
            <div class="event-item-title">${event.title}</div>
            <div class="event-item-details">${time} · ${event.location || "School"}</div>
        `;

        item.addEventListener("click", () => {
            openViewModal(event);
        });

        eventsList.appendChild(item);
    });

    eventsEmpty.classList.toggle("show", filteredEvents.length === 0);
}

function updateStatistics() {
    const total = events.length;

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthCount = events.filter(event => {
        const date = new Date(`${event.date}T00:00:00`);
        return date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear;
    }).length;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const upcoming = events.filter(event => {
        const date = new Date(`${event.date}T00:00:00`);
        return date >= today;
    }).length;

    const holidays = events.filter(event => {
        return event.category === "Holiday";
    }).length;

    document.getElementById("totalEvents").textContent = total;
    document.getElementById("monthEvents").textContent = monthCount;
    document.getElementById("upcomingEvents").textContent = upcoming;
    document.getElementById("holidayEvents").textContent = holidays;
}

function openCreateModal(date = "") {
    editingEventId = null;

    document.getElementById("modalTitle").textContent = "Add Calendar Event";
    eventForm.reset();

    if (date) {
        document.getElementById("eventDate").value = date;
    }

    document.getElementById("eventCategory").value = "Academic";
    document.getElementById("eventAudience").value = "Everyone";

    eventModal.classList.add("show");
}

function openEditModal(event) {
    editingEventId = event.id;

    document.getElementById("modalTitle").textContent = "Edit Calendar Event";
    document.getElementById("eventTitle").value = event.title;
    document.getElementById("eventDate").value = event.date;
    document.getElementById("eventCategory").value = event.category;
    document.getElementById("eventStartTime").value = event.startTime;
    document.getElementById("eventEndTime").value = event.endTime;
    document.getElementById("eventAudience").value = event.audience;
    document.getElementById("eventLocation").value = event.location;
    document.getElementById("eventDescription").value = event.description;

    eventModal.classList.add("show");
}

function closeEventModal() {
    eventModal.classList.remove("show");
    editingEventId = null;
}

function openViewModal(event) {
    document.getElementById("viewCategory").textContent = event.category;
    document.getElementById("viewTitle").textContent = event.title;
    document.getElementById("viewDate").textContent = formatDate(event.date);

    const time = event.startTime
        ? `${formatTime(event.startTime)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ""}`
        : "All day";

    document.getElementById("viewTime").textContent = time;
    document.getElementById("viewAudience").textContent = event.audience;
    document.getElementById("viewLocation").textContent = event.location || "Not specified";
    document.getElementById("viewDescription").textContent =
        event.description || "No description provided.";

    viewModal.classList.add("show");
}

function closeViewModal() {
    viewModal.classList.remove("show");
}

document.getElementById("addEventButton").addEventListener("click", () => {
    openCreateModal();
});

document.getElementById("closeModal").addEventListener("click", closeEventModal);
document.getElementById("cancelModal").addEventListener("click", closeEventModal);

document.getElementById("closeViewModal").addEventListener("click", closeViewModal);
document.getElementById("closeViewButton").addEventListener("click", closeViewModal);

eventModal.addEventListener("click", event => {
    if (event.target === eventModal) {
        closeEventModal();
    }
});

viewModal.addEventListener("click", event => {
    if (event.target === viewModal) {
        closeViewModal();
    }
});

eventForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("eventTitle").value.trim();
    const date = document.getElementById("eventDate").value;
    const startTime = document.getElementById("eventStartTime").value;
    const endTime = document.getElementById("eventEndTime").value;
    const category = document.getElementById("eventCategory").value;
    const audience = document.getElementById("eventAudience").value;
    const location = document.getElementById("eventLocation").value.trim();
    const description = document.getElementById("eventDescription").value.trim();

    if (editingEventId) {
        const index = events.findIndex(event => event.id === editingEventId);

        if (index !== -1) {
            events[index] = {
                ...events[index],
                title,
                date,
                startTime,
                endTime,
                category,
                audience,
                location,
                description
            };
        }

        alert("Calendar event updated successfully.");
    } else {
        events.push({
            id: Date.now(),
            title,
            date,
            startTime,
            endTime,
            category,
            audience,
            location,
            description
        });

        alert("Calendar event added successfully.");
    }

    renderCalendar();
    renderEvents();
    updateStatistics();
    closeEventModal();
});

document.getElementById("previousMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    renderEvents();
    updateStatistics();
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    renderEvents();
    updateStatistics();
});

document.getElementById("todayButton").addEventListener("click", () => {
    currentDate = new Date();
    currentDate.setDate(1);

    renderCalendar();
    renderEvents();
    updateStatistics();
});

eventSearch.addEventListener("input", renderEvents);
categoryFilter.addEventListener("change", renderEvents);

document.getElementById("topSearch").addEventListener("input", event => {
    eventSearch.value = event.target.value;
    renderEvents();
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

eventsList.addEventListener("contextmenu", event => {
    event.preventDefault();
});

renderCalendar();
renderEvents();
updateStatistics();