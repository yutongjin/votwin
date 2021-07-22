import { useState } from 'react';

import VotesTable from './VotesTable.js'

function VotesSelectionForm({ electionList, handleOptionSelected, handleIdInput, handleVoteClicked }) {
    let [idValue, setIdValue] = useState("");

    function localHandleIdInput(event) {
        setIdValue(event.target.value);
        handleIdInput(event);
    }

    return (
        <form>
            <VotesTable electionList={electionList} handleOptionSelected={handleOptionSelected} />
            <p>
                User ID:
                <input type="text" value={idValue} onChange={localHandleIdInput}></input> &nbsp;
                <input type="button" value="Vote" onClick={handleVoteClicked}></input>
            </p>
        </form>
    )
}

export default VotesSelectionForm;