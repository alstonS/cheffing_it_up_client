import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './DeleteRecipe.css';

const apiUrl = 'https://cheffing-it-up.herokuapp.com/';

export const DeleteRecipe = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const deleteData = (name) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(apiUrl + 'recipes/delete/' + name, requestOptions)
            .then((res) => {
                if (res.status === 200) {
                    alert('Successfully deleted the recipe.');
                } else {
                    res.json().then((data) => {
                        console.log('Error data:', data);
                        alert('Error deleting the recipe.');
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error deleting the recipe.');
            });
    };


    const onSubmit = (data) => {
        deleteData(data.name);
    };

    return (
        <div className='DeleteRecipe'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-control'>
                    <label>Recipe Name</label>
                    <input type='text' required name='name' {...register('name')} />
                </div>
                <div className='form-control'>
                    <button type='submit'>Delete Recipe</button>
                </div>
            </form>
        </div>
    );
};

export default DeleteRecipe;
