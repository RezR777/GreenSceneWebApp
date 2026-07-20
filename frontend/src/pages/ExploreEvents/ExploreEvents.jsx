import { Link } from "react-router-dom";
import "./ExploreEvents.css";

export default function ExploreEvents() {

    const events = [
      {
        id: 1,
        title: "Cybersecurity Workshop",
        location: "Discovery Park",
        date: "July 25"
      },
      {
        id: 2,
        title: "UNT AI Club",
        location: "Union",
        date: "July 28"
      },
      {
        id: 3,
        title: "Career Fair",
        location: "Library Mall",
        date: "August 2"
      }
  ];

  return (

      <div className="page">
      
          <h1>Explore Events</h1>
      
          <input
            type="text"
            placeholder="Searching events..."
            className="search-box"
          />

        <div className="event-grid">
        
          {events.map(event => (

              <div key={event.id} className="event-card">
              
                  <h2>{event.title}</h2>

                  <p>{event.location}</p>

                  <p>{event.date}</p>

                  <Link to={'/event/${event.id}'}>
                      <button>Details</button>
                  </Link>
              
              </div>

          ))}
        
        </div>
      
      </div>

    );

}
