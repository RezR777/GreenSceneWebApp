import api from "./api";

export const getCalendarEvents = () =>
    api.get("/calendar");

