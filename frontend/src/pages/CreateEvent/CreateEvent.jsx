import React, { useState } from "react";
import "./CreateEvent.css";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../../context/EventContext.jsx";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  const [participantEmail, setParticipantEmail] = useState("");
  const [participants, setParticipants] = useState([]);

  const [eventName, setEventName] = useState("");
  const [eventDay, setEventDay] = useState("");
  const [eventMonth, setEventMonth] = useState("");
  const [eventYear, setEventYear] = useState("");
  const [eventTime, setEventTime] = useState("17:00");
  const [eventDuration, setEventDuration] = useState("60");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTags, setEventTags] = useState("");
  const [notifyParticipants, setNotifyParticipants] = useState(false);

  const [flyerName, setFlyerName] = useState("");
  const [flyerFile, setFlyerFile] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAddParticipant = () => {
    const email = participantEmail.trim().toLowerCase();

    if (!email) {
      return;
    }

    if (participants.includes(email)) {
      setError("That participant has already been added.");
      return;
    }

    setParticipants((currentParticipants) => [
      ...currentParticipants,
      email,
    ]);

    setParticipantEmail("");
    setError("");
  };

  const handleParticipantKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddParticipant();
    }
  };

  const handleRemoveParticipant = (participantToRemove) => {
    setParticipants((currentParticipants) =>
      currentParticipants.filter(
        (participant) => participant !== participantToRemove
      )
    );
  };

  const handleFlyerChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFlyerName("");
      setFlyerFile("");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file for the event flyer.");
      event.target.value = "";
      return;
    }

    /*
     * This size limit prevents very large Base64 images from being sent
     * to the backend. Size set to Two megabytes.
     */
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("The flyer image must be smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    setFlyerName(selectedFile.name);
    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      setFlyerFile(reader.result);
    };

    reader.onerror = () => {
      setError("The selected flyer could not be read.");
      setFlyerName("");
      setFlyerFile("");
    };

    reader.readAsDataURL(selectedFile);
  };

  const createEventDate = () => {
    const day = Number(eventDay);
    const month = Number(eventMonth);
    const year = Number(eventYear);

    const [hours, minutes] = eventTime.split(":").map(Number);

    if (
      !day ||
      !month ||
      !year ||
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      throw new Error("Please enter a complete date and time.");
    }

    const eventDate = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      0
    );

    const isValidDate =
      eventDate.getFullYear() === year &&
      eventDate.getMonth() === month - 1 &&
      eventDate.getDate() === day &&
      eventDate.getHours() === hours &&
      eventDate.getMinutes() === minutes;

    if (!isValidDate) {
      throw new Error("Please enter a valid event date.");
    }

    return eventDate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const eventDate = createEventDate();

      const tags = eventTags
        .split(/[\s,]+/)
        .map((tag) => tag.replace(/^#/, "").trim())
        .filter(Boolean);

      const newEvent = {
        title: eventName.trim(),
        description: eventDescription.trim(),
        date: eventDate.toISOString(),
        durationMinutes: Number(eventDuration),
        location: eventLocation.trim(),
        participants,
        notifyParticipants,
        tags,

        /*
         * For this demo, the image is converted into a Base64 data URL.
         * Later, this can be replaced with whatever we will use (like Amazon S3, etc).
         */
        flyerUrl: flyerFile,
      };

      await addEvent(newEvent);

      /*
       * Navigating to Home will have the Home page display the updated
       * event list from EventContext or request it from the backend. FIXED.
       */
      navigate("/", {
        state: {
          eventCreated: true,
        },
      });
    } catch (submitError) {
      setError(
        submitError.message || "The event could not be created."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
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
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
              required
            />
          </div>

          <div className="create-row">
            <div className="create-field">
              <span className="create-group-label">Date</span>

              <div className="date-inputs">
                <input
                  className="create-input small-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="DD"
                  maxLength="2"
                  aria-label="Event day"
                  value={eventDay}
                  onChange={(event) =>
                    setEventDay(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  required
                />

                <input
                  className="create-input small-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  maxLength="2"
                  aria-label="Event month"
                  value={eventMonth}
                  onChange={(event) =>
                    setEventMonth(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  required
                />

                <input
                  className="create-input small-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY"
                  maxLength="4"
                  aria-label="Event year"
                  value={eventYear}
                  onChange={(event) =>
                    setEventYear(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  required
                />
              </div>
            </div>

            <div className="create-field">
              <label htmlFor="eventTime">Time</label>

              <input
                id="eventTime"
                className="create-input"
                type="time"
                value={eventTime}
                onChange={(event) => setEventTime(event.target.value)}
                required
              />
            </div>

            <div className="create-field">
              <label htmlFor="eventDuration">Duration</label>

              <select
                id="eventDuration"
                className="create-select"
                value={eventDuration}
                onChange={(event) =>
                  setEventDuration(event.target.value)
                }
              >
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="180">3 hours</option>
                <option value="240">4 hours</option>
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
              value={eventLocation}
              onChange={(event) =>
                setEventLocation(event.target.value)
              }
              required
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
                onChange={(event) =>
                  setParticipantEmail(event.target.value)
                }
                onKeyDown={handleParticipantKeyDown}
              />

              <button
                className="add-button"
                type="button"
                onClick={handleAddParticipant}
              >
                Add
              </button>
            </div>

            {participants.length > 0 && (
              <div
                className="avatar-row"
                aria-label="Added participants"
              >
                {participants.map((participant, index) => {
                  const participantName =
                    participant.split("@")[0];

                  return (
                    <button
                      className={`avatar ${
                        index % 3 === 0
                          ? "avatar-yellow"
                          : index % 3 === 1
                          ? "avatar-blue"
                          : "avatar-green"
                      }`}
                      key={participant}
                      type="button"
                      title={`Remove ${participant}`}
                      aria-label={`Remove ${participant}`}
                      onClick={() =>
                        handleRemoveParticipant(participant)
                      }
                    >
                      {participantName
                        .slice(0, 2)
                        .toUpperCase()}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <label className="notify-row">
            <input
              type="checkbox"
              checked={notifyParticipants}
              onChange={(event) =>
                setNotifyParticipants(event.target.checked)
              }
            />

            <span>Notify Participants</span>
          </label>

          <div className="create-field">
            <label htmlFor="eventTags">Tags</label>

            <textarea
              id="eventTags"
              className="create-textarea tags-box"
              placeholder="#Social #Academic #Sports"
              value={eventTags}
              onChange={(event) => setEventTags(event.target.value)}
            />
          </div>
        </section>

        <section className="create-event-column">
          <div className="create-field">
            <label htmlFor="eventDescription">
              Event description
            </label>

            <textarea
              id="eventDescription"
              className="create-textarea description-box"
              placeholder="Describe the event..."
              value={eventDescription}
              onChange={(event) =>
                setEventDescription(event.target.value)
              }
              required
            />
          </div>

          <div className="create-field">
            <label htmlFor="eventFlyer">Upload event flyer</label>

            <div className="flyer-upload">
              <div>
                <label
                  className="file-button"
                  htmlFor="eventFlyer"
                >
                  Select File
                </label>

                <input
                  id="eventFlyer"
                  className="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFlyerChange}
                />

                {flyerName && (
                  <p className="file-name">{flyerName}</p>
                )}
              </div>

              {flyerFile && (
                <img
                  className="flyer-preview"
                  src={flyerFile}
                  alt="Selected event flyer preview"
                />
              )}
            </div>
          </div>
        </section>

        {error && (
          <p className="create-event-error" role="alert">
            {error}
          </p>
        )}

        <div className="action-row">
          <button
            className="cancel-button"
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            className="submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateEvent;