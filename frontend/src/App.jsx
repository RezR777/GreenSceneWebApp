import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import CreateEvent from "./pages/CreateEvent/CreateEvent.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AdminPanel from "./pages/AdminPanel/GreenAdmin.jsx";
import SavedEvents from "./pages/SavedEvents/SavedEvents.jsx";
import ExploreEvents from "./pages/ExploreEvents/ExploreEvents.jsx";
import EventDetails from "./pages/EventDetails/EventDetails.jsx";
import AIAssistant from "./pages/AIAssistant/ScrappyAI.jsx";
import Profile from "./pages/Profile/Profile.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/saved-events" element={<SavedEvents />} />
            <Route path="/explore" element={<ExploreEvents />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
