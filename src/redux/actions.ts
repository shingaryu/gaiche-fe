import { SET_INITIAL_AMOUNT } from "./actionTypes";

export const setInitialAmount = (value: string) => ({
  type: SET_INITIAL_AMOUNT,
  payload: { value }
})
