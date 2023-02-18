// import { createReducer, on } from "@ngrx/store";
// import { InitialState } from "@ngrx/store/src/models";
// import { Counter } from "src/modules/counter.module";
// import { CounterAction, CounterActionType } from "../actions/counter.actions";} from '../actions/counter.actions'

// const initialState = <Counter>{
//     count: 0,
// };

// export interface CalcState{
//     count: 0;
//     test: 0;
// }

// export const counterReducer = createReducer(
//     {count: 0},
//     on(CounterAction.Increment, state => ({count: state.count + 1})),
//     on(CounterAction.Decrement, state => ({count: state.count - 1})),
//     on(Counter.Reset, state => ({count: 0}))
// )

// const initialState: Array<Counter> = [
//     {
//         count: 0,
//         test: 0,
//     }
// ]

// export function CounterReducer(
//     state: Array<Counter> = initialState,
//     action: CounterAction
// ){
//     switch(action.type){
//         case CounterActionType.INCREMENT:
//             console.log("state: " + state);
//             return state;
//         default:
//             console.log("none");
//             break;
//     }
// }