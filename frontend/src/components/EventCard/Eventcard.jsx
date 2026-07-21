import "./EventCard.css";

function EventCard({ title, date, location }) {
    return (
        <div className="event-card">
        
            <h3>{title}</h3>
        
            <p>{date}</p>
        
            <p>{location</p>

            <button>View Details</button>
            
        </div>
    );
}

export default EventCard;

