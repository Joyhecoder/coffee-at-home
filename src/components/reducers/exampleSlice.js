//1. import in RTK
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

//2. Define our action type
// export const fetch_recommended = "FETCH_RECOMMENDED"



//3. define an inital state
const initialState = {
    recommendedList: []
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
          

        }
    }
})

export const {fetch_recommended} = coffeeSlice.actions //create the actions for us from the reducers
export default coffeeSlice.reducer;



