import moment from "moment";
import "./JournalEntrySquare.css"
import { Link } from "react-router-dom";

const JournalEntrySquare = ({list}) => {
    const journalsDisplay = list.map((journal, index) => {
        if (index > 7) {
            return;
        }
        const tags = journal.tags.map(tag => {
            return <li className="tag-item" key={`${index}-${tag}`}>
                {tag}
            </li>
        })
        const date = moment(journal.created).format('MMMM Do YYYY')
        return (
            <Link to="/view" state={journal} className="journal-entry" key={`${index}-${date}`} >
                <h2 className="journal-entry_title">{journal.title}</h2>
                <h3 className="journal-entry_date">Created: {date}</h3>
                <div>
                    Tags:
                    <ul className="journal-entry_tags">{tags}</ul>
                </div>
                <p className="journal-entry_body">{(journal.body ?? "").substring(0, 200) + "..."}</p>
            </Link>
        )
    });
    return journalsDisplay; 
}

export default JournalEntrySquare;