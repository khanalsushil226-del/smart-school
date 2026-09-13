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

const nepaliMonths = [
    "बैशाख",
    "जेठ",
    "असार",
    "श्रावण",
    "भाद्र",
    "आश्विन",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फाल्गुण",
    "चैत्र"
];

const nepaliWeekdays = [
    "आइतबार",
    "सोमबार",
    "मंगलबार",
    "बुधबार",
    "बिहिबार",
    "शुक्रबार",
    "शनिबार"
];

const nepaliNumbers = [
    "०",
    "१",
    "२",
    "३",
    "४",
    "५",
    "६",
    "७",
    "८",
    "९"
];

const bsCalendar = {
    2082: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2083: [31, 32, 31, 32, 31, 30, 30, 29, 29, 30, 30, 30],
    2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2085: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2087: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2088: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 32],
    2089: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2090: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]
};

function toNepaliNumber(value) {
    return String(value).replace(/[0-9]/g, digit => {
        return nepaliNumbers[Number(digit)];
    });
}

function getMonthDays(year, month) {
    if (bsCalendar[year] && bsCalendar[year][month - 1]) {
        return bsCalendar[year][month - 1];
    }

    return 30;
}

function getYearDays(year) {
    let total = 0;

    for (let month = 1; month <= 12; month++) {
        total += getMonthDays(year, month);
    }

    return total;
}

function bsToAd(year, month, day) {
    const referenceYear = 2082;
    const referenceMonth = 1;
    const referenceDay = 1;
    const referenceAd = new Date(2025, 3, 14);

    let totalDays = 0;

    if (year >= referenceYear) {
        for (let y = referenceYear; y < year; y++) {
            totalDays += getYearDays(y);
        }
    } else {
        for (let y = year; y < referenceYear; y++) {
            totalDays -= getYearDays(y);
        }
    }

    for (let m = 1; m < month; m++) {
        totalDays += getMonthDays(year, m);
    }

    totalDays += day - referenceDay;

    const result = new Date(referenceAd);
    result.setDate(result.getDate() + totalDays);

    return result;
}

function adToBs(adDate) {
    const referenceAd = new Date(2025, 3, 14);
    const target = new Date(
        adDate.getFullYear(),
        adDate.getMonth(),
        adDate.getDate()
    );

    let difference = Math.round(
        (target - referenceAd) / 86400000
    );

    let year = 2082;

    if (difference >= 0) {
        while (difference >= getYearDays(year)) {
            difference -= getYearDays(year);
            year++;
        }
    } else {
        while (difference < 0) {
            year--;
            difference += getYearDays(year);
        }
    }

    let month = 1;

    while (difference >= getMonthDays(year, month)) {
        difference -= getMonthDays(year, month);
        month++;
    }

    return {
        year,
        month,
        day: difference + 1
    };
}

function getDateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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

function formatBsDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    const bs = adToBs(date);

    return `${toNepaliNumber(bs.day)} ${nepaliMonths[bs.month - 1]} ${toNepaliNumber(bs.year)}`;
}

function getEventClass(category) {
    return category.toLowerCase();
}

