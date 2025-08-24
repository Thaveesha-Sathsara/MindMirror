import { use, useRef, useState } from "react";
import "./Create.css";
import { useStore } from "../StoreContext";
import { handleSpaceDown, getTagButtons } from "../utils";

const Create = () => {
    const { setIsStoreUpdated } = useStore();
    const [tagsList, setTagsList] = useState([]);
    const title = useRef();
    const textArea = useRef();
    const tags = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
            journal: {
                tags: [...tagsList],
                title: title.current.value,
                body: textArea.current.value,
            }
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error: ', error));
        resetForm();
        setIsStoreUpdated(true);
    }

    const resetForm = () => {
        title.current.value = '';
        tags.current.value = '';
        textArea.current.value = '';
        setTagsList([]);
    }

    return (
        <section className="create">
            <form className="create_fields" onSubmit={(e) => handleSubmit(e)}>
                <div className="tags">
                    <label htmlFor="title">Title</label>
                    <input className="text-background" name="title" ref={title}/>
                </div>
                 <div className="tags">
                    <label htmlFor="tags">Tags {getTagButtons(tagsList, setTagsList)}</label>
                    <input className="text-background" name="tags" ref={tags} onKeyDown={(e) => handleSpaceDown(e, tags, setTagsList)} />
                </div>
                <label className="journalEntry_label" htmlFor="JournalEntry">Make a new entry</label>
                <textarea className="journalEntry text-background" name="JournalEntry" ref={textArea}></textarea>
                <button className="button" type="submit">Create</button>
            </form>
        </section>
    )
}

export default Create;