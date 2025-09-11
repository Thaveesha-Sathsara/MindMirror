import { useEffect, useState } from "react";
import JournalEntrySquare from "../../Component/JournalEntrySquare/JournalEntrySquare";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";

const Home = () => {
    const { store, setStore } = useStore();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    
    // Use the server URL from the environment variables
    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

    const fetchData = async () => {
        try {
            const res = await fetch(`${serverUrl}/api/journals`, {
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }
            const data = await res.json();
            setStore([{ journalList: data.journals || [] }]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching journals: ', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    if (isLoading) {
        return <div className="home-loading">
      {/* Use the public folder path */}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo-home" />
      <p>Loading your journals...</p>
    </div>;
    }

    if (!store || !store[0] || !store[0].journalList || store[0].journalList.length === 0) {
        return (
            <section className="home">
                <div className="home-journal-container">
                    <h1 className="home_header">Welcome to your Journal, {user?.name}!</h1>
                    <p className="home_subtitle">You haven't written any journals yet. Start your journey by creating your first entry!</p>
                    <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <p>No journals found</p>
                        <a href="/create" className="create-first-btn">Create Your First Journal</a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="home">
            <div className="home-journal-container">
                <h1 className="home_header">Welcome to your Journal, {user?.name}!</h1>
                <p className="home_subtitle">Here are your personal thoughts and memories</p>
                <div className="home-journal-list">
                    <JournalEntrySquare list={store[0].journalList} />
                </div>
            </div>
        </section>
    );
};

export default Home;