const events = [
    {
        id: 1,
        title: "अभिभावक–शिक्षक बैठक",
        date: "2026-09-18",
        startTime: "10:00",
        endTime: "13:00",
        category: "Meeting",
        audience: "Parents",
        location: "School Hall",
        description: "कक्षा १० का विद्यार्थीहरूको शैक्षिक प्रगति, उपस्थिति र कक्षागत प्रदर्शनबारे छलफल गर्न अभिभावक–शिक्षक बैठक।"
    },
    {
        id: 2,
        title: "मासिक परीक्षा",
        date: "2026-09-21",
        startTime: "09:30",
        endTime: "12:00",
        category: "Exam",
        audience: "Students",
        location: "Classrooms",
        description: "निर्धारित विषयहरूको मासिक परीक्षा सञ्चालन हुनेछ।"
    },
    {
        id: 3,
        title: "विज्ञान प्रदर्शनी",
        date: "2026-09-24",
        startTime: "10:00",
        endTime: "15:00",
        category: "Event",
        audience: "Students & Parents",
        location: "School Ground",
        description: "विद्यार्थीहरूले तयार गरेका विज्ञान परियोजना तथा प्रयोगात्मक सामग्रीहरूको वार्षिक प्रदर्शनी।"
    },
    {
        id: 4,
        title: "विद्यालय बिदा",
        date: "2026-09-27",
        startTime: "",
        endTime: "",
        category: "Holiday",
        audience: "Everyone",
        location: "School Closed",
        description: "यस दिन विद्यालय बन्द रहनेछ।"
    },
    {
        id: 5,
        title: "खेलकुद दिवस",
        date: "2026-09-30",
        startTime: "09:00",
        endTime: "16:00",
        category: "Event",
        audience: "Students & Parents",
        location: "School Ground",
        description: "विभिन्न कक्षाका विद्यार्थीहरूको सहभागितामा वार्षिक खेलकुद दिवस।"
    },
    {
        id: 6,
        title: "शिक्षक कर्मचारी बैठक",
        date: "2026-09-16",
        startTime: "14:00",
        endTime: "15:30",
        category: "Meeting",
        audience: "Teachers",
        location: "Staff Room",
        description: "शैक्षिक गतिविधि तथा आगामी कार्यक्रमहरूको समीक्षा गर्न मासिक कर्मचारी बैठक।"
    },
    {
        id: 7,
        title: "दशैं बिदा",
        date: "2026-10-17",
        startTime: "",
        endTime: "",
        category: "Holiday",
        audience: "Everyone",
        location: "School Closed",
        description: "दशैं पर्वको अवसरमा विद्यालय बिदा।"
    },
    {
        id: 8,
        title: "विद्यालय फोटो दिवस",
        date: "2026-10-05",
        startTime: "09:00",
        endTime: "14:00",
        category: "Event",
        audience: "Students",
        location: "School Hall",
        description: "विद्यार्थीहरूको वार्षिक फोटो खिच्ने कार्यक्रम।"
    }
];

let todayBs = adToBs(new Date());

let currentBsYear = todayBs.year;
let currentBsMonth = todayBs.month;
let editingEventId = null;

const calendarGrid = document.getElementById("calendarGrid");
const calendarMonth = document.getElementById("calendarMonth");
const calendarSubtitle = document.getElementById("calendarSubtitle");
const eventsList = document.getElementById("eventsList");
const eventsEmpty = document.getElementById("eventsEmpty");
const eventSearch = document.getElementById("eventSearch");
const categoryFilter = document.getElementById("categoryFilter");

const eventModal = document.getElementById("eventModal");
const viewModal = document.getElementById("viewModal");
const eventForm = document.getElementById("eventForm");

const eventDateInput = document.getElementById("eventDate");

function getMonthEvents(year, month) {
    return events.filter(event => {
        const bs = adToBs(
            new Date(`${event.date}T00:00:00`)
        );

        return bs.year === year && bs.month === month;
    });
}

