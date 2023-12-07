import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";    

export default function Login() {
    const navigate = useNavigate();
    const realUsername = process.env.REACT_APP_USERNAME;
    const realPassword = process.env.REACT_APP_PASSWORD;    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false); // error state
    const [loading, setLoading] = useState(false); // loading state
    const [success, setSuccess] = useState(false); // success state
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_PASSWORD);
        setLoading(true);
        setError(false);
        if (username !== realUsername || password !== realPassword) {
            setError(true);
            setLoading(false)
            return;
        }
        
        localStorage.setItem("username", username);
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
            navigate('/');
        }, 1000);
    };
    
    return (
        <div className="login">
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="user-box">
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <label>Username</label>
            </div>
            <div className="user-box">
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <label>Password</label>
            </div>
            <div className="error">
                {error && (
                <span>
                    Invalid Credentials. Please try again with correct credentials.
                </span>
                )}
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
            <div className="success">
                {success && <span>Login Successful. Redirecting...</span>}
            </div>
            </form>
        </div>
        </div>
    );
    }