import React, { useEffect, useState} from 'react';
import axios from 'axios';
import GameDetails from './GameDetails';

const GetAPIInfo = ({
    selectedValue,
    selectedID,
    setStartGame,
    startGame
}) => {
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const categoryURL = `https://opentdb.com/api.php?amount=10&category=${selectedID}`
        axios.get(categoryURL).then((res) => {
            setLoading(false)
            setRepos(res.data.results)
        })
    }, [selectedID])

    if(loading) {
        return (<h1>Loading...</h1>)
    }

    //Shuffles the array
    // const shuffleArray = (array) => {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         const temp = array[i];
    //         array[i] = array[j];
    //         array[j] = temp;
    //     }
    // }

    // const answers = [repos[index].correct_answer, ...repos[index].incorrect_answers]
    // shuffleArray(answers)
    // console.log(answers)

    return(
    <GameDetails
        selectedValue={selectedValue}
        selectedID={selectedID}
        setStartGame={setStartGame}
        startGame={startGame}
        repos={repos}
    />
    )
}

export default GetAPIInfo