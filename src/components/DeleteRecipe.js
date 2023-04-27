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
            body: JSON.stringify({ name }),
        };

        fetch(apiUrl + 'recipes/delete', requestOptions)
            .then((res) => {
                if (res.status === 200) {
                    alert('Successfully deleted the recipe.');
                } else {
                    alert('Error deleting the recipe.');
                }
            })
            .catch((error) => {
                console.error(error);
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
