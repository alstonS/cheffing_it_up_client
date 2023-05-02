import { useEffect, useState } from "react";
import React from 'react';

const apiUrl = 'https://cheffing-it-up.herokuapp.com/';

function FindRecipe() {

    const [menu, setMenu] = useState([]);
    const [searchText, setSearchText] = useState('');


    const handleSubmit = React.useCallback((event) => {
        event.preventDefault();
        setSearchText(event.target[0].value);
    }, []);

    const fetchData = (searchText) => {
        fetch(apiUrl + "/recipes/details/" + searchText)
            .then((res) => {
                if (res.status === 404) {
                    throw new Error(`${searchText} was not found.`)
                }
                else {
                    return res.json();
                }
            })
            .then((menu) => {
                setMenu(menu);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
                console.log("In Error");
            });
    }

    useEffect(() => {
        if (searchText !== '') {
            fetchData(searchText);
            console.log(searchText)
        }
    }, [searchText]);

    return (
        <div className="Testing React">
            <>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Search for a recipe by name" type='text' />
                </form>
                {menu[searchText] &&
                    (<>
                        <h3> {menu[searchText]['name']} </h3>
                        <p>Meal of Day: {menu[searchText]["meal of Day"]}</p>
                        <p>Ingredients: {(menu[searchText]['ingredients']).join(', ')}</p>
                        <p>Calories: {menu[searchText]['calories']}</p>
                        <p>Macronutrients:</p>
                        <p className='indent'> Protein: {menu[searchText].Macronutrients['Protein']} grams</p>
                        <p className='indent'> Carbohydrates: {menu[searchText].Macronutrients['Carbohydrates']} grams</p>
                        <p className='indent'> Fats: {menu[searchText].Macronutrients['Fat']} grams</p>
                        <p>Micronutrients: </p>
                        <p className='indent'> Vitamin A: {menu[searchText].Micronutrients['Vitamin A']} grams</p>
                        <p className='indent'> Vitamin C: {menu[searchText].Micronutrients['Vitamin C']} grams</p>
                        <p className='indent'> Calcium: {menu[searchText].Micronutrients['Calcium']} grams</p>
                        <p className='indent'> Iron: {menu[searchText].Micronutrients['Iron']} grams</p>
                    </>)
                }
            </>
        </div >
    );


}

export default FindRecipe;
