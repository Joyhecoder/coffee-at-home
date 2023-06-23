//1. import in RTK
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

//2. Define our action type
// export const fetch_recommended = "FETCH_RECOMMENDED"



//3. define an inital state
const initialState = {
    recommendedList: [],
    search: {},
    searchedName: ''
}


//4. Slice of global state
export const coffeeSlice = createSlice({
    name: 'coffee',
    initialState,
    reducers: {
        fetch_recommended: (state, action) => {
            console.log(action.payload)
            console.log(state.recommendedList.slice())
            // const updatedList = state.recommendedList.slice().concat(action.payload)
            // state.recommendedList = updatedList
            state.recommendedList = [...state.recommendedList, action.payload]
          

        },
        search_coffee: (state, action) =>{
            //in header.jsx coffee name and data are passed as an array
            let coffeeName = action.payload[0]
            let coffeeData = action.payload[1]
            state.search[coffeeName] = coffeeData
         
          
            
        },
        update_search_name: (state, action) => {
            state.searchedName = action.payload
        },
        reset_state: (state) => {
            console.log("inside reset")
            state.recommendedList = []
            state.search = {}
            state.searchedName = ''
        }
    }
})

export const {fetch_recommended, search_coffee, update_search_name, reset_state} = coffeeSlice.actions //create the actions for us from the reducers
export default coffeeSlice.reducer;



