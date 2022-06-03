import React, { useEffect } from 'react';
import List from '@mui/material/List';
import TickerListItem from '../TickerListItem/TickerListItem';
import { ENDPOINT } from '../../constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { getTickersDataThunkCreator } from './action';
import socketIOClient from 'socket.io-client';
import { tickersListStyle } from '../../styles/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { addCircleIconStyle } from '../../styles/styles';


const socket = socketIOClient(ENDPOINT);

const TickersList = () => {

    const dispatch = useDispatch();
    const { tickers, filteredTickersArray, stopUpdateTickersArray } = useSelector(state => state.tickerList)

    useEffect(() => {
        socket.emit('start');
        dispatch(getTickersDataThunkCreator(socket));
    }, [dispatch]);

    return <>
        {filteredTickersArray.length !== tickers.length ? null :
            <IconButton sx = { addCircleIconStyle } label={'show tickers'} >
                show tickers
                <AddCircleIcon />
            </IconButton>}
        <List
            sx={tickersListStyle}>
            {tickers.map((tickerData) => {
                return (
                    filteredTickersArray.includes(tickerData.ticker) ? null :
                        stopUpdateTickersArray.includes(tickerData.ticker) ? <TickerListItem tickerData={tickerData.ticker} key={tickerData.ticker} /> :
                            <TickerListItem tickerData={tickerData} key={tickerData.ticker} />
                )
            })}

        </List>
    </>
}

export default TickersList;