import { useState } from 'react';
import ResultInfo from './ResultInfo.js';
import AddMoreQuestions from './AddMoreQuestions.js';

function ResultTable({ electionList }) {
    const [showResults, setShowResults] = useState(-1);
    const onClickShow = (id) => {
        console.log(id);
        if (id == showResults) {
            setShowResults(-1);
        } else {
            setShowResults(id); 
        }
    }

    return (
        <div>
            {
                electionList.map((election) =>
                    <div key={election.id}><label>{election.electionTitle}
                        <button type="button" onClick={() => {onClickShow(election.id)}}> See Results </button>
                        { election.id == showResults && <ResultInfo questions={election.questions}/> }
                    </label>
                    </div>
                )
            }
            <AddMoreQuestions />
        </div>
    )
}



export default ResultTable;