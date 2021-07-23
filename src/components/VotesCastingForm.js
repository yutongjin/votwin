import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { refreshQuestionsTable, updateElection } from '../actions/votesActions.js'


function VotesCastingForm({ electionId, handleCastVoteClicked }) {
    const dispatch = useDispatch();
    const election = useSelector((state) => state.election);

    let [checkedList, setCheckedList] = useState([]);

    useEffect(() => {
        dispatch(refreshQuestionsTable(electionId));
    }, []);

    function handleCheckbox(event) {
        let newCheckedList = [...checkedList]
        if (newCheckedList.includes(event.target.id)) {
            newCheckedList.splice(newCheckedList.indexOf(event.target.id), 1);
        } else {
            newCheckedList.push(parseInt(event.target.id))
        }
        setCheckedList(newCheckedList);
    }

    function handleClick() {
        let newQuestions = [];
        election.questions.map((question) => {
            let newQuestion = {...question}

            checkedList.includes(question.id)
            ? newQuestion.totalYes += 1
            : newQuestion.totalNo += 1

            newQuestions.push(newQuestion);
        });

        let newElection = {...election, questions:[...newQuestions]};
        dispatch(updateElection(newElection, handleCastVoteClicked));
    }

    return (
        <form>
            <p>{election.electionTitle}</p>
            {
                election.questions.map((question) => {
                    return (
                        <div>
                            <input type="checkbox" id={question.id} name={question.id} onChange={handleCheckbox} /> &nbsp; 
                            <label for={question.id}>{question.questionTitle}</label>
                        </div>
                    )
                })
            }
            <p>
                <input type="button" value="Cast Vote" onClick={handleClick} />
            </p>
        </form>
    )
}

export default VotesCastingForm;