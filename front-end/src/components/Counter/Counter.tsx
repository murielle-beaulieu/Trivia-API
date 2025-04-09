import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { decrement, increment} from "../../state/counter/counterSlice";


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
                <button onClick={()=> dispatch(decrement())}>
                    Decrement
                </button>
                <button onClick={()=> dispatch(increment())}>
                    Increment
                </button>
            </div>
        </div>
    )
};

export default Counter;