import React, {useState, useEffect} from 'react'
import axios from "axios";


const App = () => {




  useEffect(() => {
    const fetchRecommendedCoffee = async () => {
      try {
        const response = await fetch('http://localhost:8000/api')
        const data = await response.json()
        console.log(data.api)
      } catch (error) {
        console.log(error)
      }
      

    }
   
    fetchRecommendedCoffee()
  }, [])
  
  return (
    <>
    
    <h1 className="text-3xl font-serif underline">
      Hello world!
    </h1>
    <h1 className="text-3xl font-cursive underline">
      Hello world!
    </h1>
    
    </>
  )
}

export default App
