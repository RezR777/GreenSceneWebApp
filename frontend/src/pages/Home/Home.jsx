import { Link } from "react-router-dom";
import "./Home.css";
import aiBotIcon from "../../assets/icons/GreenSceneAIBot.png";
import profileIcon from "../../assets/icons/white-profile-icon.jpg";

const categories = [
  { name: "Arts / Music", icon: "♪" },
  { name: "Academic", icon: "📖" },
  { name: "Sports", icon: "⚽" },
  { name: "Social", icon: "👥" },
  { name: "Gaming", icon: "🎮" },
  { name: "Volunteer", icon: "🤝" },
  { name: "Fundraising", icon: "💰" },
  { name: "Cultural", icon: "🌎" },
];

const events = [
  {
    title: "Campus Movie Night",
    date: "Fri, Jun 30",
    time: "3:00 PM",
    location: "Room 201",
  },
  {
    title: "UNT Study Jam",
    date: "Sat, Jul 1",
    time: "1:30 PM",
    location: "Willis Library",
  },
  {
    title: "Club Mixer",
    date: "Sun, Jul 2",
    time: "5:00 PM",
    location: "Union 314",
  },
  {
    title: "Mean Green Tailgate",
    date: "Mon, Jul 3",
    time: "6:00 PM",
    location: "Apogee Stadium",
  },
  {
    title: "Art Workshop",
    date: "Tue, Jul 4",
    time: "2:00 PM",
    location: "Art Building",
  },
  {
    title: "Career Prep Meetup",
    date: "Wed, Jul 5",
    time: "4:00 PM",
    location: "Sage Hall",
  },
];

function ImagePlaceholder({ large = false }) {
  return (
    <div className={large ? "image-placeholder large" : "image-placeholder"}>
      <span className="shape triangle"></span>
      <span className="shape burst"></span>
      <span className="shape square"></span>
    </div>
  );
}

function Home() {
  return (
    <main className="home-page">
      <header className="top-nav">
        <Link to="/" className="brand">
          <span>
            Green<span>Scene</span>
          </span>
        </Link>

        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input type="text" placeholder="Search" />
        </div>

        <nav className="nav-links">
          <a href="#categories">Discover Clubs</a>
          <a href="#events">Event Calendar</a>
          <Link to="/create-event">Create Event</Link>
          <Link to="/profile">Settings</Link>
        </nav>

        <Link to="/login" className="profile-button" aria-label="Go to login page">
        <img src={profileIcon} alt="Profile" />
        </Link>
      </header>

      <section className="hero-section">
        <div className="todays-event">
          <h1>See Today’s Events</h1>

          <article className="featured-card">
            <h2>Gameday Grille 30 min</h2>
            <ImagePlaceholder large />
          </article>
        </div>

        <div className="trending-section">
          <h1>Trending Now</h1>

          <div className="trending-row">
            <article className="trending-card">
              <ImagePlaceholder />
            </article>
            <article className="trending-card">
              <ImagePlaceholder />
            </article>
            <article className="trending-card">
              <ImagePlaceholder />
            </article>
          </div>

          <div className="category-row" id="categories">
            {categories.map((category) => (
              <button className="category-button" key={category.name}>
                <span>{category.icon}</span>
                <p>{category.name}</p>
              </button>
            ))}
            <button className="category-button empty" aria-label="More categories"></button>
          </div>
        </div>
      </section>

      <section className="event-section" id="events">
        <div className="event-tabs">
          <button className="active">All</button>
          <button>Tomorrow</button>
          <button>This Weekend</button>
        </div>

        <div className="event-grid">
          {events.map((event) => (
            <article className="event-card" key={event.title}>
              <ImagePlaceholder />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>
                  {event.date} • {event.time}
                </p>
                <span>{event.location}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Link to="/ai-assistant" className="chatbot-button">
        <img src={aiBotIcon} alt="GreenScene AI Bot" />
      </Link>
    </main>
  );
}

export default Home;
