import { Link } from "react-router-dom";
import moment from "moment";
import "./JournalEntrySquare.css";

const JournalEntrySquare = ({ list }) => {
  if (!list || list.length === 0) {
    return (
      <div className="journal-entry-square empty">
        <h3>No journals found</h3>
        <p>Start writing your first journal entry to see it here.</p>
      </div>
    );
  }

  const sortedList = [...list].sort((a, b) => new Date(b.created) - new Date(a.created));

  return (
    <>
      <div className="journal-entries-grid">
        {sortedList.map((journal) => (
          // ✅ Corrected: Using the <Link> component for in-app navigation
          // The `to` prop handles the routing gracefully without a page refresh.
          <Link
            to={`/view/${journal._id}`} // The path to the View component
            key={journal._id}
            className="journal-entry-square"
          >
            <h3>{journal.title}</h3>
            {/* The rest of the content remains the same */}
            <p>{journal.body}</p>
            <div className="journal-meta">
              <div className="journal-date">
                {moment(journal.created).format('MMM DD, YYYY')}
              </div>
              <div className="journal-tags">
                {journal.tags && journal.tags.map((tag, index) => (
                  <span key={index} className="journal-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="read-more">
              Read full entry
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default JournalEntrySquare;
