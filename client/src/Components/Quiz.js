import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";
import axios from "axios";
import {useHistory,useParams} from "react-router-dom";
import ProgressBar from "./ProgressBar";
import {routes} from "../routes/routes";
import networkRequests from "../services/networkRequests";

const Quiz = props => {
    const { stuId,quizId } = useParams();
    const history = useHistory();
    const category = history.location.state.category;
    const id = history.location.state.id;
    const startDate = history.location.state.startDate;
    
    const [loaded,setLoaded] = useState(false);
    const [questions,setQuestions] = useState([]);
    const [current,setCurrent] = useState(0);
    const [score,setScore] = useState(0);
    const [quizOver,setQuizOver] = useState(false);
    const [answerFromUser,setAnswerFromUser] = useState("");
    const [correctAnswer,setCorrectAnswer] = useState("");
    const [answerSubmitted,setAnswerSubmitted] = useState(false);

    useEffect(()=>{
        const url = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=easy&type=multiple`;
        axios
			.get(url)
			.then(response => {
                for(let i=0;i<=9;i++){
                    const { question, incorrect_answers, correct_answer } = response.data.results[i];
                    setQuestions(questions =>[...questions,{
                        		question: question,
                        		correct_answer: correct_answer,
                        		incorrect_answers: incorrect_answers,
                        		user_answer: '',
                        		correct: ''
                        	}
                    ]);
                };
                // console.log("inside useeffect");
                setLoaded(true);
			})
			.catch(error => console.error(error))
    },[]);
   
    const updateResult = result => {
        if(result.correct){
            setScore(score+1);
        }
        saveUserAnswer(result);
        // showNextQuestion();
    };
    
    const saveUserAnswer = result => {
        const i = current;
        const { correct, answer } = result;
        const updatedQuestions = [...questions];
        
		updatedQuestions[i] = {
			...updatedQuestions[i],
			user_answer: answer,
			correct: correct
        }
        
    // updatedQuestions[i].user_answer = answer;
    // updatedQuestions[i].correct = correct;
    // setQuestionsWithUserAnswer(questionsWithUserAnswer=>[...questionsWithUserAnswer,updatedQuestions]);
    setQuestions([...updatedQuestions]);
    }

    const showNextQuestion = () =>{
        if (current === questions.length - 1) {
            setQuizOver(true);
            return
        }
        setAnswerSubmitted(false);
        setCorrectAnswer("");
        setCurrent(current+1);
    }

    const updateChange = e => setAnswerFromUser(e.target.value);

    if(quizOver){
        var endDate = new Date();
        const quizpath = "/quiz/"+stuId+"/"+quizId;
        networkRequests(quizpath, "POST", { questions,stuId,quizId })
            .then(response => {
                console.log(response.status);
                history.push(routes.quizResult,{questions,score,startDate,endDate});
            })
            .catch(error => {
                    console.log(error);
      });
        
    };

    if(loaded){
        const { question, incorrect_answers, correct_answer } = questions[current];
        const options = [...incorrect_answers, correct_answer];

        const checkboxes = options.map((answer, index) => (
			<div className='custom-control custom-radio' key={index}>
				<input
					type='radio'
					id={Parser(answer)}
					name={Parser(answer)}
					className='custom-control-input'
					value={Parser(answer)}
					onChange={updateChange}
					checked={answerFromUser === answer}
				/>
				<label className='custom-control-label' htmlFor={Parser(answer)}>
					{Parser(answer)}
				</label>
			</div>
        ))

        const checkAnswer = e => {
            e.preventDefault();
            const result = {
                correct: answerFromUser === correct_answer,
                answer: answerFromUser
            }
            setAnswerSubmitted(true);
            if (answerFromUser === correct_answer)
                setCorrectAnswer("correct");
            else
                setCorrectAnswer("Incorrect");
            setAnswerFromUser("");
            updateResult(result);
        }
        
    return (
        <section className='container'>
        <div className='card mb-5 shadow-sm'>
            <div className='card-body'>
                <h2 className='card-title text-muted'>
                    {category} Quiz | Question {current + 1}
                </h2>
                <ProgressBar number={current * 10} />
                <h3 className='card-subtitle mb-3'>{Parser(question)}</h3>
                <form onSubmit={checkAnswer}>
                    <div className='mb-4'>{checkboxes}</div>
                    {answerFromUser ? (
                        <button className='btn btn-secondary' type='submit'>
                        Submit Answer
                        </button>
                    ):null}

                    {answerSubmitted  && correctAnswer === "correct" ? (
                        <span className='d-block ans-dis'>
                            Your answer: {Parser(questions[current].user_answer)} is correct.
                        </span>
                        ):null}
                    {answerSubmitted  && correctAnswer === "Incorrect" ? (
                        <span className='d-block ans-dis'>
                        Your answer: {Parser(questions[current].user_answer)} is incorrect. Correct answer
                        is {Parser(questions[current].correct_answer)}.
                    </span>
                    ):null}

                    {answerSubmitted ? (
                    <button className='btn btn-secondary' onClick={showNextQuestion}>
                        Next question
                    </button>):null}
			    </form>
            </div>
        </div>
        </section>
    )
} else {
    return (
		<div className='d-flex justify-content-center'>
			<div className='spinner-border text-white' role='status'>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	)
}
};

export default Quiz;