import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './View.css';

const View = () => {
    const location = useLocation();
    const { state } = location;

    const [journalEntry, setJournalEntry] = useState();

    useEffect(() => {
        setJournalEntry(state);
    }, [state])

    if (journalEntry === undefined) {
        return <div>Waiting...</div>
    }

    const date = moment(journalEntry.created).format('MMMM Do YYYY');

    const tags = journalEntry.tags.map(tag => {
        return (
            <li className="tag-item" key={(Math.random() * 5)}>
                {tag}
            </li>
        )
    })

    const constructBody = () => {
        const journalBodySplit = journalEntry.body.split('\n');
        const journalBodyFilter = journalBodySplit.filter(entry => entry !== '');
        const finalJournalBody = journalBodyFilter.map((entry, index) => <p key={index}>{entry}</p>);
        return finalJournalBody;
    }

    return (
        <section className="view">
            <div className="view-container">
                <h2 className="journal-entry_title">{journalEntry.title}</h2>
                <h3 className="journal-entry_date">Created: {date}</h3>
                <ul className="journal-entry_tags">Tags: {tags }</ul>
                <div className="journal-entry_body">{constructBody()}</div>
            </div>
        </section>
    )
}

export default View;