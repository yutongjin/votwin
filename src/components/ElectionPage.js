import ResultTable from "./ResultTable.js";
import { useEffect, useState } from 'react';

function ElectionPage() {
    let [electionList, setElectionList] = useState([]);
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

    useEffect(() => {
        fetch(`${SERVER_URL}`)
            .then(checkHttpStatus)
            .then((res) => res.json())
            .then((data) => setElectionList(data))
            .catch((error) => console.error(error));
    }, []);
    return (
        <div> 
            <ResultTable electionList={electionList}/>
        </div>
    )
};

export default ElectionPage;
