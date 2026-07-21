import { createContext, useContext, useState } from "react";

const defaultEvents = [
    { title: "Campus Movie Night", date: "Fri, Jun 30", time: "3:00 PM", location: "Room 201", category: "Arts / Music", image: null },
    { title: "UNT Study Jam", date: "Sat, Jul 1", time: "1:30 PM", location: "Willis Library", category: "Academic", image: null },
    { title: "Club Mixer", date: "Sun, Jul 2", time: "5:00 PM", location: "Union 314", category: "Social", image: null },
    { title: "Mean Green Tailgate", date: "Mon, Jul 3", time: "6:00 PM", location: "Apogee Stadium", category: "Sports", image: null },
    { title: "Art Workshop", date: "Tue, Jul 4", time: "2:00 PM", location: "Art Building", category: "Arts / Music", image: null },
    { title: "Career Prep Meetup", date: "Wed, Jul 5", time: "4:00 PM", location: "Sage Hall", category: "Academic", image: null },
];

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
    const [events, setEvents] = useState(defaultEvents);

    const addEvent = (newEvent) => {
        setEvents((currentEvents) => [...currentEvents, newEvent]);
    };

    return (
        <EventsContext.Provider value={{ events, addEvent }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error("useEvents must be used within an EventsProvider");
    }
    return context;
}
