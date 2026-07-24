import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useEvents } from "../../context/EventContext.jsx";
import "./EventCalendar.css";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function makeDateKey(date) {
  return [
    date.getFullYear(),
    padNumber(date.getMonth() + 1),
    padNumber(date.getDate()),
  ].join("-");
}

function getEventDateKey(eventDate) {
  if (!eventDate) {
    return "";
  }

  /*
   * MongoDB dates often arrive as:
   * 2026-07-23T19:30:00.000Z
   *
   * Taking the first ten characters prevents timezone conversion
   * from moving the event to the previous or following calendar day.
   */
  if (
    typeof eventDate === "string" &&
    /^\d{4}-\d{2}-\d{2}/.test(eventDate)
  ) {
    return eventDate.slice(0, 10);
  }

  const parsedDate = new Date(eventDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return makeDateKey(parsedDate);
}

function dateFromKey(dateKey) {
  return new Date(`${dateKey}T12:00:00`);
}

function formatDisplayDate(dateKey) {
  if (!dateKey) {
    return "Select a date";
  }

  const date = dateFromKey(dateKey);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatEventTime(event) {
  if (event?.time) {
    return event.time;
  }

  if (!event?.date) {
    return "Time TBA";
  }

  const rawDate = String(event.date);

  /*
   * A date with no time should not display midnight.
   */
  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    return "Time TBA";
  }

  const parsedDate = new Date(event.date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Time TBA";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);
}

function formatDuration(durationMinutes) {
  const minutes = Number(durationMinutes);

  if (!minutes || Number.isNaN(minutes)) {
    return "";
  }

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function getEventImage(event) {
  return (
    event?.flyerUrl ||
    event?.imageUrl ||
    event?.eventImage ||
    event?.flyer ||
    ""
  );
}

function getEventKey(event, index = 0) {
  return (
    event?._id ||
    event?.id ||
    `${event?.title || "event"}-${event?.date || index}-${index}`
  );
}

function getEventTags(event) {
  const tags = [];

  if (event?.category) {
    tags.push(event.category);
  }

  if (Array.isArray(event?.tags)) {
    tags.push(...event.tags);
  }

  if (event?.status) {
    tags.push(event.status);
  }

  return [...new Set(tags.filter(Boolean))].slice(0, 4);
}

function buildCalendarCells(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  /*
   * Add the ending days from the previous month.
   */
  for (let index = firstWeekday - 1; index >= 0; index -= 1) {
    const date = new Date(year, month, -index);

    cells.push({
      date,
      key: makeDateKey(date),
      day: date.getDate(),
      inCurrentMonth: false,
    });
  }

  /*
   * Add all days in the selected month.
   */
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);

    cells.push({
      date,
      key: makeDateKey(date),
      day,
      inCurrentMonth: true,
    });
  }

  /*
   * Finish the final week with days from the next month.
   */
  let nextMonthDay = 1;

  while (cells.length % 7 !== 0) {
    const date = new Date(year, month + 1, nextMonthDay);

    cells.push({
      date,
      key: makeDateKey(date),
      day: date.getDate(),
      inCurrentMonth: false,
    });

    nextMonthDay += 1;
  }

  return cells;
}

function FeaturedEventImage({ event }) {
  const imageUrl = getEventImage(event);

  if (!imageUrl) {
    return (
      <div
        className="event-calendar-featured-placeholder"
        role="img"
        aria-label="No event flyer uploaded"
      >
        <span>No event flyer uploaded</span>
      </div>
    );
  }

  return (
    <img
      className="event-calendar-featured-flyer"
      src={imageUrl}
      alt={`${event.title} event flyer`}
    />
  );
}

function EventCalendar() {
  const today = new Date();
  const todayKey = makeDateKey(today);

  const {
    events = [],
    loading = false,
    error: eventError = "",
  } = useEvents();

  const [selectedDateKey, setSelectedDateKey] =
    useState(todayKey);

  const [viewMonth, setViewMonth] = useState(
    today.getMonth()
  );

  const [viewYear, setViewYear] = useState(
    today.getFullYear()
  );

  /*
   * This lets the flyer at the top change when a day has
   * more than one event and the user selects another card.
   */
  const [activeEventKey, setActiveEventKey] = useState("");

  const calendarCells = useMemo(() => {
    return buildCalendarCells(viewYear, viewMonth);
  }, [viewYear, viewMonth]);

  const eventsByDate = useMemo(() => {
    return events.reduce((groupedEvents, event) => {
      const dateKey = getEventDateKey(event.date);

      if (!dateKey) {
        return groupedEvents;
      }

      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }

      groupedEvents[dateKey].push(event);

      return groupedEvents;
    }, {});
  }, [events]);

  const selectedEvents = useMemo(() => {
    const matchingEvents = eventsByDate[selectedDateKey] || [];

    return [...matchingEvents].sort((firstEvent, secondEvent) => {
      const firstDate = new Date(firstEvent.date);
      const secondDate = new Date(secondEvent.date);

      const firstTime = Number.isNaN(firstDate.getTime())
        ? 0
        : firstDate.getTime();

      const secondTime = Number.isNaN(secondDate.getTime())
        ? 0
        : secondDate.getTime();

      return firstTime - secondTime;
    });
  }, [eventsByDate, selectedDateKey]);

  const featuredEvent = useMemo(() => {
    if (selectedEvents.length === 0) {
      return null;
    }

    if (activeEventKey) {
      const activeEvent = selectedEvents.find(
        (event, index) =>
          getEventKey(event, index) === activeEventKey
      );

      if (activeEvent) {
        return activeEvent;
      }
    }

    return selectedEvents[0];
  }, [selectedEvents, activeEventKey]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (
      let year = currentYear - 4;
      year <= currentYear + 5;
      year += 1
    ) {
      years.push(year);
    }

    return years;
  }, []);

  function handleDayClick(cell) {
    setSelectedDateKey(cell.key);
    setActiveEventKey("");

    /*
     * Clicking a faded day from the previous or next month
     * also changes the calendar to that month.
     */
    if (!cell.inCurrentMonth) {
      setViewMonth(cell.date.getMonth());
      setViewYear(cell.date.getFullYear());
    }
  }

  function goToPreviousMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((currentYear) => currentYear - 1);
      return;
    }

    setViewMonth((currentMonth) => currentMonth - 1);
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((currentYear) => currentYear + 1);
      return;
    }

    setViewMonth((currentMonth) => currentMonth + 1);
  }

  function handleEventCardKeyDown(
    keyboardEvent,
    eventKey
  ) {
    if (
      keyboardEvent.key === "Enter" ||
      keyboardEvent.key === " "
    ) {
      keyboardEvent.preventDefault();
      setActiveEventKey(eventKey);
    }
  }

  return (
    <main className="event-calendar-page">
      <header className="event-calendar-topbar">
        <Link to="/" className="event-calendar-logo">
          <span>
            Green<span>Scene</span>
          </span>
        </Link>

        <nav
          className="event-calendar-nav-links"
          aria-label="Calendar navigation"
        >
          <Link to="/explore-events">
            Discover Clubs
          </Link>

          <Link to="/create-event">
            Create Event
          </Link>

          <Link to="/profile">
            Settings
          </Link>
        </nav>
      </header>

      <section className="event-calendar-title-section">
        <h1>Event Calendar</h1>
        <p>Find interesting events by date!</p>
      </section>

      <section className="event-calendar-content">
        <div className="event-calendar-card">
          <div className="event-calendar-controls">
            <button
              type="button"
              onClick={goToPreviousMonth}
              aria-label="View previous month"
            >
              ‹
            </button>

            <select
              value={viewMonth}
              onChange={(event) =>
                setViewMonth(Number(event.target.value))
              }
              aria-label="Select month"
            >
              {MONTHS.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={viewYear}
              onChange={(event) =>
                setViewYear(Number(event.target.value))
              }
              aria-label="Select year"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={goToNextMonth}
              aria-label="View next month"
            >
              ›
            </button>
          </div>

          <div className="event-calendar-weekdays">
            {WEEKDAYS.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>

          <div className="event-calendar-grid">
            {calendarCells.map((cell) => {
              const dayEvents = eventsByDate[cell.key] || [];
              const isSelected =
                selectedDateKey === cell.key;
              const isToday = todayKey === cell.key;

              const classNames = [
                "event-calendar-day",
                !cell.inCurrentMonth
                  ? "outside-month"
                  : "",
                isSelected ? "selected-day" : "",
                isToday ? "today" : "",
                dayEvents.length > 0
                  ? "has-events"
                  : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  type="button"
                  key={cell.key}
                  className={classNames}
                  onClick={() => handleDayClick(cell)}
                  aria-label={`${formatDisplayDate(
                    cell.key
                  )}, ${dayEvents.length} ${
                    dayEvents.length === 1
                      ? "event"
                      : "events"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="event-calendar-day-number">
                    {cell.day}
                  </span>

                  {dayEvents.length > 0 && (
                    <span
                      className="event-calendar-event-marker"
                      aria-hidden="true"
                    >
                      <span className="event-calendar-dot" />

                      {dayEvents.length > 1 && (
                        <span className="event-calendar-more">
                          {dayEvents.length - 1}+
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="event-calendar-details">
          {/*
           * This is the only place the flyer is displayed.
           * It fills the entire gray area at the top.
           */}
          <div className="event-calendar-featured-image">
            <FeaturedEventImage event={featuredEvent} />
          </div>

          <div className="event-calendar-panel-body">
            {loading && (
              <p className="event-calendar-message">
                Loading events...
              </p>
            )}

            {!loading && eventError && (
              <p className="event-calendar-message error">
                {eventError}
              </p>
            )}

            {!loading &&
              !eventError &&
              selectedEvents.length === 0 && (
                <div className="event-calendar-empty">
                  <p className="event-calendar-selected-date">
                    {formatDisplayDate(selectedDateKey)}
                  </p>

                  <h2>No events yet</h2>

                  <p>
                    There are no created events scheduled
                    for this date.
                  </p>

                  <Link
                    to="/create-event"
                    className="event-calendar-create-link"
                  >
                    Create an Event
                  </Link>
                </div>
              )}

            {!loading &&
              !eventError &&
              selectedEvents.length > 0 && (
                <>
                  <div className="event-calendar-selected-header">
                    <p>
                      {formatDisplayDate(selectedDateKey)}
                    </p>

                    <h2>
                      {selectedEvents.length}{" "}
                      {selectedEvents.length === 1
                        ? "Event"
                        : "Events"}
                    </h2>
                  </div>

                  <div className="event-calendar-event-list">
                    {selectedEvents.map((event, index) => {
                      const eventId = event._id || event.id;
                      const eventKey = getEventKey(
                        event,
                        index
                      );

                      const isActive =
                        getEventKey(
                          featuredEvent,
                          selectedEvents.indexOf(
                            featuredEvent
                          )
                        ) === eventKey;

                      const duration = formatDuration(
                        event.durationMinutes
                      );

                      const tags = getEventTags(event);

                      return (
                        <article
                          key={eventKey}
                          className={`event-calendar-event-card ${
                            isActive ? "active" : ""
                          }`}
                          onClick={() =>
                            setActiveEventKey(eventKey)
                          }
                          onKeyDown={(keyboardEvent) =>
                            handleEventCardKeyDown(
                              keyboardEvent,
                              eventKey
                            )
                          }
                          role="button"
                          tabIndex={0}
                          aria-label={`Show flyer for ${event.title}`}
                        >
                          <h3>{event.title}</h3>

                          <p className="event-calendar-event-meta">
                            {formatDisplayDate(
                              getEventDateKey(event.date)
                            )}{" "}
                            • {formatEventTime(event)}
                            {duration
                              ? ` • ${duration}`
                              : ""}
                          </p>

                          <p className="event-calendar-location">
                            {event.location ||
                              "Location unavailable"}
                          </p>

                          <p className="event-calendar-description">
                            {event.description ||
                              "No description was added for this event."}
                          </p>

                          {tags.length > 0 && (
                            <div className="event-calendar-tags">
                              {tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                            </div>
                          )}

                          {eventId && (
                            <Link
                              to={`/event/${eventId}`}
                              className="event-calendar-details-link"
                              onClick={(clickEvent) =>
                                clickEvent.stopPropagation()
                              }
                            >
                              View Details
                            </Link>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </>
              )}
          </div>
        </aside>
      </section>
    </main>
  );
}

export default EventCalendar;