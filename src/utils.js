export const handleSpaceDown = (e, tags, setTagsList) => {
        if (e.code === 'Space' || e.KeyCode === 32 || e.code === 'Enter') {
            e.preventDefault();
            const tagsSeparated = tags.current.value.split(' ');
            const filterList = tagsSeparated.filter(tag => tag !== '')
            setTagsList(prevState => [...prevState, ...filterList])
            tags.current.value = '';
        }
}
    
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
