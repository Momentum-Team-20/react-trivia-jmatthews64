import React, { useEffect, useState} from 'react';
import axios from 'axios';
import GetAPIInfo from './GetAPIInfo';


const GameDetails = ({
    selectedValue,
    selectedID,
    setStartGame,
    startGame,
    questions,
}) => {
    const [index, setIndex] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)
    const [endQuiz, setEndQuiz] = useState(false)
    const [chosenAnswer, setChosenAnswer] = useState('')
    const [score, setScore] = useState(0)

    const handleClick = (event) => {
        setIsAnswered(true)
    }


    const resetGame = (event) => {
        setStartGame(false)
    }

    const recordAnswer = (event) => {
        const answer = event.target.value
        setChosenAnswer(answer)
        if(answer === questions[index].correctAnswer) {
            setScore(score + 1)
        }
    }


    //If the question was answered and submitted display whether the user was right and their score.
    if(isAnswered) {
        return (
            <div>
                <Answer
                    chosenAnswer={chosenAnswer}
                    correctAnswer={questions[index].correctAnswer}
                />
                <p>Your current score is {score}</p>
                <h3>The answer is: </h3>
                <p>{questions[index].correctAnswer}</p>
                <FinalQuestion
                    index={index}
                    length={questions.length}
                    setIndex={setIndex}
                    setEndQuiz={setEndQuiz}
                    setIsAnswered={setIsAnswered}
                    />
            </div>
        )
    }
    
    //If you're at the end of the repo, display the final page rather than going back to the main page
    if(endQuiz) {
        return(
            <div>
                <h3>End of Quiz</h3>
                <h3>You got {score} answers correct!</h3>
                <button onClick={resetGame}>Return Home</button>
            </div>
        )
    }

    // Main question display that shows the questions and possible answers
    return (
        <div className="GameDetails">
            <h3>Welcome to the {selectedValue} quiz!</h3>
            <p>Question #{index + 1}: </p>
            <p>{questions[index].question}</p>
            <form>
                {questions[index].answerChoices.map((answer) => (
                    <label>
                        <input type='radio' name='answer' value={answer} onChange={recordAnswer}></input>
                        {answer}
                    </label>
                ))}
            </form>
            <button className='submitAnswer' onClick={handleClick}>Submit</button>
            <br></br>
            <button onClick={resetGame}>Return Home</button>
        </div>
    )
}

//Create a function to display each question with multiple choice answers

const FinalQuestion = ({index, length, setIndex, setEndQuiz, setIsAnswered}) => {
    const nextQuestion = (event) => {
        setIndex(index + 1)
        setIsAnswered(false)
    }

    const seeScore = (event) => {
        setEndQuiz(true)
        setIsAnswered(false)
    }

    if(index === length - 1) {
        return (<button onClick={seeScore}>See Score</button>)
    } else {
        return (<button onClick={nextQuestion}>Next Question</button>)
    }
}

const Answer = ({chosenAnswer, correctAnswer}) => {
    if(chosenAnswer === correctAnswer) {
        return (<h3 className="right">You are correct!</h3>)
    } else {
        return (<h3 className='wrong'>You are incorrect</h3>)
    }
}


export default GameDetails