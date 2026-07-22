import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createEvent,
  getEvents,
} from "../services/eventService.js";

const EventsContext = createContext(null);

function extractEvents(response) {
  const possibleEvents =
    response?.data?.events ??
    response?.events ??
    response?.data ??
    response;

  return Array.isArray(possibleEvents) ? possibleEvents : [];
}

function extractCreatedEvent(response) {
  return (
    response?.data?.event ??
    response?.event ??
    response?.data ??
    response
  );
}

export function EventsProvider({ children }) {
  /*
   * Start with an empty array.
   * There are no fake or placeholder events anymore.
   */
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getEvents();
        const loadedEvents = extractEvents(response);

        if (isMounted) {
          setEvents(loadedEvents);
        }
      } catch (loadError) {
        console.error("Could not load events:", loadError);

        if (isMounted) {
          setError(
            loadError.response?.data?.message ||
              loadError.message ||
              "Events could not be loaded."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const addEvent = async (eventData) => {
    const response = await createEvent(eventData);
    const createdEvent = extractCreatedEvent(response);

    if (!createdEvent?._id && !createdEvent?.id) {
      throw new Error(
        "The server did not return the created event."
      );
    }

    setEvents((currentEvents) => [
      createdEvent,
      ...currentEvents,
    ]);

    return createdEvent;
  };

  const findEventById = (eventId) => {
    return events.find(
      (event) =>
        String(event._id || event.id) === String(eventId)
    );
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        error,
        addEvent,
        findEventById,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error(
      "useEvents must be used within an EventsProvider"
    );
  }

  return context;
}