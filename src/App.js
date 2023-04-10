import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import FoodList from './components/FoodList';
import { Navigation } from './components/Navigation';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/foodlist' element={< FoodList />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
