import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import './AddRecipe.css'

const apiUrl = 'https://cheffing-it-up.herokuapp.com/';

export const AddRecipe = () => {
    //const [data, setData] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const addData = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        fetch(apiUrl + "recipes/add", requestOptions)
            .then((res) => res.json())
            .catch((error) => console.error(error));
    };

    const onSubmit = (data) => {

        data.Macronutrients = JSON.parse(data.Macronutrients);
        data.Micronutrients = JSON.parse(data.Micronutrients);
        console.log(JSON.stringify(data));
        addData(data);
    };



    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Recipe Name</label>
                    <input type="text" required name="name" {...register("name")} />
                </div>
                <div className="form-control">
                    <label>Meal of Day</label>
                    <input type="text" required name="meal of Day" placeholder='(breakfast, lunch, dinner)'{...register("meal of Day")} />
                </div>
                <div className="form-control">
                    <label>Ingredients</label>
                    <input type="text" required name="ingredients" placeholder='comma separated'{...register("ingredients")} />
                </div>
                <div className="form-control">
                    <label>Calories</label>
                    <input type="number" required name="calories" {...register("calories")} />
                </div>
                <div className="form-control">
                    <label>Macronutrients</label>
                    <input type="text" required name="Macronutrients" {...register("Macronutrients")} />
                </div>
                <div className="form-control">
                    <label>Micronutrients</label>
                    <input type="text" required name="Micronutrients" {...register("Micronutrients")} />
                </div>
                <div className="form-control">
                    <label></label>
                    <button type="submit">Add Recipe</button>
                </div>
            </form>
        </div>
    );
}

export default AddRecipe;