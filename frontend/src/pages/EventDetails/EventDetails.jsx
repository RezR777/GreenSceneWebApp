import { useParams } from "react-router-dom";

const EventDetails = () => {
    return (
        <div className="page">
            <h1>Cybersecurity Workshop</h1>
            
            <p>Date:</p>

            <p>Time:</p>

            <p>Location:</p>

            <button>Open in Google Maps</button>

            <button>RSVP</button>

            <button>Save Event</button>

        
        </div>
        );
};

export default EventDetails;
