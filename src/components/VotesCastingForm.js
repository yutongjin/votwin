import { check } from 'prettier';
import { useEffect, useState } from 'react';
import VotesCastingTable from './VotesCastingTable';

const emptyElection = {
    "id": 0,
    "electionTitle": "Loading",
    "questions": []
}

function VotesCastingForm({ electionId, userId, handleCastVoteClicked }) {
    const SERVER_URL = "http://localhost:3005/Elections";
    let [election, setElection] = useState(emptyElection);
    let [checkedList, setCheckedList] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_URL}/${electionId}`)
            .then(checkHttpStatus)
            .then((res) => res.json())
            .then((data) => setElection(data))
            .catch((error) => console.error(error));
    }, []);

    function checkHttpStatus(response) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            return Promise.reject(error);
        }
    }

    function handleCheckbox(event) {
        let newCheckedList = [...checkedList]
        if (newCheckedList.includes(event.target.id)) {
            newCheckedList.splice(newCheckedList.indexOf(event.target.id), 1);
        } else {
            newCheckedList.push(parseInt(event.target.id))
        }
        setCheckedList(newCheckedList);
    }

    function handleClick(event) {
        let newQuestions = [];
        election.questions.map((question) => {
            let newQuestion = {...question}

            checkedList.includes(question.id)
            ? newQuestion.totalYes += 1
            : newQuestion.totalNo += 1

            newQuestions.push(newQuestion);
        });

        let newElection = {...election, questions:[...newQuestions]};

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newElection),
        };
        fetch(`${SERVER_URL}/${newElection.id}`, requestOptions)
        .then(checkHttpStatus)
        .then(handleCastVoteClicked)
        .catch((error) => console.error(error))
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