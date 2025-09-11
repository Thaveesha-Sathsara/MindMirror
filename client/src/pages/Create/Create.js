import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { getTagButtons } from "../../utilities/utils"; // No longer need handleTagInput here
import "./Create.css";
import { MdTipsAndUpdates } from "react-icons/md";

const Create = () => {
    const { setIsStoreUpdated } = useStore();
    const navigate = useNavigate();
    const [tagsList, setTagsList] = useState([]);
    const [tagInputValue, setTagInputValue] = useState(""); // New state for input value
    const [isSubmitting, setIsSubmitting] = useState(false);
    const title = useRef();
    const textArea = useRef();

    // Use the server URL from the environment variables
    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

    // This useEffect will watch for changes in the input value
    useEffect(() => {
        // Check if the input value contains a space or a comma
        if (tagInputValue.includes(' ') || tagInputValue.includes(',')) {
            const newTag = tagInputValue.trim().replace(',', '');
            if (newTag) { // Only add if it's not an empty string
                setTagsList(prevState => [...prevState, newTag]);
            }
            setTagInputValue(""); // Clear the input after separating the tag
        }
    }, [tagInputValue, setTagsList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Capture any remaining text in the input field
        const finalTags = [...tagsList];
        if (tagInputValue.trim()) {
            finalTags.push(tagInputValue.trim());
        }

        try {
            const response = await fetch(`${serverUrl}/api/journals/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    journal: {
                        tags: finalTags.filter(Boolean),
                        title: title.current.value,
                        body: textArea.current.value,
                    }
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Journal created successfully:', result);
                resetForm();
                setIsStoreUpdated(true);
                navigate('/');
            } else {
                try {
                    const errorData = await response.json();
                    console.error('Error creating journal:', errorData);
                } catch (jsonError) {
                    console.error(`Error creating journal. Server responded with status ${response.status} and non-JSON data.`);
                    console.error(response);
                }
            }
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const resetForm = () => {
        title.current.value = '';
        setTagInputValue(''); // Reset the tag input state
        textArea.current.value = '';
        setTagsList([]);
    }

    return (
        <section className="create">
            <div className="create-container">
                <div className="create-header">
                    <h1>Create New Journal Entry</h1>
                    <p>Capture your thoughts, feelings, and experiences in your personal space</p>
                </div>
                
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Journal Title</label>
                        <input 
                            id="title"
                            name="title" 
                            ref={title} 
                            required
                            placeholder="Give your journal entry a meaningful title..."
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <div className="tags-container">
                            <div className="tags-input">
                                <input 
                                    id="tags"
                                    name="tags" 
                                    value={tagInputValue} // Use state value here
                                    onChange={(e) => setTagInputValue(e.target.value)} // Use onChange
                                    placeholder="Add tags separated by spaces (e.g., mood thoughts goals)"
                                />
                            </div>
                            <div className="tag-buttons">
                                {getTagButtons(tagsList, setTagsList)}
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="journalEntry">Journal Content</label>
                        <textarea 
                            id="journalEntry"
                            name="journalEntry" 
                            ref={textArea}
                            required
                            placeholder="Write your thoughts, feelings, experiences, or anything you want to remember..."
                        />
                    </div>
                    
                    <button 
                        className="submit-button" 
                        type="submit" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Journal...' : 'Create Journal Entry'}
                    </button>
                </form>
                
                <div className="form-tips">
                    <h3><MdTipsAndUpdates /> Writing Tips</h3>
                    <ul>
                        <li>Write freely without worrying about grammar or structure</li>
                        <li>Include how you're feeling and why</li>
                        <li>Add tags to help you find entries later</li>
                        <li>Be honest with yourself - this is your private space</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Create;