function renderCalendar() {
    calendarMonth.textContent =
        `${nepaliMonths[currentBsMonth - 1]} ${toNepaliNumber(currentBsYear)}`;

    calendarSubtitle.textContent =
        `वि.सं. ${toNepaliNumber(currentBsYear)} · ${nepaliWeekdays.join(" · ")}`;

    calendarGrid.innerHTML = "";

    const firstDayDate =
        bsToAd(currentBsYear, currentBsMonth, 1);

    const firstDay = firstDayDate.getDay();

    const daysInMonth =
        getMonthDays(currentBsYear, currentBsMonth);

    const totalCells =
        Math.ceil((firstDay + daysInMonth) / 7) * 7;

    for (let index = 0; index < totalCells; index++) {
        const dayElement =
            document.createElement("div");

        dayElement.className = "calendar-day";

        let displayDay;
        let cellYear;
        let cellMonth;

        if (index < firstDay) {
            const previousMonth =
                currentBsMonth === 1
                    ? 12
                    : currentBsMonth - 1;

            const previousYear =
                currentBsMonth === 1
                    ? currentBsYear - 1
                    : currentBsYear;

            const previousDays =
                getMonthDays(
                    previousYear,
                    previousMonth
                );

            displayDay =
                previousDays - firstDay + index + 1;

            cellYear = previousYear;
            cellMonth = previousMonth;

            dayElement.classList.add("other-month");
        } else if (
            index >= firstDay + daysInMonth
        ) {
            const nextMonth =
                currentBsMonth === 12
                    ? 1
                    : currentBsMonth + 1;

            const nextYear =
                currentBsMonth === 12
                    ? currentBsYear + 1
                    : currentBsYear;

            displayDay =
                index - firstDay - daysInMonth + 1;

            cellYear = nextYear;
            cellMonth = nextMonth;

            dayElement.classList.add("other-month");
        } else {
            displayDay =
                index - firstDay + 1;

            cellYear = currentBsYear;
            cellMonth = currentBsMonth;
        }

        const cellAdDate =
            bsToAd(
                cellYear,
                cellMonth,
                displayDay
            );

        const dateKey =
            getDateKey(cellAdDate);

        const today =
            adToBs(new Date());

        if (
            today.year === cellYear &&
            today.month === cellMonth &&
            today.day === displayDay
        ) {
            dayElement.classList.add("today");
        }

        const number =
            document.createElement("div");

        number.className = "day-number";
        number.textContent =
            toNepaliNumber(displayDay);

        dayElement.appendChild(number);

        const dayEvents =
            events.filter(event => {
                return event.date === dateKey;
            });

        dayEvents.slice(0, 3).forEach(event => {
            const eventElement =
                document.createElement("div");

            eventElement.className =
                `calendar-event ${getEventClass(event.category)}`;

            eventElement.textContent =
                event.title;

            eventElement.addEventListener(
                "click",
                clickEvent => {
                    clickEvent.stopPropagation();
                    openViewModal(event);
                }
            );

            dayElement.appendChild(eventElement);
        });

        if (dayEvents.length > 3) {
            const more =
                document.createElement("div");

            more.className =
                "calendar-event";

            more.textContent =
                `+${toNepaliNumber(dayEvents.length - 3)} थप`;

            dayElement.appendChild(more);
        }

        dayElement.addEventListener("click", () => {
            openCreateModal(dateKey);
        });

        calendarGrid.appendChild(dayElement);
    }
}

function renderEvents() {
    const search =
        eventSearch.value.toLowerCase().trim();

    const category =
        categoryFilter.value;

    const filteredEvents =
        [...events]
            .filter(event => {
                const searchableText = [
                    event.title,
                    event.category,
                    event.audience,
                    event.location,
                    event.description
                ].join(" ").toLowerCase();

                const matchesSearch =
                    !search ||
                    searchableText.includes(search);

                const matchesCategory =
                    category === "all" ||
                    event.category === category;

                return matchesSearch &&
                    matchesCategory;
            })
            .sort((a, b) => {
                return new Date(a.date) -
                    new Date(b.date);
            });

    eventsList.innerHTML = "";

    filteredEvents.forEach(event => {
        const item =
            document.createElement("div");

        item.className = "event-item";

        const bs =
            adToBs(
                new Date(`${event.date}T00:00:00`)
            );

        const time =
            event.startTime
                ? `${formatTime(event.startTime)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ""}`
                : "पूरै दिन";

        item.innerHTML = `
            <div class="event-date-row">
                <span class="event-date">
                    ${toNepaliNumber(bs.day)}
                    ${nepaliMonths[bs.month - 1]}
                    ${toNepaliNumber(bs.year)}
                </span>
                <span class="event-category">
                    ${event.category}
                </span>
            </div>

            <div class="event-item-title">
                ${event.title}
            </div>

            <div class="event-item-details">
                ${time} · ${event.location || "विद्यालय"}
            </div>
        `;

        item.addEventListener("click", () => {
            openViewModal(event);
        });

        eventsList.appendChild(item);
    });

    eventsEmpty.classList.toggle(
        "show",
        filteredEvents.length === 0
    );
}

