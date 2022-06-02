import React, { useEffect } from 'react';
import List from '@mui/material/List';
import TickerListItem from '../TickerListItem/TickerListItem';
import { ENDPOINT } from '../../constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { getTickersDataThunkCreator } from './action';
import socketIOClient from 'socket.io-client';

// const tickersArray = [
//     {
//         "ticker": "AAPL",
//         "exchange": "NASDAQ",
//         "price": 279.29,
//         "change": -64.52,
//         "change_percent": -0.84,
//         "dividend": 0.56,
//         "yield": 1.34,
//         "last_trade_time": "2021-04-30T11:53:21.000Z"
//     },
//     { "ticker": "GOOGL", "exchange": "NASDAQ", "price": 237.08, "change": 154.38, "change_percent": 0.10, "dividend": 0.46, "yield": 1.18, "last_trade_time": "2021-04-30T11:53:21.000Z" },
//     { "ticker": "MSFT", "exchange": "NASDAQ", "price": 261.46, "change": 161.45, "change_percent": 0.41, "dividend": 0.18, "yield": 0.98, "last_trade_time": "2021-04-30T11:53:21.000Z" },
//     { "ticker": "AMZN", "exchange": "NASDAQ", "price": 260.34, "change": -128.71, "change_percent": -0.60, "dividend": 0.07, "yield": 0.42, "last_trade_time": "2021-04-30T11:53:21.000Z" },
//     { "ticker": "FB", "exchange": "NASDAQ", "price": 266.77, "change": -171.92, "change_percent": -0.75, "dividend": 0.52, "yield": 1.31, "last_trade_time": "2021-04-30T11:53:21.000Z" },
//     { "ticker": "TSLA", "exchange": "NASDAQ", "price": 272.13, "change": 158.76, "change_percent": 0.10, "dividend": 0.96, "yield": 1.00, "last_trade_time": "2021-04-30T11:53:21.000Z" }
// ];


        
const socket = socketIOClient(ENDPOINT);
const TickersList = () => {

    const dispatch = useDispatch();
    const tickersArray = useSelector(state => state.tickerList.tickers);

    useEffect(() => {
        socket.emit('start', (res) => console.log(res))
        dispatch(getTickersDataThunkCreator(socket));
    }, [dispatch]);

    return <>
        <List
            sx={{
                paddingTop: '10vh',
            }}>
            {tickersArray.map((ticker) => {
                return <TickerListItem tickerData={ticker} key={ticker.ticker} />
            })}
        </List>
    </>
}

export default TickersList;