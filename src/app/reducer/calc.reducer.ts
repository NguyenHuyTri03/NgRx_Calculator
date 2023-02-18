import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { isEqualCheck } from "@ngrx/store/src/selector";
import { Calc } from "src/modules/calc.module";
import * as CalcActions from '../actions/calc.actions';

export interface State{
    numA: string;
    numB: string;
    equation: string;
    result: string;
    opPressed: boolean;
    equalPressed: boolean;
}

export const initialState: State = <Calc>{
    numA: '',
    numB: '',
    equation: '',
    result: '0',
    opPressed: false,
    equalPressed: false,
}

export const reducer = createReducer(
    initialState,
    on(CalcActions.keyPressed, (state, action) => {
        let newState = {...state};

        if(action.keyType == 'num'){
            if(action.key == '.' && !state.numA.includes('.')){
                if(!state.numA.includes('.')){
                    newState.numA = state.numA + '.';
                }
            }else if(action.key == '.' && !state.numB.includes('.') && newState.opPressed){
                console.log(state.numB.includes('.'));
                if(!state.numB.includes('.')){
                    newState.numB = state.numB + '.';
                }
            }else{
                if(state.numA == '0' || state.numA == ''){
                    newState.numA = action.key;
                }else if(state.numB == '0' || state.numB == '' && newState.opPressed){
                    newState.numB = action.key;
                }else{
                    if(newState.opPressed){
                        newState.numB = state.numB + action.key;
                    }else{
                        newState.numA = state.numA + action.key;
                    }
                }
            }
            console.log(newState);
            return newState;
        }else if(action.keyType == 'equation'){
            newState.opPressed = true;
            let result = 0;
            
            if(action.key == '+' || action.key == '-' || action.key == 'x' || action.key == '/'){
                newState.equation = action.key;
            }else if(action.key == 'AC'){
                return{
                    ...state,
                    numA: '',
                    numB: '',
                    equation: '',
                    result: '0',
                    opPressed: false
                }
            }  
            if(action.key == '='){
                newState.equalPressed = true;
                switch(newState.equation){
                    case '+':
                        result = parseFloat(newState.numA) + parseFloat(newState.numB);
                        break;
                    case '-':
                        result = parseFloat(newState.numA) - parseFloat(newState.numB);
                        break; 
                    case 'x':
                        result = parseFloat(newState.numA) * parseFloat(newState.numB);
                        break;
                    case '/':
                        result = parseFloat(newState.numA) / parseFloat(newState.numB);
                        break;
                }
                newState.result = result.toString();

                return{
                    ...state,
                    numA: '',
                    numB: '',
                    equation: '',
                    result: newState.result,
                    opPressed: false,
                }
            }
            console.log(newState);
            return newState;
        }
        return state;
    })
);