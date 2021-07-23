import { useState } from 'react';
import SaveElection from './SaveElection.js';

function AddMoreQuestions() {
    const [questionTitle, setQuestionTitle] = useState('');
    let [questionList, setQuestionList] = useState([]);

    const handleChange = (e) => {
        setQuestionTitle(e.target.value);
    }

    const handleAdd = () => {
        const newList = questionList.concat({ questionTitle });
        setQuestionList(newList);
        setQuestionTitle('');
        console.log(questionList);
    }

    return (
        <div>
            <form>
                <label>
                    Adding more questions:<br />
                    <input type="text" onChange={handleChange}/><br />
                    <button text="Add question" onClick={handleAdd}> Add Question </button>
                </label>
                <SaveElection />
            </form>
        </div>
    )
};

export default AddMoreQuestions;