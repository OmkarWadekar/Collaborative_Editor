
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const token = localStorage.getItem('uuid');
    const navigate = useNavigate();
    console.log(token, '\n');

    // If the token exists, automatically navigate to the latest document
    useEffect(() => {
        if (token) {
            // You can implement logic to get the latest document ID from your API here
            // For now, let's assume you have a variable `latestDocumentId` with the ID
            const latestDocumentId = token;

            // Redirect to the latest document using the Navigate component
            // return <Navigate to={`/docs/${latestDocumentId}`} />;
            navigate(`/docs/${latestDocumentId}`);
            return;
        }
    }, [token]);

    return (
        <div>
            <h1>Welcome to Your Collaborative Editor</h1>
            <p>Please log in or sign up to get started.</p>
            <Link to="/login">Login</Link>
            <span> | </span>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default LandingPage;
