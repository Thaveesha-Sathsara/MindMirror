export const handleTagInput = (e, tags, setTagsList) => {
    // Check if the input value contains a space or a comma
    if (e.target.value.includes(' ') || e.target.value.includes(',')) {
        // Prevent the default behavior (e.g., adding a space) if a space key was pressed.
        // This is a subtle improvement that can prevent extra spaces from showing.
        if (e.code === 'Space') {
            e.preventDefault();
        }

        // Trim the value and remove any commas to get the tag word
        const newTag = e.target.value.trim().replace(',', '');

        // Only add the tag if it's not empty and not already in the list
        if (newTag && !tags.current.value.includes(newTag)) {
            setTagsList(prevState => [...prevState, newTag]);
        }
        
        // Clear the input field for the next tag
        tags.current.value = '';
    }
};

export const getTagButtons = (tagsList, setTagsList) => {
    return tagsList.map(tag => {
        return (
            <button
                className="button"
                value={tag}
                onClick={e => removeItem(e, tagsList, setTagsList)}
                type="button"
                key={Math.random() * 5}
            >
                {tag} X
            </button>
        )
    });
}


const removeItem = (e, tagsList, setTagsList) => {
    const newState = tagsList.filter(tag => {
        return tag !== e.target.value
    })
    setTagsList(newState);
}
