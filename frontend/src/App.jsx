import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import SavedEvents from "./pages/SavedEvents";
import ExploreEvents from "./pages/ExploreEvents";
import EventDetails from "./pages/EventDetails";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/saved-events" element={<SavedEvents />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
