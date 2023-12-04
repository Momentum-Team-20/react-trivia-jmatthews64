import logo from './logo.svg';
import './App.css';
import React, { useState} from 'react';

function App() {
  const [cats, setCats] = useState('')
  return (
    <div className="App">
      <h1 className="title">Welcome to Trivia!</h1>
      <h3 className="title">To begin, select a category and press start.</h3>
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

export default App;
