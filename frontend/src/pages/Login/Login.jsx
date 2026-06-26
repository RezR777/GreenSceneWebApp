import { useState } from "react";

import { loginUser }
    from "../services/authService";

import { useAuth }
    from "../hooks/useAuth";

function Login() {

    const { login } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data =
                await loginUser({
                    email,
                    password
                });

            login(data);

            alert(
                "Login Successful!"
            );

        } catch (error) {

            alert(
                "Login Failed"
            );

        }

    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Login</h1>

            <form
                onSubmit={handleSubmit}
            >

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
}

export default Login;