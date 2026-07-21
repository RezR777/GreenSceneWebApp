export default function SavedEvents() {

    const saved = [
        "Cybersecurity Workshop",
        "UNT AI Club",
        "HackUNT"
    ];

    return (

        <div className="page">

            <h1>Saved Events</h1>

            <ul>

                {saved.map((event, index) => (

                    <li key={index}>

                        ❤️ {event}

                    </li>

                ))}

            </ul>

        </div>

    );

}
