import { useMemo, useState } from "react";
import "./EventCalendar.css";
import { useEvents } from "../../context/EventContext.jsx";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

// Parses "Fri, Jun 30" -> { monthIndex: 5, day: 30 }
function parseEventDate(dateString) {
    const parts = dateString.split(", ")[1]?.split(" ");
    if (!parts || parts.length < 2) return null;
    const monthIndex = MONTH_ABBR.indexOf(parts[0]);
    const day = parseInt(parts[1], 10);
    if (monthIndex === -1 || Number.isNaN(day)) return null;
    return { monthIndex, day };
}

function buildMonthGrid(year, monthIndex) {
    const firstOfMonth = new Date(year, monthIndex, 1);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

    const cells = [];

    for (let i = startWeekday - 1; i >= 0; i--) {
        cells.push({ day: daysInPrevMonth - i, inMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push({ day, inMonth: true });
    }
    while (cells.length % 7 !== 0) {
        cells.push({ day: cells.length - (startWeekday + daysInMonth) + 1, inMonth: false });
    }

    return cells;
}

export default function EventCalendar() {
    const { events } = useEvents();
    const today = new Date();

    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    const cells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

    const eventsByDay = useMemo(() => {
        const map = new Map();
        events.forEach((event) => {
            const parsed = parseEventDate(event.date);
            if (parsed && parsed.monthIndex === viewMonth) {
                const list = map.get(parsed.day) || [];
                list.push(event);
                map.set(parsed.day, list);
            }
        });
        return map;
    }, [events, viewMonth]);

    const goToPrevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((year) => year - 1);
        } else {
            setViewMonth((month) => month - 1);
        }
    };

    const goToNextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((year) => year + 1);
        } else {
            setViewMonth((month) => month + 1);
        }
    };

    const isToday = (day, inMonth) =>
        inMonth &&
        day === today.getDate() &&
        viewMonth === today.getMonth() &&
        viewYear === today.getFullYear();

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h1 className="calendar-title">Campus Event Calendar</h1>

                <div className="calendar-nav">
                    <button onClick={goToPrevMonth} aria-label="Previous month">
                        ‹
                    </button>
                    <span className="calendar-month-label">
                        {MONTH_NAMES[viewMonth]} {viewYear}
                    </span>
                    <button onClick={goToNextMonth} aria-label="Next month">
                        ›
                    </button>
                </div>
            </div>

            <div className="calendar-weekdays">
                {WEEKDAYS.map((weekday) => (
                    <span key={weekday}>{weekday}</span>
                ))}
            </div>

            <div className="calendar-grid">
                {cells.map((cell, index) => {
                    const dayEvents = cell.inMonth ? eventsByDay.get(cell.day) || [] : [];
                    return (
                        <div
                            key={index}
                            className={`calendar-day ${cell.inMonth ? "" : "outside-month"} ${isToday(cell.day, cell.inMonth) ? "is-today" : ""
                                }`}
                        >
                            <span className="calendar-day-number">{cell.day}</span>
                            {dayEvents.map((event) => (
                                <div className="calendar-event" key={event.title} title={event.title}>
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
