import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import EventDetails from "./pages/EventDetails/EventDetails";
import EventCalendar from "./pages/EventCalendar/EventCalendar";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/calendar" element={<EventCalendar />} />
        </Routes>
    );
}

export default AppRoutes;
