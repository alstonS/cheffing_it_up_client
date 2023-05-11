import { useEffect, useState } from "react";
import React from 'react';
import './FoodList.css'

const apiUrl = 'https://cheffing-it-up.herokuapp.com/';

function FoodItem({ recipe }) {
    return (
        <div className="food-item">
            <h3>{recipe.name}</h3>
            <p>Meal of Day: {recipe["meal of Day"]}</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Calories: {recipe.calories}</p>
            <p>Macronutrients:</p>
            <ul>
                <li>Protein: {recipe.Macronutrients.Protein} grams</li>
                <li>Carbohydrates: {recipe.Macronutrients.Carbohydrates} grams</li>
                <li>Fats: {recipe.Macronutrients.Fat} grams</li>
            </ul>
            <p>Micronutrients:</p>
            <ul>
                <li>Vitamin A: {recipe.Micronutrients["Vitamin A"]} grams</li>
                <li>Vitamin C: {recipe.Micronutrients["Vitamin C"]} grams</li>
                <li>Calcium: {recipe.Micronutrients.Calcium} grams</li>
                <li>Iron: {recipe.Micronutrients.Iron} grams</li>
            </ul>
        </div>
    );
}

function FoodList() {
    const [menu, setMenu] = useState([]);
    const [mealTypeFilter, setMealTypeFilter] = useState('');
    const [minCaloriesFilter, setMinCaloriesFilter] = useState('');
    const [maxCaloriesFilter, setMaxCaloriesFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(apiUrl + "/recipes/dict");
                const menu = await res.json();
                setMenu(menu);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = async () => {
        try {
            setIsLoading(true);
            console.log("Filters applied:", {
                mealTypeFilter,
                minCaloriesFilter,
                maxCaloriesFilter,
                sortBy,
            });

            const res = await fetch(
                apiUrl +
                `recipes/dict?meal_type=${mealTypeFilter}&min_calories=${minCaloriesFilter}&max_calories=${maxCaloriesFilter}&sort_by=${sortBy}`
            );
            const menu = await res.json();
            console.log("Fetched data after applying filters:", menu);
            setMenu(menu);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="food-list">
            <h2>Recipe List</h2>
            <div className="filters">
                <select onChange={(e) => setMealTypeFilter(e.target.value)}>
                    <option value="">All Meal Types</option>
                    <option value="anytime">Anytime</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Calories"
                    onChange={(e) => setMinCaloriesFilter(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Calories"
                    onChange={(e) => setMaxCaloriesFilter(e.target.value)}
                />
                <select onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="calories">Calories</option>
                </select>
                <button onClick={handleFilterChange}>Apply Filters</button>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                menu && menu.Data && (
                    Object.entries(menu.Data).map(([key, value]) => (
                        <FoodItem key={key} recipe={value} />
                    ))
                )
            )}
        </div>
    );
}

export default FoodList;
