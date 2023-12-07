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
    const [endQuiz, setEndQuiz] = useState(false)
    const [chosenAnswer, setChosenAnswer] = useState('')
    const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });

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


    const resetGame = (event) => {
        setStartGame(false)
    }

    const recordAnswer = (event) => {
        const answer = event.target.value
        setChosenAnswer(answer)
    }
    
    
    if(isAnswered) {
        return (
            <div>
                <h3>The correct answer is: </h3>
                <p>{repos[index].correct_answer}</p>
                <FinalQuestion
                    index={index}
                    length={repos.length}
                    setIndex={setIndex}
                    setEndQuiz={setEndQuiz}
                    setIsAnswered={setIsAnswered}
                    />
            </div>
        )
    }
    
    if(endQuiz) {
        return(
            <div>
                <h3>End of Quiz</h3>
                <button onClick={resetGame}>Return Home</button>
            </div>
        )
    }

    return (
        <div className="GameDetails">
            <h3>Welcome to the {selectedValue} quiz!</h3>
            <p>Question #{index + 1}: </p>
            <p>{renderHTML(repos[index].question)}</p>
            <div className='radioInput'>
                <form onChange={recordAnswer}>
                    <label className='answerLabel'>
                        <input type='radio'name='answer' value={renderHTML(repos[index].correct_answer)}></input>
                        {renderHTML(repos[index].correct_answer)}
                    </label>
                    {repos[index].incorrect_answers.map((answer) => (
                        <label className='answerLabel'>
                            <input type='radio' name='answer' value={renderHTML(answer)}></input>
                            {renderHTML(answer)}
                        </label>
                    ))}
                </form>
            </div>
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

export default GameDetails