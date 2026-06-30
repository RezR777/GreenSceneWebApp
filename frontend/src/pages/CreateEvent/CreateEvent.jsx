import React, { useState } from "react";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [participantEmail, setParticipantEmail] = useState("");
  const [participants, setParticipants] = useState(["Alex", "Mia", "Sam", "+1"]);
  const [flyerName, setFlyerName] = useState("");

  const handleAddParticipant = () => {
    if (!participantEmail.trim()) return;

    const nameFromEmail = participantEmail.split("@")[0];
    setParticipants((currentParticipants) => [
      ...currentParticipants,
      nameFromEmail,
    ]);

    setParticipantEmail("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Demo event created!");
  };

  return (
    <main className="create-event-page">
      <h1 className="create-event-title">Create Event</h1>

      <form className="create-event-form" onSubmit={handleSubmit}>
        <section className="create-event-column">
          <div className="create-field">
            <label htmlFor="eventName">Event Name</label>
            <input
              id="eventName"
              className="create-input"
              type="text"
              placeholder="Enter event name"
            />
          </div>

          <div className="create-row">
            <div className="create-field">
              <span className="create-group-label">Date</span>
              <div className="date-inputs">
                <input
                  className="create-input small-input"
                  type="text"
                  placeholder="DD"
                  maxLength="2"
                  aria-label="Event day"
                />
                <input
                  className="create-input small-input"
                  type="text"
                  placeholder="MM"
                  maxLength="2"
                  aria-label="Event month"
                />
                <input
                  className="create-input small-input"
                  type="text"
                  placeholder="YYYY"
                  maxLength="4"
                  aria-label="Event year"
                />
              </div>
            </div>

            <div className="create-field">
              <label htmlFor="eventTime">Time</label>
              <input
                id="eventTime"
                className="create-input"
                type="text"
                defaultValue="3:00 PM"
              />
            </div>

            <div className="create-field">
              <label htmlFor="eventDuration">Duration</label>
              <select
                id="eventDuration"
                className="create-select"
                defaultValue="4h 30m"
              >
                <option>30m</option>
                <option>1h</option>
                <option>1h 30m</option>
                <option>2h</option>
                <option>3h</option>
                <option>4h 30m</option>
              </select>
            </div>
          </div>

          <div className="create-field">
            <label htmlFor="eventLocation">Location</label>
            <input
              id="eventLocation"
              className="create-input"
              type="text"
              placeholder="Choose Location"
              list="campusLocations"
            />
            <datalist id="campusLocations">
              <option value="UNT Union" />
              <option value="Willis Library" />
              <option value="Discovery Park" />
              <option value="Business Leadership Building" />
              <option value="Apogee Stadium" />
            </datalist>
          </div>

          <div className="create-field">
            <label htmlFor="participantEmail">Participants</label>
            <div className="participant-row">
              <input
                id="participantEmail"
                className="create-input"
                type="email"
                placeholder="contact@example.com"
                value={participantEmail}
                onChange={(event) => setParticipantEmail(event.target.value)}
              />
              <button
                className="add-button"
                type="button"
                onClick={handleAddParticipant}
              >
                Add
              </button>
            </div>

            <div className="avatar-row" aria-label="Added participants">
              {participants.map((participant, index) => (
                <span
                  className={`avatar ${
                    participant.startsWith("+")
                      ? "avatar-more"
                      : index % 3 === 0
                      ? "avatar-yellow"
                      : index % 3 === 1
                      ? "avatar-blue"
                      : "avatar-green"
                  }`}
                  key={`${participant}-${index}`}
                  title={participant}
                >
                  {participant.startsWith("+")
                    ? participant
                    : participant.slice(0, 2).toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <label className="notify-row">
            <input type="checkbox" />
            <span>Notify Participants</span>
          </label>

          <div className="create-field">
            <label htmlFor="eventTags">Tags</label>
            <textarea
              id="eventTags"
              className="create-textarea tags-box"
              placeholder="#AddTag"
            />
          </div>
        </section>

        <section className="create-event-column">
          <div className="create-field">
            <label htmlFor="eventDescription">Event description</label>
            <textarea
              id="eventDescription"
              className="create-textarea description-box"
            />
          </div>

          <div className="create-field">
            <label htmlFor="eventFlyer">Upload event flyer</label>

            <div className="flyer-upload">
              <div>
                <label className="file-button" htmlFor="eventFlyer">
                  Select Files
                </label>
                <input
                  id="eventFlyer"
                  className="file-input"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(event) =>
                    setFlyerName(event.target.files?.[0]?.name || "")
                  }
                />
                {flyerName && <p className="file-name">{flyerName}</p>}
              </div>
            </div>
          </div>
        </section>

        <div className="action-row">
          <button className="cancel-button" type="button">
            Cancel
          </button>
          <button className="submit-button" type="submit">
            Create Event
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateEvent;
