import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import aiBotIcon from "../../assets/icons/GreenSceneAIBot.png";
import ChatWidget from "../../components/Chatbot/ChatWidget";
import profileIcon from "../../assets/icons/white-profile-icon.jpg";

import { useEvents } from "../../context/EventContext.jsx";

const categories = [
  { name: "Arts / Music", icon: "♫" },
  { name: "Academic", icon: "📚" },
  { name: "Sports", icon: "⚽" },
  { name: "Social", icon: "👥" },
  { name: "Gaming", icon: "🎮" },
  { name: "Volunteer", icon: "🤝" },
  { name: "Fundraising", icon: "💰" },
  { name: "Cultural", icon: "🌎" },
];

const timeFilters = [
  { value: "all", label: "All" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "weekend", label: "This Weekend" },
];

function getEventDate(event) {
  if (!event) {
    return null;
  }

  const storedDate = new Date(event.date);

  if (!Number.isNaN(storedDate.getTime())) {
    return storedDate;
  }

  if (event.date && event.time) {
    const legacyDate = new Date(`${event.date} ${event.time}`);

    if (!Number.isNaN(legacyDate.getTime())) {
      return legacyDate;
    }
  }

  return null;
}

function formatEventDate(event) {
  const eventDate = getEventDate(event);

  if (!eventDate) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(eventDate);
}

