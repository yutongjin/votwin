import { useEffect, useState } from 'react';
import VotesSelectionForm from './VotesSelectionForm.js'

function CaptureVotes() {
    const SERVER_URL = "http://localhost:3005/Elections";
    let [electionList, setElectionList] = useState([]);
    let [electionSelected, setElectionSelected] = useState();
    let [idValue, setIdValue] = useState("");


    function checkHttpStatus(response) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            return Promise.reject(error);
        }
    }

    useEffect(() => {
        fetch(`${SERVER_URL}`)
            .then(checkHttpStatus)
            .then((res) => res.json())
            .then((data) => setElectionList(data))
            .catch((error) => console.error(error));
    }, []);


    function handleOptionSelected(event) {
        setElectionSelected(event.target.value);
    }

    function handleIdInput(event) {
        setIdValue(event.target.value);
    }

    function handleVoteClicked() {
        console.log(`Vote clicked: election selected ${electionSelected}, ID ${idValue}`);

    }

    return (
        <VotesSelectionForm electionList={electionList} handleOptionSelected={handleOptionSelected} handleIdInput={handleIdInput} handleVoteClicked={handleVoteClicked} />
    )
}

export default CaptureVotes;