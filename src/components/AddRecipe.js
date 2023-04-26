import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './AddRecipe.css'

const apiUrl = 'https://cheffing-it-up.herokuapp.com/';

export const AddRecipe = () => {
    const [foodTypes, setFoodTypes] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const fetchFoodTypes = () => {
            fetch(apiUrl + '/food_types/list')
                .then((res) => res.json())
                .then((foodTypes) => {
                    setFoodTypes(foodTypes['food_types_list']);
                })
                .catch((error) => {
                    console.error(error);
                    console.log('In Error');
                });
        };
        fetchFoodTypes();
    }, []);

    const addData = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        fetch(apiUrl + 'recipes/add', requestOptions)
            .then((res) => {
                res.json();
                if (res.status === 200) {
                    alert('Sucessfully added a recipe.');
                } else {
                    alert('Error adding a recipe.');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Error adding a recipe.');
            });
    };

    const onSubmit = (data) => {
        let macros = {
            'Protein': parseFloat(data['Protein']),
            'Carbohydrates': parseFloat(data['Carbohydrates']),
            'Fat': parseFloat(data['Fat'])
        };
        let micros = {
            'Vitamin A': parseFloat(data['Vitamin A']),
            'Vitamin C': parseFloat(data['Vitamin C']),
            'Calcium': parseFloat(data['Calcium']),
            'Iron': parseFloat(data['Iron'])
        };
        data['calories'] = parseFloat(data['calories']);
        data.Macronutrients = macros;
        data.Micronutrients = micros;
        //making sure these fields won't appear in the database
        delete data['Protein']
        delete data['Carbohydrates']
        delete data['Fat']
        delete data['Fats']
        delete data['Vitamin A']
        delete data['Vitamin C']
        delete data['Calcium']
        delete data['Iron']
        addData(data);
    };



    return (
        <div className='AddRecipe'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-control'>
                    <label>Recipe Name</label>
                    <input type='text' required name='name' {...register('name')} />
                </div>
                <div className='form-control'>
                    <label>Meal of Day</label>
                    <select {...register('meal of Day')}>

                        {foodTypes?.map((currentFoodType, index) => {
                            return <option key={index} >
                                {currentFoodType}
                            </option>
                        })}
                    </select>
                </div>
                <div className='form-control'>
                    <label>Ingredients</label>
                    <input type='text' required name='ingredients' placeholder='comma separated'{...register('ingredients')} />
                </div>
                <div className='form-control'>
                    <label>Calories</label>
                    <input type='number' required name='calories' {...register('calories')} />
                </div>
                <div className='form-control'>
                    <label>Macronutrients</label>
                    <div> Protein: <input type='number' required name='Protein' {...register('Protein')} /> grams </div>
                    <div> Carbohydrates: <input type='number' required name='Carbohydrates' {...register('Carbohydrates')} /> grams </div>
                    <div> Fat: <input type='number' required name='Fat' {...register('Fat')} /> grams </div>

                </div>
                <div className='form-control'>
                    <label>Micronutrients</label>
                    <div> Vitamin A: <input type='number' required name='Vitamin A' {...register('Vitamin A')} /> grams </div>
                    <div> Vitamin C: <input type='number' required name='Vitamin C:' {...register('Vitamin C')} /> grams </div>
                    <div> Calcium: <input type='number' required name='Calcium' {...register('Calcium')} /> grams </div>
                    <div> Iron: <input type='number' required name='Iron' {...register('Iron')} /> grams </div>

                </div>
                <div className='form-control'>
                    <label></label>
                    <button type='submit'>Add Recipe</button>
                </div>
            </form>
        </div>
    );
}

export default AddRecipe;