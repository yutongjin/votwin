export const REFRESH_VOTES_LIST = "REFRESH_VOTES_LIST";
export const REFRESH_QUESTIONS_LIST = "REFRESH_QUESTIONS_LIST";

const SERVER_URL = "http://localhost:3005/Elections";

function checkHttpStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
    }
}

export const refreshVotesTable = () => {
    return (dispatch) => {
        fetch(`${SERVER_URL}`)
            .then(checkHttpStatus)
            .then((res) => res.json())
            .then((data) => dispatch(refresh(REFRESH_VOTES_LIST, data)))
            .catch((error) => console.error(error));
    };
};

export const refreshQuestionsTable = (electionId) => {
    return (dispatch) => {
        fetch(`${SERVER_URL}/${electionId}`)
            .then(checkHttpStatus)
            .then((res) => res.json())
            .then((data) => dispatch(refresh(REFRESH_QUESTIONS_LIST, data)))
            .catch((error) => console.error(error));
    };
};

export const updateElection = (election, handleCastVoteClicked) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(election),
    };

    return (dispatch) => {
        fetch(`${SERVER_URL}/${election.id}`, requestOptions)
            .then(checkHttpStatus)
            .then(dispatch(handleCastVoteClicked))
            .catch((error) => console.error(error))
    };
}

export function refresh(type, data) {
    return {
        type,
        data,
    };
}