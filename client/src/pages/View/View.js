import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "./View.css";
import Loading from "../../components/Loading/Loading";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the server URL from the environment variables
  const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Corrected: Fetch from the backend API using the absolute URL
        const response = await fetch(`${serverUrl}/api/journals/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setJournal(data);
        } else {
          setError("Journal not found");
        }
      } catch (err) {
        console.error("Error fetching journal:", err);
        setError("Failed to load journal");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJournal();
    }
  }, [id, serverUrl]); // Add serverUrl to the dependency array

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    console.log("Edit journal:", journal._id);
  };

  const handleDelete = async () => {
    // NOTE: window.confirm() will not work inside the Canvas environment.
    // You should replace this with a custom modal for user confirmation.
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this journal entry? This action cannot be undone."
    );
    
    if (userConfirmed) {
      try {
        // ✅ Corrected: Delete from the backend API using the absolute URL
        const response = await fetch(`${serverUrl}/api/journals/${journal._id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          console.log("Journal deleted successfully");
          navigate("/");
        } else {
          console.error("Failed to delete journal");
        }
      } catch (error) {
        console.error("Error deleting journal:", error);
      }
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error || !journal) {
    return (
      <section className="view">
        <div className="view-container">
          <div className="view-error">
            <div className="view-error-icon">❌</div>
            <h3>Journal Not Found</h3>
            <p>
              {error ||
                "The journal you're looking for doesn't exist or has been removed."}
            </p>
            <button onClick={handleBack} className="view-back-button">
              Go Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="view">
      <div className="view-container">
        <div className="view-header">
          <button onClick={handleBack} className="view-back-button">
            Back to Journals
          </button>

          <h1 className="view-title">{journal.title}</h1>

          <div className="view-meta">
            <div className="view-date">
              {moment(journal.created).format("MMMM DD, YYYY")}
            </div>

            {journal.tags && journal.tags.length > 0 && (
              <div className="view-tags">
                {journal.tags.map((tag, index) => (
                  <span key={index} className="view-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="view-content">
          <div className="view-body">{journal.body}</div>
        </div>

        {/* The section below contains the edit and delete buttons */}
        <div className="view-actions">
          <button onClick={handleEdit} className="view-action-button edit">
            Edit Journal
          </button>
          <button onClick={handleDelete} className="view-action-button delete">
            Delete Journal
          </button>
        </div>
      </div>
    </section>
  );
};

export default View;
