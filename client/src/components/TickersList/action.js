import { GET_TICKERS_DATA } from './actionTypes';

export const getTickersData = (tickers) => ({
    type: GET_TICKERS_DATA,
    payload: {
        tickers,
    },
});

export const getTickersDataThunkCreator = (socket) => (dispatch) => {
    socket.on('ticker', tickersData => {
        // console.log(tickersData);
        dispatch(getTickersData(tickersData));
    });
};