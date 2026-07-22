import React, { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Login.css";

import greenSceneIcon from "../../assets/icons/GreenSceneLogo.png";
import leftPanelLoginImage from "../../assets/icons/login-left-panel-picture.jpeg";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const data = await loginUser(formData);

      // authService stores the token.
      login(data);

      const previousLocation = location.state?.from;

      const destination = previousLocation
        ? `${previousLocation.pathname}${previousLocation.search || ""}${
            previousLocation.hash || ""
          }`
        : "/";

      navigate(destination, { replace: true });
    } catch (loginError) {
      setError(
        loginError?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent users already logged in from returning to the login page.
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-screen">
      <main className="login-card">
        <section
          className="login-left-panel"
          aria-label="GreenScene preview image"
        >
          <img
            src={leftPanelLoginImage}
            alt="GreenScene event planner preview"
            className="login-side-image"
          />
        </section>

        <section className="login-right-panel">
          <div className="greenscene-logo" aria-label="GreenScene logo">
            <img
              src={greenSceneIcon}
              alt="GreenScene icon"
              className="greenscene-logo-icon"
            />
          </div>

          <div className="login-form-wrapper">
            <h1>Welcome Back!</h1>

            <p className="create-account-text">
              Don&apos;t have an account?{" "}
              <Link to="/register">Create a new account now.</Link>
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {error && (
                <p role="alert" className="login-error">
                  {error}
                </p>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login Now"}
              </button>
            </form>

            <p className="forgot-password-text">
              Forgot password? <Link to="/forgot-password">Click here</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;