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
    const coffee = chosenCoffee[0]
    console.log(coffee)
  return (
    <>
        <div className='bg-[#31572c] flex flex-wrap-reverse justify-center items-center py-2'>
            
            {/* content section */}
            <div className='mx-8 w-1/2'>
                <div className='font-cursive text-3xl text-rose-200'>
                    {coffee.recipe.label}
                </div>
                <br />
                <div className='mt-2 '>
                    {coffee.recipe.cuisineType.map(type => {
                        return (
                            <button key={type} className="bg-[#81b29a] hover:bg-[#c7f9cc] font-serif py-2 px-4 mr-3 rounded-full text-white font-bold" id={coffee.recipe.id}>
                            {type}
                          </button> 
                        )
                    })}
                </div>
                <div>
                    <ul className='mt-2 text-rose-200'>
                        {coffee.recipe.ingredientLines.map(ingredient =>{
                            return(
                                <li className='flex' key={ingredient}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                      
                                    </svg>
                                    <div className='font-serif ml-3'>
                                        {ingredient}
                                    </div>
                                  
                                   
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <br />
                <div className='font-cursive text-3xl text-rose-200'>
                    
                    Total time: {coffee.recipe.totalTime}
                </div>
                

                

            </div>

            {/* img section  */}
            <div className=''>
                <img className='p-8 rounded-full' src={coffee.recipe.images.REGULAR.url} alt="" />
            </div>
            

        </div>

        <div className="bg-[#f5ebe0] flex h-64 ">
            <div className="m-auto">
                <div className="font-serif font-3xl text-lime-700 font-bold flex items-center justify-center">MORE ABOUT THIS COFFEE</div>
                <br />
                <div className='text-lime-900 font-serif '>
                    {coffee.recipe.label} is a good choice for people who want a {coffee.recipe.dietLabels.map(label => <em>{label}, </em>)} yummy coffee. 
                </div>

            </div>
           
        </div>
    
    
    
    </>
  )
}

export default Details