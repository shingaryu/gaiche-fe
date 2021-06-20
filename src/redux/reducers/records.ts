import TimeSeriesBalance from "../../models/TimeSeriesBalance";
import { SET_INITIAL_AMOUNT } from "../actionTypes";

interface RecordsState {
  initialAmount: string,
  records: TimeSeriesBalance[],
  file: File | null
}

const initialState: RecordsState = {
  initialAmount: '1127098',
  records: [],
  file: null
};

export default function(state: RecordsState = initialState, action: any) {
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