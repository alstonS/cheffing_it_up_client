import { useEffect, useState } from "react";
import React from 'react';
//import axios from 'axios';

const apiUrl = 'https://cheffing-it-up.herokuapp.com/';

function FoodList() {

    // useEffect(async () => {
    //   axios.get(apiUrl + 'food_menu/dict')
    //       .then((data)=> {
    //           console.log(data);
    //           debugger
    //       })
    // }, []);
    const [menu, setMenu] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const [showData, setShowData] = useState(false);
    const [showFoodTypes, setShowFoodTypes] = useState(false);

    const handleDataToggle = () => {
        setShowData((current) => !current);
    };

    const handleTypesToggle = () => {
        setShowFoodTypes((current) => !current);
    };

    useEffect(() => {
        const fetchData = () => {
            fetch(apiUrl + "/recipes/dict")
                .then((res) => res.json())
                .then((menu) => {
                    setMenu(menu);
                    setShowData(true);
                    console.log("There was a response");
                    console.log(menu);
                })
                .catch((error) => {
                    console.error(error);
                    console.log("In Error");
                });
        }
        const fetchFoodTypes = () => {
            fetch(apiUrl + "/food_types/list")
                .then((res) => res.json())
                .then((foodTypes) => {
                    setFoodTypes(foodTypes);
                    setShowFoodTypes(true);
                    console.log("There was a response");
                    console.log(foodTypes);
                })
                .catch((error) => {
                    console.error(error);
                    console.log("In Error");
                });
        };
        fetchData();
        fetchFoodTypes();
    }, []);






    console.log(menu)
    console.log("Hello")

    return (
        <div className="Testing React">
            <button onClick={handleDataToggle}>Show Information</button>
            <button onClick={handleTypesToggle}>Show Food Types</button>
            {showData && (
                <>
                    {menu && menu.Data ? (
                        Object.entries(menu.Data).map(([key, value]) => (
                            <div key={key}>
                                <h3>{value.name}</h3>
                                <p>Meal of Day: {value["meal of Day"]}</p>
                                <p>Ingredients: {JSON.stringify(value.ingredients)}</p>
                                <p>Calories: {value.calories}</p>
                                <p>Macronutrients: {JSON.stringify(value.Macronutrients)}</p>
                                <p>Micronutrients: {JSON.stringify(value.Micronutrients)}</p>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </>
            )}
            {showFoodTypes && (
                <>
                    {foodTypes && foodTypes.food_types_list ? (
                        foodTypes.food_types_list.map((foodType) => (
                            <div key={foodType}>
                                <h3>{foodType}</h3>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </>
            )}
        </div>
    );


    // const [menu, setMenu] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //   fetch("http://localhost:8000/food_types/list")
    //     .then(res => res.json())
    //     .then(menu => {
    //       setMenu(menu)
    //       console.log("There was a response")
    //       console.log(menu)
    //     })
    //     .catch(error => console.error(error))
    //     console.log("In Error")
    // }, [])

    // console.log(menu)
    // console.log("Hello")

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

export default FoodList;
