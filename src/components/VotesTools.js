import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { refreshVotesTable } from '../actions/votesActions.js'

import VotesSelectionForm from './VotesSelectionForm.js'
import VotesCastingForm from './VotesCastingForm.js'
import VoteCastingSuccess from './VotesCastingSuccess.js';

const VIEW = {
    SELECTING: "selecting",
    VOTING: "voting",
    SUCCESS: "success",
};

function CaptureVotes() {
    const dispatch = useDispatch();
    const electionList = useSelector((state) => state.electionList);

    let [electionSelected, setElectionSelected] = useState();
    let [idValue, setIdValue] = useState("");
    let [view, setView] = useState(VIEW.SELECTING);

    useEffect(() => {
        dispatch(refreshVotesTable());
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
        <div>
        {
            renderFormBody()
        }
        </div>
    )
}

export default CaptureVotes;