import React, { useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedID, setSelectedID] = useState('')
  

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

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedID(selectedValue);
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
          <option value={cat.key}>{cat.name}</option>
          ))}
        </select>
        <br></br>
        <button for='category-selector' className="categoryButton">Submit</button>
      </div>
    </div>
  );
}


export default App;
