import { useEffect, useState } from "react";
import JournalEntrySquare from "../../Component/JournalEntrySquare/JournalEntrySquare";
import { getTagButtons } from "../../utilities/utils";
import './Search.css';
import { useStore } from "../../context/StoreContext";
import { TbDeviceTabletSearch } from "react-icons/tb";
import { MdTipsAndUpdates } from "react-icons/md";

const Search = () => {
    const [tagsList, setTagsList] = useState([]);
    const [tagInputValue, setTagInputValue] = useState("");
    const { searchState, setSearchState } = useStore();
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Use the server URL from the environment variables
    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

    useEffect(() => {
        if (searchState && searchState[0] && searchState[0].tagsList) {
            setTagsList(searchState[0].tagsList);
        }
    }, [searchState]);

    // Use a useEffect to handle tag separation based on input changes
    useEffect(() => {
        if (tagInputValue.includes(' ') || tagInputValue.includes(',')) {
            const newTag = tagInputValue.trim().replace(',', '');
            if (newTag) {
                setTagsList(prevState => [...prevState, newTag]);
            }
            setTagInputValue("");
        }
    }, [tagInputValue, setTagsList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSearching(true);

        let finalTags = [...tagsList];
        const lastTag = tagInputValue.trim();
        if (lastTag) {
            finalTags = [...finalTags, lastTag];
        }

        if (finalTags.length === 0) {
            console.error('Please add at least one tag to search');
            setIsSearching(false);
            return;
        }
        
        try {
            const response = await fetch(`${serverUrl}/api/journals/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    tags: finalTags
                })
            });

            if (response.ok) {
                const result = await response.json();
                setSearchResults(result.journals || []);
                setSearchState([{
                    tagsList: finalTags,
                    journals: result.journals || []
                }]);
            } else {
                console.error('Search failed');
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error: ', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }

    return (
        <section className="search">
            <div className="search-container">
                <div className="search-header">
                    <h1>Search Your Journals</h1>
                    <p>Find specific entries by searching through your tags and keywords</p>
                </div>

                <form className="search-form" onSubmit={handleSubmit}>
                    <div className="search-form-container">
                        <div className="search-input-group">
                            <label htmlFor="tags">Search Tags</label>
                            <input
                                id="tags"
                                name="tags"
                                value={tagInputValue} // Control the input with state
                                onChange={(e) => setTagInputValue(e.target.value)} // Update state on change
                                placeholder="Add tags separated by spaces to search..."
                            />
                        </div>
                        
                        <div className="tag-buttons">
                            {getTagButtons(tagsList, setTagsList)}
                        </div>
                        
                        <button
                            className="search-button"
                            type="submit"
                            disabled={isSearching}
                        >
                            {isSearching ? 'Searching...' : 'Search Journals'}
                        </button>
                    </div>
                </form>

                <div className="search-results">
                    {searchResults.length > 0 ? (
                        <>
                            <div className="search-results-header">
                                <div className="search-results-count">
                                    Found <strong>{searchResults.length}</strong> journal entries
                                </div>
                            </div>
                            <JournalEntrySquare list={searchResults} />
                        </>
                    ) : searchState && searchState[0] && searchState[0].journals ? (
                        <>
                            <div className="search-results-header">
                                <div className="search-results-count">
                                    Previous search: <strong>{searchState[0].journals.length}</strong> entries
                                </div>
                            </div>
                            <JournalEntrySquare list={searchState[0].journals} />
                        </>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon"><TbDeviceTabletSearch /></div>
                            <h3>No journals found</h3>
                            <p>Try adding some tags and searching to find your journal entries.</p>
                        </div>
                    )}
                </div>

                <div className="search-tips">
                    <h3><MdTipsAndUpdates /> Search Tips</h3>
                    <ul>
                        <li>Add multiple tags to narrow down your search</li>
                        <li>Use specific tags like "mood", "goals", or "reflection"</li>
                        <li>Search by date-related tags like "morning" or "evening"</li>
                        <li>Combine emotional and topic tags for better results</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Search;
