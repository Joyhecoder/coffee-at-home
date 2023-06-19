//1. import in RTK
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

//2. Define our action type
export const FETCH_RECOMMENDED = "FETCH_RECOMMENDED"



//3. define an inital state
const initialState = {
    recommendedList: []
}


//4. Slice of global state
const coffeeSlice = createSlice({
    name: 'coffee',
    initialState,
    reducers: {
        fetch_recommended(state, action){
            state.recommendedList.concat(action.payload)
        }
    }
})

export const coffeeActions = coffeeSlice.actions //create the actions for us from the reducers
export default coffeeSlice.reducer;



