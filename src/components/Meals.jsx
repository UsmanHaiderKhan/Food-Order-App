import {useEffect, useState} from "react";
import MealItems from "./MealItems.jsx";

export default function Meals() {
    const [loadedMeals, setLoadMeals] = useState([]);
    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await fetch('http://localhost:3000/meals');
                if (!response.ok) {
                     new Error('Network response was not ok');
                }
                const meals = await response.json();
                setLoadMeals(meals);
                return meals;
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
        fetchMeals();
    }, []);

    return (


            <ul id="meals">
                {loadedMeals.map((meal) => ( <MealItems key={meal.id} meal={meal} />  ))}
            </ul>

    );
}
