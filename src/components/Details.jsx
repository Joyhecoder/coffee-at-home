import React from 'react'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'

const Details = () => {
    //get id from the prop
    const location = useLocation()
    const id = location.state
    //get all the recommended coffee from redux and filter to find the one that was clicked
    const coffeeFromRedux = useSelector(state => state.coffeeReducer.recommendedList)[0]
    const chosenCoffee = coffeeFromRedux.filter(coffee => coffee.recipe.id === id)
    console.log(chosenCoffee)
  return (
    <div>

        details 

        
    </div>
  )
}

export default Details