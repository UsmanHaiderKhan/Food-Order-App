import {useEffect, useState} from "react";

export default function Meals() {
    const [loadedMeals, setLoadMeals] = useState([]);
    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await fetch('https://api.example.com/meals');
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
                {loadedMeals.map((meal) => ( <li key={meal.id}>{meal.name}</li>  ))}
            </ul>

    );
}
