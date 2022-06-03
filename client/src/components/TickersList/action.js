import { GET_TICKERS_DATA, STOP_UPDATE_TICKER, DELETE_TICKER, START_UPDATE_TICKER } from './actionTypes';

export const getTickersData = (tickers) => ({
    type: GET_TICKERS_DATA,
    payload: {
        tickers,
    },
});

export const stopUpdateTicker = (ticker) => ({
    type: STOP_UPDATE_TICKER,
    payload: {
        ticker,
    },
});

export const startUpdateTicker = (ticker) => ({
    type: START_UPDATE_TICKER,
    payload: {
        ticker,
    },
});

export const deleteTicker = (ticker) => ({
    type: DELETE_TICKER,
    payload: {
        ticker,
    },
});


export const getTickersDataThunkCreator = (socket) => (dispatch) => {
    socket.on('ticker', tickersData => {
        dispatch(getTickersData(tickersData));
    });
};

