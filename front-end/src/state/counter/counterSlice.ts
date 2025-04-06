import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// this file will contain everything we need/related to our counter slice
// actions, reducers, state

// first: define our state
interface CounterState {
  value: number;
}

// initialize your state
const initialState: CounterState = {
  value: 0,
};

// create your slice
const counterSlice = createSlice({
  // name of your slice
  name: "counter",
  // initial state of your slice, as defined above
  initialState,
  reducers: {
    // NOTE: Redux doesn't allow to mutate the state directly, so while the code below looks
    // like it's directly changing things, createSlice form redux-toolkit actually creates a copy of the state behind the scenes
    // and apply the changes to it, then return to us the value of the new state
    // while the abstraction is confusing, it does help a lot in managing the copies of the state
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    reset: state => {
      state.value = 0;
    },
    // here we want to give it a more finetuned behaviour, passing on a parameter
    // the payload is the information that we're giving to our state
    incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload;
    }
  },
  // place your async reducers in the separate section
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.pending, () => {
        console.log("incrementAsync.pending");
    })
    .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.value += action.payload;
    })
  }
});

// For regular actions, define the reducers first - then action
// For async actions, define action first, then reducer

// Redux takes care of naming the actions above (increment, decrement, etc), 
// but here we must define it ourselves: "counter/incrementAsync"
export const incrementAsync = createAsyncThunk("counter/incrementAsync", 
    async(amount: number) => {
        // simulating a fetch request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return amount;
    }
)

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// now you can export this to your main store
export default counterSlice.reducer;