function updateStatistics() {
    const total =
        events.length;

    const monthCount =
        getMonthEvents(
            currentBsYear,
            currentBsMonth
        ).length;

    const today =
        new Date();

    today.setHours(0, 0, 0, 0);

    const upcoming =
        events.filter(event => {
            const date =
                new Date(`${event.date}T00:00:00`);

            return date >= today;
        }).length;

    const holidays =
        events.filter(event => {
            return event.category === "Holiday";
        }).length;

    document.getElementById("totalEvents")
        .textContent =
        toNepaliNumber(total);

    document.getElementById("monthEvents")
        .textContent =
        toNepaliNumber(monthCount);

    document.getElementById("upcomingEvents")
        .textContent =
        toNepaliNumber(upcoming);

    document.getElementById("holidayEvents")
        .textContent =
        toNepaliNumber(holidays);
}

function createBsDatePicker() {
    if (!eventDateInput) {
        return;
    }

    eventDateInput.style.display = "none";

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "bs-date-picker";

    wrapper.innerHTML = `
        <div class="bs-date-row">
            <select id="bsYear"></select>
            <select id="bsMonth"></select>
            <select id="bsDay"></select>
        </div>
        <div class="bs-date-preview" id="bsDatePreview"></div>
    `;

    eventDateInput.parentNode.appendChild(wrapper);

    const yearSelect =
        document.getElementById("bsYear");

    const monthSelect =
        document.getElementById("bsMonth");

    const daySelect =
        document.getElementById("bsDay");

    for (let year = 2082; year <= 2090; year++) {
        const option =
            document.createElement("option");

        option.value = year;
        option.textContent =
            `वि.सं. ${toNepaliNumber(year)}`;

        yearSelect.appendChild(option);
    }

    nepaliMonths.forEach((month, index) => {
        const option =
            document.createElement("option");

        option.value = index + 1;
        option.textContent = month;

        monthSelect.appendChild(option);
    });

    function updateDays() {
        const year =
            Number(yearSelect.value);

        const month =
            Number(monthSelect.value);

        const selectedDay =
            Number(daySelect.value || 1);

        const days =
            getMonthDays(year, month);

        daySelect.innerHTML = "";

        for (let day = 1; day <= days; day++) {
            const option =
                document.createElement("option");

            option.value = day;
            option.textContent =
                toNepaliNumber(day);

            daySelect.appendChild(option);
        }

        daySelect.value =
            String(Math.min(selectedDay, days));

        updatePreview();
    }

    function updatePreview() {
        const year =
            Number(yearSelect.value);

        const month =
            Number(monthSelect.value);

        const day =
            Number(daySelect.value);

        if (!year || !month || !day) {
            return;
        }

        const adDate =
            bsToAd(
                year,
                month,
                day
            );

        eventDateInput.value =
            getDateKey(adDate);

        document.getElementById(
            "bsDatePreview"
        ).textContent =
            `${toNepaliNumber(day)} ${nepaliMonths[month - 1]} ${toNepaliNumber(year)}`;
    }

    yearSelect.addEventListener(
        "change",
        updateDays
    );

    monthSelect.addEventListener(
        "change",
        updateDays
    );

    daySelect.addEventListener(
        "change",
        updatePreview
    );

    window.setBsDate =
        dateString => {
            const date =
                dateString
                    ? new Date(`${dateString}T00:00:00`)
                    : new Date();

            const bs =
                adToBs(date);

            yearSelect.value =
                String(bs.year);

            monthSelect.value =
                String(bs.month);

            updateDays();

            daySelect.value =
                String(bs.day);

            updatePreview();
        };

    window.getBsDate =
        () => {
            return {
                year: Number(yearSelect.value),
                month: Number(monthSelect.value),
                day: Number(daySelect.value)
            };
        };

    window.setBsDate(
        eventDateInput.value
    );
}

