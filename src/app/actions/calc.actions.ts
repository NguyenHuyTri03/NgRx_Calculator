import { createAction, props } from "@ngrx/store";

/**
 * Keypressed
 * PrintResult
 */

export const keyPressed = createAction(
    '[Calc Page] KeyPressed',
    props<{ key: string, keyType: string}>(),
)

export const printResult = createAction(
    '[Calc Page] Result',
    props<{ result: string}>(),
);