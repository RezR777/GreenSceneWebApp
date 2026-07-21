import { Link } from "react-router-dom";
import "./Home.css";
import aiBotIcon from "../../assets/icons/GreenSceneAIBot.png";
import profileIcon from "../../assets/icons/white-profile-icon.jpg";
import { useEvents } from "../../context/EventContext.jsx";

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

function ImagePlaceholder({ large = false, image = null, alt = "" }) {
    if (image) {
        return (
            <img
                src={image}
                alt={alt}
                className={large ? "image-placeholder large" : "image-placeholder"}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
        );
    }
    return (
        <div className={large ? "image-placeholder large" : "image-placeholder"}>
            <span className="shape triangle"></span>
            <span className="shape burst"></span>
            <span className="shape square"></span>
        </div>
    );
}

function Home() {
    const { events } = useEvents();

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
                            <ImagePlaceholder image={event.image} alt={event.title} />
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
