function ResultInfo({ questions }) {
    return (
        <div> 
            {questions.map((question) => 
            <div>
                <label>
                    Question: {question.questionTitle}
                </label>
                <label>
                    Yes: {question.totalYes}
                </label>
                <label>
                    No: {question.totalNo}
                </label>
            </div>)}
        </div>
    );
};

export default ResultInfo;
