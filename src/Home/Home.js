import { useEffect, useState } from "react";
import JournalEntrySquare from "../Component/JournalEntrySquare/JournalEntrySquare";
import { useStore } from "../StoreContext";
import "./Home.css";

const Home = () => {
    const { store, setStore, isStoreUpdated, setIsStoreUpdated } = useStore();
    const fetchData = async() => {
        const journals = await fetch('/get-journals', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error: ', error));
        setStore([{ journalList: journals.journals || [] }])
    }

    useEffect(() => {
        if (isStoreUpdated) {
            fetchData();
            setIsStoreUpdated(false);
        }
    }, []);


    if (!store) {
        return <div>Waiting...</div>
    }


    console.log(store);
    return (
        <section className="home">
            <div className="home-journal-container">
                <h1 className="home_header">Welcome to your Journal Thaveesha</h1>
                <div className="home-journal-list">
                    <JournalEntrySquare list={store[0].journalList} />
                </div>
            </div>
        </section>
    )
};

export default Home;
