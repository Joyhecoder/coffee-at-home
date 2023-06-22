import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { search_coffee, update_search_name } from './reducers/exampleSlice';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const searchedCoffee = useSelector(state => state.coffeeReducer.search)
  const searchedCoffeeName = useSelector(state => state.coffeeReducer.searchedName)
  //change the window tab title to the page name
  useEffect(() => {
    document.title ="Recipe"
  }, [])

  const [coffee, setCoffee] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()



  let coffeeDataFromRedux 
  if(searchedCoffeeName in searchedCoffee){
    coffeeDataFromRedux = searchedCoffee[searchedCoffeeName]
  }
  console.log(coffeeDataFromRedux)


  // search recipe function
  const handleSearch = async (e) => {
    e.preventDefault()
    console.log(coffee)
    //fetch data
    try {
      const response = await fetch('http://localhost:8000/api')
      const data = await response.json()
      let apiKey = data.api
      console.log(searchedCoffee)
      //check if the keyword is saved in redux
      if(searchedCoffee[coffee] === undefined){
        console.log("not in redux")
        let fetchCoffeeData = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${coffee}&app_id=14295534&app_key=${apiKey}`)
        console.log(fetchCoffeeData.data.hits)
        const exampleData = fetchCoffeeData.data.hits
        //create id for each data
        exampleData.forEach(data => {
          data.recipe["id"] = uuidv4()
        })

        dispatch(search_coffee([coffee, exampleData]))
      }
      dispatch(update_search_name(coffee))


    } catch (error) {
      
    }
  }

  //handle detail
  const handleDetail = (e) => {
    e.preventDefault()
    console.log(e.target.id)
    navigate("/searchDetails", {state: e.target.id})
  }

  return (
    < >
      {coffeeDataFromRedux === undefined ? 
      <div className=' flex flex-wrap'>
        <div className='max-w-3xl flex flex-col justify-center items-center'>
          {/* search bar section */}
          <div className=" lg:flex lg:flex-1 lg:justify-end">
            <div className="pt-2 relative mx-auto text-gray-600">
              <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search" name="search" placeholder="eg: latte" onChange={e=>setCoffee(e.target.value)}/>
              <button type="submit" className="absolute right-4 top-0 mt-5 ml-3" onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-gray-600 h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"  />
                </svg>
              </button>
            </div>
        </div>
          {/* gif section */}
          <img src="https://cdn.dribbble.com/users/1285390/screenshots/13433202/media/deb7213f0e0ac2db2393e13ae52639a9.gif" alt="" className='object-contain'/>
        
        </div>
        
        <div className='max-w-3xl font-cursive text-lg bg-[#f5ebe0] flex flex-wrap justify-center items-center rounded-lg'>
          <div className='flex flex-wrap justify-center items-center font-serif text-3xl py-3'>
            MAKE COFFEE AT HOME
            <div className='w-5/6'>
            <br />
            <p className='font-serif text-lg'>
              Why do we make coffee at home? Why not just drive to a local coffee shop and get a cup of coffee?
            </p>
            <br />
            <p className='font-serif text-lg'>
             There are servral compkelling reasons why individuals should consider making coffee at home. First and foremost, brewing coffee at home allows for complete control over the entire coffee-making process. From selecting the type of coffee beans to determining the strength and flavor profile, individuals have the freedom to experiment and tailor their coffee to their exact preferences. This level of customization ensures a truly personalized and satisfying coffee experience. 
            </p>
            <br />
            <p className='font-serif text-lg'>
            Making coffee at home offers significant cost savings compared to purchasing coffee from coffee ships or cafes.
            </p>
            <br />
            <p className='font-serif text-lg'>
            Making coffee at home also encourages creativity and the exploration of various brewing techniques. 
            </p>

          </div>
          </div>
         
        
       
          
          </div>
      </div> :
      <div className="flex flex-wrap bg-[#f5ebe0] justify-center items-center ">
        {
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
        }


      </div>
    
    }
     
    </>
  )
}

export default Recipe