import React, { useEffect, useState} from 'react';
import axios from 'axios'

const GameDetails = ({
    selectedValue,
    selectedID
}) => {
    const [repos, setRepos] = useState([])

    useEffect(() => {
        const categoryURL = `https://opentdb.com/api.php?amount=10&category=${selectedID}`
        axios.get(categoryURL).then((res) => {
            setRepos(res.data.results)
        })
    }, [])

    return (
        <div className="GameDetails">
            <h3>Welcome to the {selectedValue} quiz!</h3>
            {repos.map((repo) => (
                <p>{repo.question}</p>
            ))}
        </div>
    )
}

export default GameDetails