import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated, logout } from './utils/auth';
import { Navigate } from 'react-router-dom';
import './App.css'; // Import your CSS file

const App = () => {
    const navigate = useNavigate();

    const getUsername = () => {
        return localStorage.getItem('username') || 'User';
    };

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <h1>PintarKuis</h1>
                </div>
                <ul className="navbar-menu">
                    {!isAuthenticated() ? (
                        <>
                            <li><Link className="nav-link" to="/register">Register</Link></li>
                            <li><Link className="nav-link" to="/login">Login</Link></li>
                        </>
                    ) : (
                        <>
                            <li className="username-display">
                                <span>Welcome, {getUsername()}</span>
                            </li>
                            <li>
                                <button 
                                    className="logout-button" 
                                    onClick={() => { 
                                        logout(); 
                                        localStorage.removeItem('username'); // Remove username on logout
                                        navigate('/login'); 
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <main className="main-content">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/dashboard" 
                        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
                    />
                </Routes>
            </main>
        </div>
    );
};

export default App;
