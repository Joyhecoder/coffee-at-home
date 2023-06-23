import {  useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector} from 'react-redux'
import { search_coffee, update_search_name } from '../reducers/exampleSlice';
import { v4 as uuidv4 } from 'uuid';
import { Dialog,  Popover} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {  PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import logo from '../assets/img/logo.JPG'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [coffee, setCoffee] = useState('')
  const dispatch = useDispatch()

  const searchedCoffee = useSelector(state => state.coffeeReducer.search)
  
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

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex flex-wrap">
            <img className="h-20 w-auto rounded-full" src={logo} alt="logo" />
            <span className="self-center ml-4 font-cursive text-xl">COFFEE AT HOME</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-lg font-serif leading-6 text-gray-900">
            Home
          </a>
          <a href="/recipe" className="text-lg font-serif leading-6 text-gray-900">
            Recipe
          </a>
          {/* <a href="/about" className="text-lg font-serif leading-6 text-gray-900">
            HomeMade Coffee Tips
          </a> */}
        </Popover.Group>
        {/* search bar section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="pt-2 relative mx-auto text-gray-600">
            <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search" name="search" placeholder="Search" onChange={e=>setCoffee(e.target.value)}/>
            <button type="submit" className="absolute right-4 top-0 mt-5 ml-3" onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-gray-600 h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"  />
              </svg>
            </button>
          </div>
        </div>
        {/* end of search bar section */}
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 flex flex-wrap">
              <img
                className="h-12 w-auto rounded-full"
                src={logo}
                alt="logo"
              />
              <span className="self-center ml-4 font-cursive text-xl">COFFEE AT HOME</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              
                {/* </Disclosure> */}
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-serif leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <a
                  href="/recipe"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-serif leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Recipe
                </a>
                {/* <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-serif leading-7 text-gray-900 hover:bg-gray-50"
                >
                  HomeMade Coffee Tips
                </a> */}
              </div>
              {/* search bar section */}
              <div className="py-6">
                <div className="pt-2 relative mx-auto text-gray-600">
                  <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search" onChange={e=>setCoffee(e.target.value)} />
                  <button type="submit" className="absolute right-4 top-0 mt-5 ml-3" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-gray-600 h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"  />
                    </svg>
                  </button>
                </div>
              </div>
              {/* end of search bar section */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
