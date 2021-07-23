function VoteCastingSuccess({ handleBackClicked }) {
    return (
        <div>
            <div>Success</div>
            <div><input type="button" value="Back to Voting!" onClick={handleBackClicked} /></div>
        </div>
    )
}

export default VoteCastingSuccess;