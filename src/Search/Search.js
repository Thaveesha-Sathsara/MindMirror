import { use, useEffect, useRef, useState } from "react";
import JournalEntrySquare from "../Component/JournalEntrySquare/JournalEntrySquare";
import { handleSpaceDown, getTagButtons } from "../utils";
import './Search.css';
import { useStore } from "../StoreContext";

const Search = () => {
    const [tagsList, setTagsList] = useState([]);
    const { searchState, setSearchState } = useStore();
    const [searchObject, setSearchObject] = useState([{
        tagsList: [],
        journals: []
    }]);

    useEffect(() => {
        console.log(searchState);
        if (searchState === undefined) {
            setSearchState(searchObject);
            return;
        }
        setSearchObject(searchState);
        setTagsList(searchState[0].tagsList);
    }, []);

    const tags = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const journals = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                tags: tagsList
            })
        })
        .then(res => res.json())
            .catch(error => console.error('Error: ', error));
        setSearchObject([searchObject[0].journals = journals.journals, searchObject[0].tagsList = tagsList])
        setSearchState(searchObject);
    }

    return (
        <section className="search">
            <div className="search_journal-container">
                <form
                    className="search_form-container"
                    onSubmit={(e) => handleSubmit(e)}
                >
                 <div className="tags">
                    <label htmlFor="tags">Tags {getTagButtons(tagsList, setTagsList)}</label>
                    <input className="text-background" name="tags" ref={tags} onKeyDown={(e) => handleSpaceDown(e, tags, setTagsList)} />
                </div>
                <button className="button" type="submit">Search</button>
            </form>
            <div className="search_journal-list">
                    {searchState === undefined ? null : <JournalEntrySquare list={searchState[0].journals} />}
                </div>
            </div>
        </section>
    )
}

export default Search;