function openCreateModal(date = "") {
    editingEventId = null;

    document.getElementById(
        "modalTitle"
    ).textContent =
        "नयाँ कार्यक्रम थप्नुहोस्";

    eventForm.reset();

    document.getElementById(
        "eventCategory"
    ).value = "Academic";

    document.getElementById(
        "eventAudience"
    ).value = "Everyone";

    if (date) {
        window.setBsDate(date);
    } else {
        window.setBsDate(
            getDateKey(new Date())
        );
    }

    eventModal.classList.add("show");
}

function openEditModal(event) {
    editingEventId =
        event.id;

    document.getElementById(
        "modalTitle"
    ).textContent =
        "कार्यक्रम सम्पादन गर्नुहोस्";

    document.getElementById(
        "eventTitle"
    ).value =
        event.title;

    document.getElementById(
        "eventCategory"
    ).value =
        event.category;

    document.getElementById(
        "eventStartTime"
    ).value =
        event.startTime;

    document.getElementById(
        "eventEndTime"
    ).value =
        event.endTime;

    document.getElementById(
        "eventAudience"
    ).value =
        event.audience;

    document.getElementById(
        "eventLocation"
    ).value =
        event.location;

    document.getElementById(
        "eventDescription"
    ).value =
        event.description;

    window.setBsDate(
        event.date
    );

    eventModal.classList.add("show");
}

function closeEventModal() {
    eventModal.classList.remove("show");
    editingEventId = null;
}

function openViewModal(event) {
    const bs =
        adToBs(
            new Date(`${event.date}T00:00:00`)
        );

    document.getElementById(
        "viewCategory"
    ).textContent =
        event.category;

    document.getElementById(
        "viewTitle"
    ).textContent =
        event.title;

    document.getElementById(
        "viewDate"
    ).textContent =
        `${toNepaliNumber(bs.day)} ${nepaliMonths[bs.month - 1]} ${toNepaliNumber(bs.year)}`;

    const time =
        event.startTime
            ? `${formatTime(event.startTime)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ""}`
            : "पूरै दिन";

    document.getElementById(
        "viewTime"
    ).textContent =
        time;

    document.getElementById(
        "viewAudience"
    ).textContent =
        event.audience;

    document.getElementById(
        "viewLocation"
    ).textContent =
        event.location ||
        "उल्लेख गरिएको छैन";

    document.getElementById(
        "viewDescription"
    ).textContent =
        event.description ||
        "कुनै विवरण उपलब्ध छैन।";

    const existingActions =
        document.querySelector(
            ".view-actions"
        );

    if (existingActions) {
        existingActions.remove();
    }

    const actions =
        document.createElement("div");

    actions.className =
        "view-actions";

    const editButton =
        document.createElement("button");

    editButton.className =
        "secondary-button";

    editButton.textContent =
        "Edit";

    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "secondary-button";

    deleteButton.textContent =
        "Delete";

    deleteButton.style.color =
        "#dc3545";

    editButton.addEventListener(
        "click",
        () => {
            closeViewModal();
            openEditModal(event);
        }
    );

    deleteButton.addEventListener(
        "click",
        () => {
            const confirmed =
                confirm(
                    "Are you sure you want to delete this event?"
                );

            if (!confirmed) {
                return;
            }

            const index =
                events.findIndex(
                    item =>
                        item.id === event.id
                );

            if (index !== -1) {
                events.splice(index, 1);
            }

            closeViewModal();
            renderCalendar();
            renderEvents();
            updateStatistics();

            alert(
                "कार्यक्रम सफलतापूर्वक हटाइयो।"
            );
        }
    );

    const footer =
        viewModal.querySelector(
            ".modal-footer"
        );

    actions.appendChild(
        editButton
    );

    actions.appendChild(
        deleteButton
    );

    footer.insertBefore(
        actions,
        footer.firstChild
    );

    viewModal.classList.add("show");
}

