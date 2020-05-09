import React, { useState, Fragment } from '../../node_modules/@types/react';
import {useHistory } from '../../node_modules/react-router-dom';
import Parser from '../../node_modules/html-react-parser';
import ProgressBar from './ProgressBar';
import ShareResults from "./ShareResults";
import {routes} from "../routes/routes";

const Result = () =>{
    const history = useHistory();
    const questionsWithUserAnswer = history.location.state.questions;
	const score = history.location.state.score;
	const startDate = history.location.state.startDate;
	const endDate = history.location.state.endDate;
	const [showAnswers, setShowAnswers] = useState(false);
	console.log(startDate);
	console.log(endDate);
	function diff(start, end) {
		var diff = end.getTime() - start.getTime();
		console.log("time diff is : "+diff);
		var milliseconds = parseInt((diff % 1000) / 100),
		seconds = Math.floor((diff / 1000) % 60),
		minutes = Math.floor((diff / (1000 * 60)) % 60),
		hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    
        // If using time pickers with 24 hours format, add the below line get exact hours
        if (hours < 0)
            hours = hours + 24;
    
        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes+ ":" + (seconds <= 9 ? "0" : "") + seconds;
	}
	
	const timeTaken = diff(startDate,endDate);

    const toggleAnswers = () =>{
		setShowAnswers(true);
	}

	const answers = questionsWithUserAnswer.map((item, i) => (
		<li className='list-group-item' key={i}>
			<span className='d-block font-weight-bold'>{Parser(item.question)}</span>
			{item.correct ? (
				<span className='d-block'>
					Your answer: {Parser(item.user_answer)} is correct.
				</span>
			) : (
				<span className='d-block'>
					Your answer: {Parser(item.user_answer)} is incorrect. Correct answer
					is {Parser(item.correct_answer)}.
				</span>
			)}
		</li>
	))

    return(
		<Fragment>
        <section className='container'>
			<div className='card mb-5 shadow-sm'>
				<div className='card-body'>
					<h2 className='card-title'>
						Congratulations! You have completed the quiz.
					</h2>
					<ProgressBar number='100' />
					<h3 className='card-subtitle mb-4'>
						You got {score} out of {questionsWithUserAnswer.length} questions right.
					</h3>
					<h3 className='card-subtitle mb-4'>
						Time taken to complete the quiz is {timeTaken}.
					</h3>
					<button className='btn btn-secondary mr-2' onClick={toggleAnswers}>
						Show answers
					</button>
					<button
						className='btn btn-secondary'
						onClick={() => history.push(routes.startQuiz)}>
						Start new quiz
					</button>
					<hr/>
					<ShareResults 
						url="www.abcschool.com/quiz/results" 
						text="Check below for your quiz results"
					/>
				</div>
			</div>
		</section>
		<div>
		{showAnswers ? (
			<div className='overflow-auto mt-4' style={{ height: '50vh' }}>
				<ul className='list-group list-group-flush '>{answers}</ul>
			</div>
		): null}
		</div>
		</Fragment>
    );
};

export default Result;