import React, { useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import GetAPIInfo from './components/GetAPIInfo'

function App() {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedID, setSelectedID] = useState(0)
  const [selectedValue, setSelectedValue] = useState('')
  const [startGame, setStartGame] = useState(false)

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((categories) => {
        setLoading(false)
        setCats(categories.data.trivia_categories)})
      }
  , [])

  if (loading) {
    return (
      <h1 className='loadingScreen'>Loading...</h1>
    )
  }

  // To handle the change when a specific item is selected from the dropdown and get the id
  const handleChange = (event) => {
    const selectValue = event.target.value
    setSelectedValue(selectValue)
    const findSelectedObject = cats.find((cat) => cat.name === selectValue)
    if (findSelectedObject) {
      const selectedObjKey = findSelectedObject.id
      setSelectedID(parseInt(selectedObjKey))
    }
  } 

  const handleClick = () => {
    if (!selectedID) {
      alert('Please select a category!')
    } else {
      setStartGame(true)
    }
  }

  if (startGame) {
    return (
      <GetAPIInfo
        selectedValue={selectedValue}
        selectedID={selectedID}
        startGame={startGame}
        setStartGame={setStartGame}
      />
    )
  }

  return (
    <div className="App">
      <h1 className="title">Welcome to Trivia!</h1>
      <h3 className="title">To begin, select a category and press start.</h3>
      <div className='selectorFrame'>
        <label for="category-selector" className='selectorLabel'>Please choose your Trivia Category:<br></br></label>
        <select className='category-selector' onChange={handleChange}>
          <option value=''>---Please Select a Category---</option>
          {cats.map((cat) => (
          <option value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <br></br>
        <button for='category-selector' className="categoryButton" onClick={handleClick}>Start Quiz!</button>
      </div>
    </div>
  );
}


export default App;
