import React, { useEffect, useState} from 'react';
import axios from 'axios'

const GameDetails = ({
    selectedValue,
    selectedID,
    setStartGame,
    startGame
}) => {
    const [repos, setRepos] = useState([])
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [isAnswered, setIsAnswered] = useState(false)

    useEffect(() => {
        const categoryURL = 'https://placeholder-trivia-api.glitch.me/questions'
        axios.get(categoryURL).then((res) => {
            setLoading(false)
            setRepos(res.data.results)
        })
    }, [])

    if(loading) {
        return (<h1>Loading...</h1>)
    }

    const handleClick = (event) => {
        setIsAnswered(true)
    }

    const nextQuestion = (event) => {
        setIndex(index + 1)
        setIsAnswered(false)
    }

    const resetGame = (event) => {
        setStartGame(false)
    }

    if(isAnswered) {
        return (
            <div>
                <h3>The correct answer is: </h3>
                <p>{repos[index].correct_answer}</p>
                <button onClick={nextQuestion}>Next Question</button>
            </div>
        )
    }

    return (
        <div className="GameDetails">
            <h3>Welcome to the {selectedValue} quiz!</h3>
            <p>Question #{index + 1}: </p>
            <p>{repos[index].question}</p>
            <p>{repos[index].correct_answer}</p>
            {repos[index].incorrect_answers.map((answer) => (
                <p>{answer}</p>
            ))}
            <button onClick={handleClick}>Submit</button>
            <br></br>
            <button onClick={resetGame}>Restart Quiz</button>
        </div>
    )
}

//Create a function to display each question with multiple choice answers

const Question = (
    question,
    correct_answer
) => {
    return (
        <div>
            <p>{question}</p>
            <p>{correct_answer}</p>
        </div>
)}

export default GameDetails