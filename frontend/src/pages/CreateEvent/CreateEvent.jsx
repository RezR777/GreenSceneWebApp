function CreateEvent() {
    return (
        <div>
            <h1>Create Event</h1>

            <form>

                <input
                    type="text"
                    placeholder="Event Title"
                />

                <br />

                <textarea
                    placeholder="Description"
                />

                <br />

                <input
                    type="date"
                />

                <br />

                <button>
                    Submit Event
                </button>

            </form>
        </div>
    );
}

export default CreateEvent;