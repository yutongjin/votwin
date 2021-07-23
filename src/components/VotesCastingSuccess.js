import Button from "@material-ui/core/Button";

function VoteCastingSuccess({ handleBackClicked }) {
    return (
        <div>
            <div>Success</div>
            <div><Button
          variant="contained"
          color="blue"
          component="span" onClick={handleBackClicked}  >Back to vote!</Button></div>
        </div>
    )
}

export default VoteCastingSuccess;