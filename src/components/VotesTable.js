
function VotesTable({ electionList, handleOptionSelected }) {

    return (
        <div>
            {
                electionList.map((election) =>
                    <div key={election.id}><label>
                        <input key={election.id} type="radio" name="elections" value={election.id} onChange={handleOptionSelected} />{election.electionTitle}
                    </label></div>
                )
            }
        </div>
    )
}

export default VotesTable;