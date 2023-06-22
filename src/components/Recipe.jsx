import React from 'react'
import { useDispatch, useSelector} from 'react-redux'

const Recipe = () => {
  const searchedCoffee = useSelector(state => state.coffeeReducer.search)
  const searchedCoffeeName = useSelector(state => state.coffeeReducer.searchedName)
  console.log(searchedCoffeeName)
  console.log(searchedCoffee)

  let coffeeDataFromRedux 
  if(searchedCoffeeName in searchedCoffee){
    coffeeDataFromRedux = searchedCoffee[searchedCoffeeName]
  }
  console.log(coffeeDataFromRedux)
  return (
    <div>Recipe</div>
  )
}

export default Recipe