import { useState } from "react";
import { registerUser }
    from "../../services/authService";

function Register() {

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: ""
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(formData);

            alert(
                "Registration Successful!"
            );

        } catch (error) {

            alert(
                "Registration Failed"
            );

        }

    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Create Account</h1>

            <form
                onSubmit={handleSubmit}
            >

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>
        </div>
    );
}

export default Register;
