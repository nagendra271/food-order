// import { useEffect } from "react";
// import { useState } from "react";
import MealItem from "./MealItem";
import useHttp from '../hooks/useHttp.js'
import Error from "./Error";

const requestConfig = {}

const Meals = () =>{
    // const [loadedMeals, setLoadedMeals] = useState([])

    const {data:loadedMeals, error, isLoading} = useHttp('http://localhost:3000/meals', requestConfig, [])

    console.log(loadedMeals)

    // useEffect(()=>{
    //     async function fetchMeals() {
    //         const response = await fetch('http://localhost:3000/meals');
    //         if(!response.ok){
    //             // ....
    //         }
    //         const mealsData = await response.json();
    //         setLoadedMeals(mealsData);
    //     }
    //     fetchMeals();
    // },[]);

    if(isLoading){
        return <p className="center">Fetching meals....</p>
    }

    if(error){
        return <Error title="Failed to fetch meals" message= {error.message} />
    }

    return(
        <ul id="meals">
            {loadedMeals.map(meal=>(<MealItem key={meal.id} meal={meal}/>))}
        </ul>
    )
}

export default Meals;