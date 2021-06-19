import { SET_INITIAL_AMOUNT } from "./actionTypes";

export const setInitialAmount = value => ({
  type: SET_INITIAL_AMOUNT,
  payload: { value }
})
