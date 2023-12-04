import React, { useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [cats, setCats] = useState([])

  useEffect(() => {
    console.log("useFX is running")
    axios
      .get('https://opentdb.com/api_category.php')
      .then((categories) => setCats(categories.data.trivia_categories))
  }, [])

  return (
    <div className="App">
      <h1 className="title">Welcome to Trivia!</h1>
      <h3 className="title">To begin, select a category and press start.</h3>
      <div className='categoryList'>
      {cats.map((cat) => (
        <Category 
          key={cat.id}
          name={cat.name}
        />
      ))}
      </div>
      <div className='selectorFrame'>
        <label for="category-selector" className='selectorLabel'>Please choose your Trivia Category:<br></br></label>
        <select className='category-selector'>
          <option value="">---Please Select a Category---</option>
        </select>
        <br></br>
        <button for='category-selector' className="categoryButton">Submit</button>
      </div>
    </div>
  );
}

function Category(props) {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  )
}

export default App;
