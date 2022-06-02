/* eslint-disable import/no-anonymous-default-export */
import { GET_TICKERS_DATA } from "./actionTypes";
const initialState = {
    tickers: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TICKERS_DATA: {
            const { tickers } = action.payload;
            return {
                ...state,
                tickers
            }
        }
        default:{
            return state;
        }
    }
}