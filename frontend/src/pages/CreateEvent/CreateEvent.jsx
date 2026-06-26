import React from "react";

const CreateEvent = () => {
    return (
        <div className="page">

            <h1>Create Event</h1>

            <form>
            
                <input placeholder="Title" />

                <textarea placeholder="Description" />

                <input type="date" />

                <input type="time" />

                <input placeholder="Location" />

                <input placeholder="Google Maps Link" />

                <input placeholder="#tags" />

                <button>Submit Event</button>
            
            </form>
        
        </div>
        );
};

export default CreateEvent;
