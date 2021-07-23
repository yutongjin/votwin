import { useState } from 'react';

function AddMoreQuestions() {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionList, setQuestionList] = useState([]);

    const handleChange = (e) => {
        setQuestionTitle(e.target.value);
    }

    const handleAdd = () => {
        const newList = questionList.concat({ questionTitle });
        setQuestionList(newList);
        setQuestionTitle('');
        console.log(questionList);
    }

    const handleSaveElection = () => {
        
    }

    return (
        <div>
            <form>
                <label>
                    Adding more questions:<br />
                    <input type="text" onChange={handleChange}/><br />
                    <button text="Add question" onClick={handleAdd}> Add Question </button>
                </label>
                <button text="Save Election" onClick={handleSaveElection}> Save Election </button>
            </form>
        </div>
    )
};

export default AddMoreQuestions;

// This one is called from our UI, eg <CarForm onAdd{addCar} />
// export function addCar(car) {
//     return (dispatch) => {
//       dispatch(createAddCarRequestAction());
//       return fetch("http://localhost:3060/cars", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(car),
//       }).then(() => dispatch(refreshCars()));
//     };
//   }
//   // These two are action creators, so you can dispatch() them:
//   export const createAddCarRequestAction = () => ({
//     type: ADD_CAR_REQUEST_ACTION,
//   });
//   // This is called once we've added the car. As you can see in addCar(),
//   // when the POST is done, we then can get the latest list of cars from
//   // the server.
//   export const refreshCars = () => {
//     return (dispatch) => {
//       dispatch(createRefreshCarsRequestAction());
//       return fetch("http://localhost:3060/cars")
//         .then((res) => res.json())
//         .then((cars) => dispatch(createRefreshCarsDoneAction(cars)));
//     };
//   };