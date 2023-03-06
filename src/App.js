import {useState, useEffect} from "react";
import React from 'react';
import axios from 'axios';

const apiUrl = 'https://alstons.pythonanywhere.com/';

function App() {
  // const [menu, setMenu] = useState([]);
  // useEffect(async () => {
  //   axios.get(apiUrl + 'food_menu/dict')
  //       .then((data)=> {
  //           console.log(data);
  //           debugger
  //       })
  // }, []);

  // return(
  //   <div className="app">
  //     app
  //   </div>

  // );

  // Testing getting data back from other api server 
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get('https://swapi.dev/api/people/');
        setPeople(data.data?.results);
      } catch (e) {
        setError('Something went wrong');
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="Application Test">
      {error && <h3>{error}</h3>}
      {people.length ? (
        <div>
          {people.map((person) => (
            <h1>{person.name}</h1>
          ))}
        </div>
      ) : (
        <div>loading ....</div>
      )}
    </div>
  );  
}

export default App;
