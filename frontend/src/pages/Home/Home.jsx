import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>GreenScene</h1>

            <p>
                Discover campus events and activities.
            </p>

            <Link to="/login">
                Login
            </Link>

            <br />

            <Link to="/create-event">
                Create Event
            </Link>
        </div>
    );
}

export default Home;