import { useState } from "react";
import React from 'react';

const apiUrl = 'https://cheffing-it-up.herokuapp.com/';

function FindRecipe() {

    const [menu, setMenu] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchText(event.target[0].value);
        fetchData(searchText);
    };


    const fetchData = (searchText) => {
        fetch(apiUrl + "/recipes/details/" + searchText)
            .then((res) => res.json())
            .then((menu) => {
                setMenu(menu);
                // setShowData(true);
                console.log("There was a response");
                console.log(menu);
            })
            .catch((error) => {
                console.error(error);
                console.log("In Error");
            });
    }


    console.log(menu);
    console.log(searchText);

    return (
        <div className="Testing React">
            <>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Search for a recipe by name" type='text' />
                </form>
                {JSON.stringify(menu)}
            </>

        </div>
    );



    // return (
    //   <div className="Testing React">
    //     {(menu && menu.food_types_list) ? (
    //       menu.food_types_list.map((foodType) => (
    //         <div key={foodType}>
    //           <h3>{foodType}</h3>
    //         </div>
    //       ))        
    //     ) : (
    //       <p>Loading...</p>
    //     )}
    //   </div>
    // );


}

export default FindRecipe;
