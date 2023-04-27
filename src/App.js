import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import FoodList from './components/FoodList';
import { Navigation } from './components/Navigation';
import AddRecipe from './components/AddRecipe';
import DeleteRecipe from './components/DeleteRecipe';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/foodlist' element={< FoodList />}></Route>
            <Route exact path='/addrecipe' element={< AddRecipe />}></Route>
            <Route exact path='/deleterecipe' element={< DeleteRecipe />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
