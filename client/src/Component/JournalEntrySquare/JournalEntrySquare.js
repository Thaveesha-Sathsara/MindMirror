import { Link } from "react-router-dom";
import moment from "moment";
import "./JournalEntrySquare.css";
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};


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
          <a
            href={`/view/${journal._id}`}
            key={journal._id}
            className="journal-entry-square"
          >
            <h3>{journal.title}</h3>
            <p>{journal.body}</p>

            <div className="journal-meta">
              <div className="journal-date">
                {formatDate(journal.created)}
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
          </a>
        ))}
      </div>
    </>
  );
};

export default JournalEntrySquare;
