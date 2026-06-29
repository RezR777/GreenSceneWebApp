import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import greenSceneIcon from "../../assets/icons/GreenSceneLogo.png";
import leftPanelLoginImage from "../../assets/icons/login-left-panel-picture.jpeg";


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login submitted:", formData);

    /*
      add final backend function here
    */

    navigate("/");
  };

  return (
    <div className="login-screen">
      <main className="login-card">
       <section className="login-left-panel" aria-label="GreenScene preview image">
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

              <button type="submit">Login Now</button>
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
