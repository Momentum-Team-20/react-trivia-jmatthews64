import React, { useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("useFX is running")
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

  return (
    <div className="App">
      <h1 className="title">Welcome to Trivia!</h1>
      <h3 className="title">To begin, select a category and press start.</h3>
      <div className='categoryList'>
      
      </div>
      <div className='selectorFrame'>
        <label for="category-selector" className='selectorLabel'>Please choose your Trivia Category:<br></br></label>
        <select className='category-selector'>
          <option value="">---Please Select a Category---</option>
          {cats.map((cat) => (
        <Category 
          key={cat.id}
          name={cat.name}
        />
      ))}
        </select>
        <br></br>
        <button for='category-selector' className="categoryButton">Submit</button>
      </div>
    </div>
  );
}

function Category(props) {
  return (
    <option value={props.key}>{props.name}</option>
  )
}

export default App;
