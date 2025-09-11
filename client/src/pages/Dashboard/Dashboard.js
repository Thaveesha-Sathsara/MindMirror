import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { IoIosCreate } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa6";
import { TbDeviceTabletSearch } from "react-icons/tb";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleCreateJournal = () => {
    navigate('/create');
  };

  const handleViewJournals = () => {
    navigate('/');
  };

  const handleSearchJournals = () => {
    navigate('/search');
  };

  if (!user) {
    return null;
  } 

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}!</h1>
          <p>Your personal journal space is ready.</p>
        </div>

        <div className="dashboard-actions">
          <div className="dashboard-action-card" onClick={handleCreateJournal}>
            <div className="icon"><IoIosCreate /></div>
            <h3>Create New Journal</h3>
            <p>Start writing your thoughts and experiences.</p>
          </div>

          <div className="dashboard-action-card" onClick={handleViewJournals}>
            <div className="icon"><FaBookOpen /></div>
            <h3>View My Journals</h3>
            <p>Browse all your previous journal entries.</p>
          </div>

          <div className="dashboard-action-card" onClick={handleSearchJournals}>
            <div className="icon"><TbDeviceTabletSearch /></div>
            <h3>Search Journals</h3>
            <p>Find specific entries quickly and easily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
