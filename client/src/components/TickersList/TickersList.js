import React, { useEffect } from 'react'
import List from '@mui/material/List'
import TickerListItem from '../TickerListItem/TickerListItem'
import { ENDPOINT } from '../../constants/constants'
import { useSelector, useDispatch } from 'react-redux'
import { getTickersDataThunkCreator, clearFilterList } from './action'
import socketIOClient from 'socket.io-client'
import { tickersListStyle } from '../../styles/styles'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import { addCircleIconStyle } from '../../styles/styles'
import { SetIntervalForm } from '../SetIntervalForm/SetIntervalForm'

const socket = socketIOClient(ENDPOINT)

const TickersList = () => {
	const { tickers, filteredTickersArray, stopUpdateTickersArray } = useSelector(
		(state) => state.tickerList
	)
	const emptyTickersArray = filteredTickersArray.length !== tickers.length

	const dispatch = useDispatch()

	const addButtonHandler = () => {
		dispatch(clearFilterList())
	}

	useEffect(() => {
		socket.emit('start')
		dispatch(getTickersDataThunkCreator(socket))
	}, [dispatch])

	return (
		<>
			{emptyTickersArray ? (
				<SetIntervalForm socket={socket} />
			) : (
				<div className='center-content'>
					<Button
						startIcon={<AddCircleIcon />}
						onClick={addButtonHandler}
						sx={addCircleIconStyle}
						disableRipple={true}
						variant='outlined'
					>
						show tickers
					</Button>
				</div>
			)}

			<List sx={tickersListStyle}>
				{tickers.map((tickerData) => {
					return filteredTickersArray.includes(
						tickerData.ticker
					) ? null : stopUpdateTickersArray.includes(tickerData.ticker) ? (
						<TickerListItem
							tickerData={tickerData.ticker}
							key={tickerData.ticker}
						/>
					) : (
						<TickerListItem tickerData={tickerData} key={tickerData.ticker} />
					)
				})}
			</List>
		</>
	)
}

export default TickersList
