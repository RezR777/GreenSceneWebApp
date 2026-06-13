import { useParams } from "react-router-dom";

function EventDetails() {

    const { id } = useParams();

    return (
        <div>

            <h1>Event Details</h1>

            <p>
                Event ID: {id}
            </p>

            <button>
                RSVP
            </button>

        </div>
    );
}

export default EventDetails;