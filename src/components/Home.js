import React from 'react';
import './Home.css'
function Home() {

    return (
        <div className="Home">
            <h1> Welcome to Cheffing It Up! </h1>
            <h2> Please explore our database of recipes. </h2>
            <h2> Use the navigation bar above to: </h2>
            <div className='list'>
                <li> View all recipes in the database. </li>
                <li> Add your own recipe. </li>
                <li> Search for recipes by name or ingredients. </li>
                <li> Delete a recipe by name. </li>
            </div>
        </div>

    );

}

export default Home;
