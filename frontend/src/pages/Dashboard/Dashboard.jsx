import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">

        <div className="dashboard-header">
            <h1>Welcome Back!</h1>
            <p>Here are events that are trending around campus.</p>
        </div>

        <section className="dashboard-section">
            <h2>Upcoming Events</h2>

            <div className="event-card">
                <h3>Cybersecurity Workshop</h3>
                <p>Discovery Park</p>
                <p>July 25</p>

                <Link to="/event/1">
                    <button>View Details</button>                
                </Link>
            </div>

            <div className="event-card">
                <h3>UNT AI Club</h3>
                <p>Union Building</p>
                <p>July 28</p>

                <Link to="/event/2">
                    <button>View Details</button>
                </Link>
            </div>

        </div>
      </section>

    <section className="dashboard-section">

        <h2>Actions</h2>

        <div className="quick-buttons">

            <Link to="/explore">
                <button>Explore Events</button>
            </Link>

            <Link to="/create-event">
                        <button>Create Event</button>
                    </Link>

                    <Link to="/saved-events">
                        <button>Saved Events</button>
                    </Link>

                    <Link to="/assistant">
                        <button>Scrappy AI</button>
                    </Link>

                </div>

            </section>

            <section className="dashboard-section">

                <h2>Notifications</h2>

                <ul>
                    <li>AI Club starts tomorrow.</li>
                    <li>New event near Discovery Park.</li>
                    <li>Your RSVP has been confirmed.</li>
                </ul>

            </section>

        </div>
    );
}
