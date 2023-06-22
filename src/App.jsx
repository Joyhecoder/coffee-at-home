import React, {useEffect} from 'react'
import axios from "axios";
import { useDispatch, useSelector} from 'react-redux'
import { fetch_recommended } from './components/reducers/exampleSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'



const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //change the window tab title to the page name
  useEffect(() => {
    document.title ="Home Page"
  }, [])
  
  const recommendedCoffeeRecipeData = useSelector(state => state.coffeeReducer.recommendedList)
//  const [recommendCoffee, setRecommendCoffee] = useState([])
let coffeeDataFromRedux

  useEffect(() => {
    const fetchRecommendedCoffee = async () => {
      try {
        const response = await fetch('http://localhost:8000/api')
        const data = await response.json()
        let apiKey = data.api

        // check to see if we need to fetch initial recommened data
        if(recommendedCoffeeRecipeData.length == 0){
          console.log("initial recommendedCoffeeRecipe is 0")
          const fetchCoffeeData = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=coffee&app_id=14295534&app_key=${apiKey}&diet=balanced`)
          console.log(fetchCoffeeData.data.hits)
          const exampleData = fetchCoffeeData.data.hits
          //create id for each data
          exampleData.forEach(data =>{
            data.recipe["id"] = uuidv4()
          })
          console.log(exampleData)
          dispatch(fetch_recommended(exampleData))
        }
       
      } catch (error) {
        console.log(error)
      }
    }
   
    fetchRecommendedCoffee()
  }, [])

  coffeeDataFromRedux = useSelector(state => state.coffeeReducer.recommendedList[0])
  console.log(coffeeDataFromRedux)

  const handleDetail = (e) => {
    e.preventDefault()
    console.log(e.target.id)
    navigate("/details", {state: e.target.id})
  }

 
  return (
    <>
    
    {/* <h1 className="text-3xl font-serif underline">
      Hello world!
    </h1>
    <h1 className="text-3xl font-cursive underline">
      Hello world!
    </h1> */}

    {/* filter section */}
    <div className="flex flex-wrap bg-[#f5ebe0] justify-center items-center ">



    </div>
    {/* end of filter section  */}

  
 {/* coffee display section */}
    <div className="flex flex-wrap bg-[#f5ebe0] justify-center items-center ">
    
    {coffeeDataFromRedux !== undefined ? 
    
  
    coffeeDataFromRedux.map(coffee => {
      return (

          <div className="w-full max-w-sm bg-white rounded-lg m-2 bg-opacity-0 hover:scale-110 transition duration-300 ease-in-out" id={coffee.recipe.id} onClick={(e)=> handleDetail(e)}>
              <a href="" id={coffee.recipe.id}>
              
                  <img className="p-8 rounded-full" src={coffee.recipe.images.REGULAR.url} alt="product image" id={coffee.recipe.id} />
              </a>
              <div className="px-5 pb-5" id={coffee.recipe.id}>
                  <a href="" id={coffee.recipe.id}>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" id={coffee.recipe.id}>{coffee.recipe.label}</h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5" id={coffee.recipe.id}>
                    {coffee.recipe.dietLabels.map(label => {
                      return (
                        <button class="bg-pink-300 hover:bg-pink-500 text-white font-serif py-2 px-4 mr-3 rounded-full" id={coffee.recipe.id}>
                          {label}
                        </button> 
                      )
                    })}
                  </div>
                
              </div>
          </div>

      )
    })
    
   
    :
    <></>
  
  }
  </div>
  {/* end of coffee display section */}
    
    </>
  )
}

export default App
