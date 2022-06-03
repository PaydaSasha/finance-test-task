/* eslint-disable import/no-anonymous-default-export */
import { GET_TICKERS_DATA, STOP_UPDATE_TICKER, START_UPDATE_TICKER, DELETE_TICKER } from "./actionTypes";
const initialState = {
    tickers: [],
    filteredTickersArray: [],
    stopUpdateTickersArray: [],
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
        case STOP_UPDATE_TICKER: {
            const { ticker } = action.payload;
            const stopUpdateTickersArray = state.stopUpdateTickersArray;
            stopUpdateTickersArray.push(ticker);
            return {
                ...state,
                stopUpdateTickersArray,
            }
        }
        case START_UPDATE_TICKER: {
            const { ticker } = action.payload;
            let stopUpdateTickersArray = state.stopUpdateTickersArray;
            stopUpdateTickersArray = stopUpdateTickersArray.filter(el=> ticker !== el);
            return {
                ...state,
                stopUpdateTickersArray,
            }
        }
        case DELETE_TICKER: {
            const { ticker } = action.payload;
            const filteredTickersArray = state.filteredTickersArray;
            filteredTickersArray.push(ticker);            
            return {
                ...state,
                filteredTickersArray,
            }
        }
        default: {
            return state;
        }
    }
}