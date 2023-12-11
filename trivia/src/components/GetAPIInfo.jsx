import React, { useEffect, useState} from 'react';
import axios from 'axios';
import GameDetails from './GameDetails';
import {shuffle} from 'lodash'
import he from 'he'

const GetAPIInfo = ({
    selectedValue,
    selectedID,
    setStartGame,
    startGame
}) => {
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState([])


    useEffect(() => {
        const categoryURL = `https://opentdb.com/api.php?amount=10&category=${selectedID}`
        axios.get(categoryURL).then((res) => {
            setLoading(false)
            setQuestions(
            res.data.results.map((obj) => ({
                question: he.decode(obj.question),
                correctAnswer: he.decode(obj.correct_answer),
                answerChoices: shuffle([
                    obj.correct_answer,
                    ...obj.incorrect_answers,
                ])
            })))
        })
    }, [])

    if(loading) {
        return (<h1>Loading...</h1>)
    }

    console.log(questions)

    return(
    <GameDetails
        selectedValue={selectedValue}
        selectedID={selectedID}
        setStartGame={setStartGame}
        startGame={startGame}
        questions={questions}
    />
    )
}

export default GetAPIInfo