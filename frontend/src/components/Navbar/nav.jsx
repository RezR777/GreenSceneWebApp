import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                backgroundColor: "#00853E",
                color: "white",
            }}
        >
            <h2>GreenScene</h2>

            <div>
                <Link to="/" style={{ margin: "15px", color: "white", textDecoration: "white" }}>
                    Home
                </Link>

                <Link to="/create-event" style={{ margin: "15px", color: "white", textDecoration: "white" }}>
                    Create Event
                </Link>

                <Link to="/ai-assistant" style={{ margin: "15px", color: "white", textDecoration: "white" }}>
                    AI Assistant
                </Link>

                <Link to="/profile" style={{ margin: "15px", color: "white", textDecoration: "white" }}>
                    Profile
                </Link>

                <Link to="/login" style={{ margin: "15px", color: "white", textDecoration: "white" }}>
                    Login
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;