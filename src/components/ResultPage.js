import { useState, useMemo } from "react";
import "./styles.css";
import ElectionTable from "./ElectionTable.js";

import UserRow from "./UserRow.js";
import UserEditRow from "./UserEditRow.js";

function ResultPage(){

    // display a list of elections
    // view results
    return(
        <div><ElectionTable /></div>
    )
};

export default ResultPage;
