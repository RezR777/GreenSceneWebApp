import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
    );
}

export default AppRoutes;