function closeViewModal() {
    viewModal.classList.remove("show");

    const actions =
        document.querySelector(
            ".view-actions"
        );

    if (actions) {
        actions.remove();
    }
}

document.getElementById(
    "addEventButton"
).addEventListener(
    "click",
    () => {
        openCreateModal();
    }
);

document.getElementById(
    "closeModal"
).addEventListener(
    "click",
    closeEventModal
);

document.getElementById(
    "cancelModal"
).addEventListener(
    "click",
    closeEventModal
);

document.getElementById(
    "closeViewModal"
).addEventListener(
    "click",
    closeViewModal
);

document.getElementById(
    "closeViewButton"
).addEventListener(
    "click",
    closeViewModal
);

eventModal.addEventListener(
    "click",
    event => {
        if (event.target === eventModal) {
            closeEventModal();
        }
    }
);

viewModal.addEventListener(
    "click",
    event => {
        if (event.target === viewModal) {
            closeViewModal();
        }
    }
);

eventForm.addEventListener(
    "submit",
    event => {
        event.preventDefault();

        const title =
            document.getElementById(
                "eventTitle"
            ).value.trim();

        const date =
            document.getElementById(
                "eventDate"
            ).value;

        const startTime =
            document.getElementById(
                "eventStartTime"
            ).value;

        const endTime =
            document.getElementById(
                "eventEndTime"
            ).value;

        const category =
            document.getElementById(
                "eventCategory"
            ).value;

        const audience =
            document.getElementById(
                "eventAudience"
            ).value;

        const location =
            document.getElementById(
                "eventLocation"
            ).value.trim();

        const description =
            document.getElementById(
                "eventDescription"
            ).value.trim();

        if (!date) {
            alert(
                "कृपया मिति चयन गर्नुहोस्।"
            );
            return;
        }

        if (editingEventId) {
            const index =
                events.findIndex(
                    event =>
                        event.id ===
                        editingEventId
                );

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

            alert(
                "कार्यक्रम सफलतापूर्वक अपडेट भयो।"
            );
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

            alert(
                "कार्यक्रम सफलतापूर्वक थपियो।"
            );
        }

        renderCalendar();
        renderEvents();
        updateStatistics();
        closeEventModal();
    }
);

document.getElementById(
    "previousMonth"
).addEventListener(
    "click",
    () => {
        currentBsMonth--;

        if (currentBsMonth < 1) {
            currentBsMonth = 12;
            currentBsYear--;
        }

        renderCalendar();
        renderEvents();
        updateStatistics();
    }
);

document.getElementById(
    "nextMonth"
).addEventListener(
    "click",
    () => {
        currentBsMonth++;

        if (currentBsMonth > 12) {
            currentBsMonth = 1;
            currentBsYear++;
        }

        renderCalendar();
        renderEvents();
        updateStatistics();
    }
);

document.getElementById(
    "todayButton"
).addEventListener(
    "click",
    () => {
        const today =
            adToBs(new Date());

        currentBsYear =
            today.year;

        currentBsMonth =
            today.month;

        renderCalendar();
        renderEvents();
        updateStatistics();
    }
);

eventSearch.addEventListener(
    "input",
    renderEvents
);

categoryFilter.addEventListener(
    "change",
    renderEvents
);

document.getElementById(
    "topSearch"
).addEventListener(
    "input",
    event => {
        eventSearch.value =
            event.target.value;

        renderEvents();
    }
);

document.querySelector(
    ".notification-button"
).addEventListener(
    "click",
    () => {
        alert(
            "तपाईंका ३ वटा नयाँ सूचनाहरू छन्।"
        );
    }
);

document.querySelectorAll(
    ".nav-item"
).forEach(item => {
    item.addEventListener(
        "click",
        () => {
            if (window.innerWidth <= 900) {
                sidebar.classList.remove("open");
                sidebarOverlay.classList.remove("show");
            }
        }
    );
});

createBsDatePicker();

renderCalendar();
renderEvents();
updateStatistics();