import React, { useEffect, useState } from 'react';

const HealthChecker = () => {
    // State variables to hold the data and loading status
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // The backend URL to hit
    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

    useEffect(() => {
        // Asynchronous function to fetch data from the server
        const fetchHealthStatus = async () => {
            try {
                // Using the Fetch API to make a GET request to the /health endpoint
                const res = await fetch(`${serverUrl}/health`);
                
                // Check if the response is OK (status code 200-299)
                if (!res.ok) {
                    throw new Error(`Server responded with status: ${res.status}`);
                }

                // Parse the JSON response
                const data = await res.json();
                
                // Update the state with the fetched data
                setStatus(data.status);
                setIsLoading(false);
            } catch (err) {
                // Handle any network or server errors
                setError(err.message);
                setIsLoading(false);
            }
        };

        // Call the async function
        fetchHealthStatus();
    }, []); // Empty dependency array ensures this runs only once on component mount

    if (isLoading) {
        return <p>Checking server health...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Backend Status</h1>
            <p>The server is: <b>{status}</b></p>
        </div>
    );
};

export default HealthChecker;