function formatEventTime(event) {
  const eventDate = getEventDate(event);

  if (!eventDate) {
    return event.time || "Time unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(eventDate);
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

function getEventCategory(event) {
  if (event?.category) {
    return event.category;
  }

  if (Array.isArray(event?.tags) && event.tags.length > 0) {
    const matchingCategory = categories.find((category) =>
      event.tags.some(
        (tag) =>
          String(tag).toLowerCase() === category.name.toLowerCase()
      )
    );

    return matchingCategory?.name || event.tags[0];
  }

  return "Campus Event";
}

function isSameCalendarDay(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

function isTomorrow(eventDate) {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return isSameCalendarDay(eventDate, tomorrow);
}

function isThisWeekend(eventDate) {
  const today = new Date();
  const currentDay = today.getDay();

  const daysUntilSaturday = (6 - currentDay + 7) % 7;

  const saturday = new Date(today);
  saturday.setDate(today.getDate() + daysUntilSaturday);
  saturday.setHours(0, 0, 0, 0);

  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  sunday.setHours(23, 59, 59, 999);

  return eventDate >= saturday && eventDate <= sunday;
}

function ImagePlaceholder({
  large = false,
  image = "",
  alt = "",
}) {
  if (image) {
    return (
      <img
        className={`image-placeholder ${large ? "large" : ""}`}
        src={image}
        alt={alt}
      />
    );
  }

  return (
    <div
      className={`image-placeholder ${large ? "large" : ""}`}
      role="img"
      aria-label={alt || "No event flyer available"}
    >
      <svg
        viewBox="0 0 300 180"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <rect width="300" height="180" fill="#eeeaf1" />

        <circle
          cx="95"
          cy="108"
          r="29"
          fill="#d1cad6"
        />

        <rect
          x="145"
          y="85"
          width="58"
          height="58"
          rx="12"
          fill="#d1cad6"
        />

        <path
          d="M150 28 C135 44, 125 59, 128 70 C132 85, 168 84, 172 69 C175 57, 161 39, 150 28Z"
          fill="#d1cad6"
        />
      </svg>
    </div>
  );
}

function CategoryIcon({ icon }) {
  return (
    <svg
      className="category-icon"
      viewBox="0 0 80 60"
      aria-hidden="true"
    >
      <text
        x="40"
        y="41"
        textAnchor="middle"
        fontSize="30"
      >
        {icon}
      </text>
    </svg>
  );
}

function EventCard({ event }) {
  const eventId = event._id || event.id;
  const category = getEventCategory(event);
  const duration = formatDuration(event.durationMinutes);

  return (
    <Link
      className="event-card-link"
      to={`/event/${eventId}`}
      aria-label={`View details for ${event.title}`}
    >
      <article className="event-card">
        <div className="event-card-thumb">
          <ImagePlaceholder
            image={event.flyerUrl}
            alt={
              event.flyerUrl
                ? `${event.title} event flyer`
                : `No flyer uploaded for ${event.title}`
            }
          />
        </div>

        <div className="ticket-seam" aria-hidden="true">
          <span className="ticket-notch left" />
          <span className="ticket-notch right" />
        </div>

        <div className="event-info">
          <span className="event-category-tag">
            {category}
          </span>

          <h3>{event.title}</h3>

          <p>
            {formatEventDate(event)} •{" "}
            {formatEventTime(event)}
          </p>

          <span>
            {event.location || "Location unavailable"}

            {duration ? ` • ${duration}` : ""}
          </span>
        </div>
      </article>
    </Link>
  );
}

function Home() {
  /*
   * These defaults keep Home from crashing while EventContext is
   * loading. FIXED.
   */
  const {
    events = [],
    loading = false,
    error: eventError = "",
  } = useEvents();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [selectedTimeFilter, setSelectedTimeFilter] =
    useState("all");

  /*
   * This will sort events by their starting date.
   * Invalid dates are placed at the bottom.
   */
  const sortedEvents = useMemo(() => {
    return [...events].sort((firstEvent, secondEvent) => {
      const firstDate = getEventDate(firstEvent);
      const secondDate = getEventDate(secondEvent);

      if (!firstDate && !secondDate) {
        return 0;
      }

      if (!firstDate) {
        return 1;
      }

      if (!secondDate) {
        return -1;
      }

      return firstDate.getTime() - secondDate.getTime();
    });
  }, [events]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return sortedEvents.filter((event) => {
      const eventDate = getEventDate(event);
      const eventCategory = getEventCategory(event);

      const searchableText = [
        event.title,
        event.description,
        event.location,
        eventCategory,
        ...(Array.isArray(event.tags) ? event.tags : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableText.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All" ||
        eventCategory.toLowerCase() ===
          selectedCategory.toLowerCase() ||
        event.tags?.some(
          (tag) =>
            String(tag).toLowerCase() ===
            selectedCategory.toLowerCase()
        );

      let matchesTime = true;

      if (eventDate && selectedTimeFilter === "tomorrow") {
        matchesTime = isTomorrow(eventDate);
      }

      if (eventDate && selectedTimeFilter === "weekend") {
        matchesTime = isThisWeekend(eventDate);
      }

      if (!eventDate && selectedTimeFilter !== "all") {
        matchesTime = false;
      }

      return matchesSearch && matchesCategory && matchesTime;
    });
  }, [
    sortedEvents,
    searchQuery,
    selectedCategory,
    selectedTimeFilter,
  ]);

   const featuredEvent = useMemo(() => {
  const today = new Date();

  return (
    sortedEvents.find((event) => {
      const eventDate = getEventDate(event);

      return (
        eventDate &&
        isSameCalendarDay(eventDate, today)
      );
    }) || null
  );
}, [sortedEvents]);

  /*
   * going to use the three newest created
   * events as the Trending Now events.
   */
  const trendingEvents = useMemo(() => {
    return [...events]
      .sort((firstEvent, secondEvent) => {
        const firstCreated = new Date(
          firstEvent.createdAt || firstEvent.date
        );

        const secondCreated = new Date(
          secondEvent.createdAt || secondEvent.date
        );

        return secondCreated.getTime() - firstCreated.getTime();
      })
      .slice(0, 3);
  }, [events]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory((currentCategory) =>
      currentCategory === categoryName ? "All" : categoryName
    );
  };

  return (
    <main className="home-page">
      <header className="top-nav">
        <Link className="brand" to="/">
          <span>
            Green<span>Scene</span>
          </span>
        </Link>

        <label className="search-bar">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search events, tags, or locations"
            aria-label="Search events"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />
        </label>

        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/explore-events">Discover Clubs</Link>
          <Link to="/calendar">Event Calendar</Link>
          <Link to="/create-event">Create Event</Link>
          <Link to="/profile">Settings</Link>
        </nav>

        <Link
          className="profile-button"
          to="/profile"
          aria-label="Open profile settings"
        >
          <img src={profileIcon} alt="" />
        </Link>
      </header>

      <section className="hero-section">
        <div className="todays-events">
  <h1>See Today’s Events</h1>

  {featuredEvent ? (
    <Link
      className="featured-card-link"
      to={`/event/${featuredEvent._id || featuredEvent.id}`}
      aria-label={`View details for ${featuredEvent.title}`}
    >
      <article className="featured-card">
        <ImagePlaceholder
          large
          image={featuredEvent.flyerUrl}
          alt={
            featuredEvent.flyerUrl
              ? `${featuredEvent.title} event flyer`
              : `No flyer uploaded for ${featuredEvent.title}`
          }
        />

        <div className="featured-caption">
          <h2>{featuredEvent.title}</h2>

          <p>
            {formatEventDate(featuredEvent)} •{" "}
            {formatEventTime(featuredEvent)}

            {formatDuration(
              featuredEvent.durationMinutes
            )
              ? ` • ${formatDuration(
                  featuredEvent.durationMinutes
                )}`
              : ""}
          </p>

          <span>
            {featuredEvent.location ||
              "Location unavailable"}
          </span>
        </div>
      </article>
    </Link>
  ) : (
    <div className="featured-empty-state">
      <h2>No events happening today</h2>

      <p>
        Events scheduled for today will appear here.
      </p>

      <Link
        className="featured-create-button"
        to="/create-event"
      >
        Create Event
      </Link>
    </div>
  )}
</div>
        <div>
          <h1>Trending Now</h1>

          <div className="trending-row">
            {trendingEvents.length > 0 ? (
                trendingEvents.map((event) => {
                    const eventId = event._id || event.id;

                    return (
                        <Link
                            className="trending-card-link"
                            to={`/event/${eventId}`}
                            key={eventId}
                            aria-label={`View details for ${event.title}`}
                        >
                            <article className="trending-card">
                                <ImagePlaceholder
                                    image={event.flyerUrl}
                                    alt={
                                        event.flyerUrl
                                        ? `${event.title} event flyer`
                                        : `No flyer uploaded for ${event.title}`
                                    }
                                />

                                <p className="trending-title">
                                    {event.title}
                                </p>
                            </article>
                        </Link>
                    );
                })
            ) : (
            <div className="trending-empty-state">
                <p>No trending events yet.</p>
            </div>
        )}
        </div>

          <div
            className="category-row"
            aria-label="Filter events by category"
          >
            {categories.map((category) => (
              <button
                className="category-button"
                type="button"
                key={category.name}
                onClick={() =>
                  handleCategoryClick(category.name)
                }
                aria-pressed={
                  selectedCategory === category.name
                }
                title={`Show ${category.name} events`}
              >
                <CategoryIcon icon={category.icon} />
                <p>{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="event-section">
        <div
          className="event-tabs"
          aria-label="Filter events by date"
        >
          {timeFilters.map((filter) => (
            <button
              className={
                selectedTimeFilter === filter.value
                  ? "active"
                  : ""
              }
              type="button"
              key={filter.value}
              onClick={() =>
                setSelectedTimeFilter(filter.value)
              }
            >
              {filter.label}
            </button>
          ))}
        </div>

        {selectedCategory !== "All" && (
          <p className="active-filter-message">
            Showing {selectedCategory} events.{" "}
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
            >
              Clear category
            </button>
          </p>
        )}

        {loading && (
          <p className="home-status-message">
            Loading events...
          </p>
        )}

        {!loading && eventError && (
          <p className="home-status-message home-error-message">
            {eventError}
          </p>
        )}

        {!loading &&
          !eventError &&
          filteredEvents.length === 0 && (
            <div className="home-empty-state">
              <h2>No matching events</h2>

              <p>
                Try another search or create a new campus event.
              </p>

              <Link to="/create-event">
                Create Event
              </Link>
            </div>
          )}

        {!loading &&
          !eventError &&
          filteredEvents.length > 0 && (
            <div className="event-grid">
              {filteredEvents.map((event, index) => (
                <EventCard
                  event={event}
                  key={
                    event._id ||
                    event.id ||
                    `${event.title}-${index}`
                  }
                />
              ))}
            </div>
          )}
      </section>

      <ChatWidget events={events} />
    </main>
  );
}

export default Home;