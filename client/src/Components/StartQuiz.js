import React, { useState, useContext } from "react";
import "../styles/quizStyles.scss";
import categories from "../utils/Categories";
import {useHistory } from "react-router-dom";
import {userContext} from "../Context/context";
// import {routes} from "../routes/routes";

const StartQuiz = () =>{

    const history = useHistory();
    const [name,setName] = useState("");
    const [id,setId] = useState("");
    const [errorMessage,setErrorMessage] = useState(""); 
    // const [startQuiz,setStartQuiz] = useState(false);
const user = useContext(userContext);

    const formSubmit = e =>{
        e.preventDefault();
        if (id){
            const quizId = `${id}${Math.floor(Math.random() * 100000000)}`;
            const quizpath = "/quiz/"+user.userDetails.stuId+"/"+quizId;
            var startDate = new Date();
            history.push(quizpath,{id,category:name,startDate});
        }else {
            setErrorMessage("Please select a category");
        }
    }

    const formChange = e =>{
        const { value, options, selectedIndex } = e.target;
        setName(options[selectedIndex].innerHTML);
        setId(value);
    }

    const options = categories.map(category => (
        <option value={category.id} key={category.id}>
            {category.name}
        </option>
    ));

    return (
        <div>
        <section id='start' className='text-black text-center mb-5 container'>
        <h1 className='display-3 font-weight-bold'>ABC School Quiz</h1>
        <p className='lead mb-5'>
            Put your skills to the test and see how much you really know with this quiz! Choose a
            category in which to play the Trivia Quiz from General Knowledge, Animals,
            Entertainment, Geography and many more.
        </p>
        <form className='input-group' onSubmit={formSubmit}>
				<select
					className='custom-select'
					aria-label='Choose a quiz category'
					onChange={formChange}>
					<option defaultValue>Choose a category...</option>
					{options}
				</select>
				<div className='input-group-append'>
					<button className='btn btn-primary' type='submit'>
						Start quiz
					</button>
				</div>
			</form>
            <div>{errorMessage}</div>
    </section>
    </div>
    )
};

export default StartQuiz;