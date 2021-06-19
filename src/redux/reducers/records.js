import { SET_INITIAL_AMOUNT } from "../actionTypes";

const initialState = {
  initialAmount: '1127098',
  records: [],
  file: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INITIAL_AMOUNT: {
      console.log('reducer set initial')
      const { value } = action.payload;
      return {
        ...state,
        initialAmount: value
      };
    }
    default:
      return state;
  }
}