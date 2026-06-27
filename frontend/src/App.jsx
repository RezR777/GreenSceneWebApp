import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminPanel from "./pages/AdminPanel/GreenAdmin";
import SavedEvents from "./pages/SavedEvents/SavedEvents";
import ExploreEvents from "./pages/ExploreEvents/ExploreEvents";
import EventDetails from "./pages/EventDetails/EventDetails";
import AIAssistant from "./pages/AIAssistant/ScrappyAI";
import Profile from "./pages/Profile/Profile";


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
