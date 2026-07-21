import "./GreenAdmin.css";

export default function GreenAdmin() {

    return (

        <div className="page">

            <h1>Administrator Dashboard</h1>

            <div className="stats">

                <div>Total Users<br />143</div>

                <div>Total Events<br />28</div>

                <div>Pending Events<br />6</div>

                <div>Organizations<br />17</div>

            </div>

            <br />

            <button>Manage Users</button>

            <button>Approve Events</button>

            <button>Delete Events</button>

        </div>

    );

}
