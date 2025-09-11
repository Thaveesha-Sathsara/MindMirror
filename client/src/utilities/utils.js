// Remove handleTagInput
// export const handleTagInput = (e, tags, setTagsList) => { ... };

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