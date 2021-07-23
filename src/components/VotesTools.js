import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { refreshUser } from "../actions/userActions";
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
  const usersList = useSelector((state) => state.users);
  const electionList = useSelector((state) => state.electionList);

  let [electionSelected, setElectionSelected] = useState(-1);
  let [idValue, setIdValue] = useState("");
  let [view, setView] = useState(VIEW.SELECTING);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(refreshVotesTable());
  }, []);

  function handleOptionSelected(event) {
    setElectionSelected(event.target.value);
  }

  function handleVoteClicked() {
    if (electionSelected === -1) {
      alert("Please selecte an Election");
      return;
    }

    if ((usersList.map((user) => `${user.id}`)).includes(idValue) === false) {
      alert("Invalid User ID");
      return;
    }

    const selectedUser = usersList.find((u) => { if (`${u.id}` === idValue) return u; });
    if (selectedUser.voted.includes(parseInt(electionSelected))) {
      alert(`User ${selectedUser.id} has already voted in Election #${electionSelected}`);
      return;
    }

    setView(VIEW.VOTING)
  }

  function handleCastVoteClicked() {
    setView(VIEW.SUCCESS);
  }

  function handleIdInput(event) {
    setIdValue(event.target.value);
  }

  function handleBackClicked() {
    setView(VIEW.SELECTING);
  }

  function renderFormBody() {
    switch (view) {
      case VIEW.SELECTING:
        return <VotesSelectionForm electionList={electionList} handleOptionSelected={handleOptionSelected} handleIdInput={handleIdInput} handleVoteClicked={handleVoteClicked} />
      case VIEW.VOTING:
        return <VotesCastingForm electionId={electionSelected} user={usersList.find((u) => { if (`${u.id}` === idValue) return u; })} handleCastVoteClicked={handleCastVoteClicked} />
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
