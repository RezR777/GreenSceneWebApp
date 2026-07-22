import api from "./api.js";

export const getEvents = () => {
  return api.get("/events");
};

export const getEvent = (id) => {
  return api.get(`/events/${id}`);
};

export const createEvent = (eventData) => {
  return api.post("/events", eventData);
};

export const updateEvent = (id, eventData) => {
  return api.put(`/events/${id}`, eventData);
};

export const deleteEvent = (id) => {
  return api.delete(`/events/${id}`);
};