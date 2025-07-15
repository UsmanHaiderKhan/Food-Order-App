import {useEffect, useState} from "react";
import MealItems from "./MealItems.jsx";
import useHttp from "../hooks/useHttp.jsx";
import Error from "./Error.jsx";

const requestConfig = {};
export default function Meals() {
    const{data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals',requestConfig,[]);
    if (isLoading){
    return <p className="center">Fetching Meals....!</p>
    }
    if (error){
        return <Error title="Failed to fetch Meals" message={error}/>
    }
    return (
            <ul id="meals">
                {loadedMeals.map((meal) => ( <MealItems key={meal.id} meal={meal} />  ))}
            </ul>

    );
}
