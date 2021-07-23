import { useEffect, useState } from 'react';
import VotesSelectionForm from './VotesSelectionForm.js'
import VotesCastingForm from './VotesCastingForm.js'
import VoteCastingSuccess from './VotesCastingSuccess.js';

const VIEW = {
    SELECTING: "selecting",
    VOTING: "voting",
    SUCCESS: "success",
};

function CaptureVotes() {
    const SERVER_URL = "http://localhost:3005/Elections";
    let [electionList, setElectionList] = useState([]);
    let [electionSelected, setElectionSelected] = useState();
    let [idValue, setIdValue] = useState("");
    let [view, setView] = useState(VIEW.SELECTING);


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
        setView(VIEW.VOTING);

    }
    function handleCastVoteClicked() {
        setView(VIEW.SUCCESS);
    }

    function handleBackClicked() {
        setView(VIEW.SELECTING);
    }

    function renderFormBody() {
        switch (view) {
            case VIEW.SELECTING: 
                return <VotesSelectionForm electionList={electionList} handleOptionSelected={handleOptionSelected} handleIdInput={handleIdInput} handleVoteClicked={handleVoteClicked} />
            case VIEW.VOTING:
                return <VotesCastingForm electionId={electionSelected} userId={idValue} handleCastVoteClicked={handleCastVoteClicked} />
            case VIEW.SUCCESS:
                return <VoteCastingSuccess handleBackClicked={handleBackClicked} />
            default:
                return <VotesSelectionForm electionList={electionList} handleOptionSelected={handleOptionSelected} handleIdInput={handleIdInput} handleVoteClicked={handleVoteClicked} />
        }
    }

    return (
        <div className="center">
        {
            renderFormBody()
        }
        </div>
    )
}

export default CaptureVotes;