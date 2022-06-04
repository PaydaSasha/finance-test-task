import {
    GET_TICKERS_DATA,
    STOP_UPDATE_TICKER,
    DELETE_TICKER,
    START_UPDATE_TICKER,
    CLEAR_FILTER_LIST,
    GET_FETCH_INTERVAL,
} from './actionTypes';

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
export const clearFilterList = () => ({
    type: CLEAR_FILTER_LIST,
    payload: {
    },
});

export const setUpdateInterval=(socket, interval)=>{
    socket.emit('change_interval', interval);
}

export const getFetchInterval = (interval) => ({
    type: GET_FETCH_INTERVAL,
    payload: {
        interval,
    },
});


export const getTickersDataThunkCreator = (socket) => (dispatch) => {
    socket.on('ticker', (tickersData, fetchInterval) => {
        dispatch(getFetchInterval(fetchInterval));
        dispatch(getTickersData(tickersData));
    });
};

