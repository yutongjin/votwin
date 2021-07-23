import { useState } from 'react';

import VotesTable from './VotesTable.js'
import Button from "@material-ui/core/Button";

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
                <input type="text" value={idValue} onChange={localHandleIdInput} style={{marginLeft:10}}></input> &nbsp;
                <Button variant="contained" color="blue" component="span" onClick={handleVoteClicked}>Vote</Button>
            </p>
        </form>
    )
}

export default VotesSelectionForm;