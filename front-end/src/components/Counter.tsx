import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { decrement, incrementAsync } from "../state/counter/counterSlice";


const Counter = () => {
    // useSelector is a hook that takes your state as a param
    // this is how you actually connect React to Redux
    const count = useSelector((state: RootState) => state.counter.value);
    
    // then we define a dispatch to dispatch our actions
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <h2>{count}</h2>
            <div>
                <button onClick={()=> dispatch(incrementAsync(10))}>
                    Increment
                </button>
                <button onClick={()=> dispatch(decrement())}>
                    Decrement
                </button>
            </div>
        </div>
    )
};

export default Counter;