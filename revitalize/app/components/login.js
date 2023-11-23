"use client";
import React from "react";
import { useState } from "react";

export default function LoginForm() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user);

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Function to handle name
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setSubmitted(false);
  };

  // Showing email error message if emailError is true
  const emailErrorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: emailError ? "" : "none",
        }}>
        <h1>Please enter a valid email address</h1>
      </div>
    );
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation regex
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;

    // Simple email validation regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (name === "" || email === "" || password === "") {
      setError(true);
      setPasswordError(false);
      setEmailError(false);
    } else if (!passwordRegex.test(password)) {
      setError(true);
      setSubmitted(false);
      setPasswordError(true);
    } else if (!emailRegex.test(email)) {
      setEmailError(true);
      setSubmitted(false);
    } else {
      setSubmitted(true);
      setError(false);
      setPasswordError(false);
      setEmailError(false);
    }
  };

  // Showing password error message if passwordError is true
  const passwordErrorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: passwordError ? "" : "none",
        }}>
        <h1>
          Password must have at least 1 digit, 1 special character, 1 uppercase
          letter, and be at least 8 characters long
        </h1>
      </div>
    );
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      {user ? (
        <div>
          {user.displayName} | {user.email}
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}

      <div>
        <h1>User Registration</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
        {passwordErrorMessage()}
        {emailErrorMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
