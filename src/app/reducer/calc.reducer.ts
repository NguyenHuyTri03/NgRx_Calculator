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
}

export const initialState: State = <Calc>{
    numA: '',
    numB: '',
    equation: '',
    result: '0',
    opPressed: false,
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
                if(!state.numB.includes('.')){
                    newState.numB = state.numB + '.';
                }
            }else if(action.key == 'd'){
                if(state.numA != '' && newState.opPressed == false){
                    newState.numA = newState.numA.slice(0, -1);
                }else if(state.numB != '' && newState.opPressed){
                    newState.numB = newState.numB.slice(0, -1);
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
            
            if(newState.equation != ''){
                if(action.key == '+' || action.key == '-' || action.key == 'x' || action.key == '/'){
                    newState.equation = action.key;
                    switch(state.equation){
                        case '+':
                            result = parseFloat(newState.numA) + parseFloat(newState.numB);
                            if(result % 1 != 0){
                                newState.numA = result.toFixed(2);
                            }else{
                                newState.numA = result.toString();
                            }
                            newState.numB = '';
                            break;
                        case '-':
                            result = parseFloat(newState.numA) - parseFloat(newState.numB);
                            if(result % 1 != 0){
                                newState.numA = result.toFixed(2);
                            }else{
                                newState.numA = result.toString();
                            }
                            newState.numB = '';
                            break; 
                        case 'x':
                            result = parseFloat(newState.numA) * parseFloat(newState.numB);
                            if(result % 1 != 0){
                                newState.numA = result.toFixed(2);
                            }else{
                                newState.numA = result.toString();
                            }
                            newState.numB = '';
                            break;
                        case '/':
                            result = parseFloat(newState.numA) / parseFloat(newState.numB);
                            newState.numA = result.toString();
                            newState.numB = '';
                            break;
                    }
                    newState.result = result.toString();
                }else if(action.key == 'AC'){
                    return{
                        ...state,
                        numA: '',
                        numB: '',
                        equation: '',
                        result: '0',
                        opPressed: false,
                    }
                }else if(action.key == '='){
                    switch(newState.equation){
                        case '+':
                            result = parseFloat(newState.numA) + parseFloat(newState.numB);
                            result.toFixed(2);
                            break;
                        case '-':
                            result = parseFloat(newState.numA) - parseFloat(newState.numB);
                            result.toFixed(2);
                            break; 
                        case 'x':
                            result = parseFloat(newState.numA) * parseFloat(newState.numB);
                            result.toFixed(2);
                            break;
                        case '/':
                            result = parseFloat(newState.numA) / parseFloat(newState.numB);
                            result.toFixed(2);
                            break;
                    }
                    newState.result = result.toString();
                }
                
            }else{
                if(action.key == '+' || action.key == '-' || action.key == 'x' || action.key == '/'){
                    newState.equation = action.key;
                }else if(action.key == 'AC'){
                    return{
                        ...state,
                        numA: '',
                        numB: '',
                        equation: '',
                        result: '0',
                        opPressed: false,
                    }
                }
                if(action.key == '='){
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
            }
            return newState;
        }
        return state;
    })
);