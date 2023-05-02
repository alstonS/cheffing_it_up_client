import { useEffect, useState } from "react";
import React from 'react';
import './FindRecipe.css'

const apiUrl = 'https://cheffing-it-up.herokuapp.com/';

function FindRecipe() {

    const [menu, setMenu] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchBy, setSearchBy] = useState('');


    const handleSubmit = React.useCallback((event) => {
        event.preventDefault();
        setSearchBy(event.target[0].value)
        setSearchText(event.target[1].value);
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

    const fetchByIngredient = (searchText) => {
        fetch(apiUrl + "/recipes/find/" + searchText)
            .then((res) => {
                return res.json();
            })
            .then((menu) => {
                setMenu(menu);
                if (menu[`Dishes with ${searchText}`].length === 0) {
                    alert(`Dishes with ${searchText} were not found.`)
                }
                console.log(menu);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
                console.log("In Error");
            });
    }

    useEffect(() => {
        if (searchText !== '' && searchBy === 'name') {
            fetchData(searchText);
            console.log(searchText)
        }
        if (searchText !== '' && searchBy === 'ingredient') {
            fetchByIngredient(searchText);
        }
    }, [searchText]);

    return (
        <div className="FindRecipe">
            <>
                <form onSubmit={handleSubmit}>
                    <label for="options">Search by: </label>
                    <select name="options" id="options">
                        <option value="name">name</option>
                        <option value="ingredient">ingredient</option>
                    </select>
                    <br></br>
                    <input type='text' />

                </form>
                {searchBy === 'name' && menu[searchText] &&
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
                {searchBy === 'ingredient' && menu[`Dishes with ${searchText}`] &&
                    (<> <p> List of dishes with <strong> {searchText} </strong>: </p>
                        <p> {menu[`Dishes with ${searchText}`].map((item, index) => {
                            if (index === 0) {
                                return <>{item}</>
                            }
                            return <><br />{item}</>
                        })} </p>
                    </>)
                }
            </>
        </div >
    );


}

export default FindRecipe;
