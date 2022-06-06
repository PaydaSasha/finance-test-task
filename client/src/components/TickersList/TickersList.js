import React, { useEffect } from 'react'
import List from '@mui/material/List'
import { TickerListItem } from '../TickerListItem/TickerListItem'
import { ENDPOINT } from '../../constants/constants'
import { useSelector, useDispatch } from 'react-redux'
import {
	getTickersDataThunkCreator,
	clearFilterList,
	deleteTicker,
	stopUpdateTicker,
	startUpdateTicker,
} from './action'
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
	const notEmptyTickersArray = filteredTickersArray.length !== tickers.length

	const dispatch = useDispatch()

	const addButtonHandler = () => {
		dispatch(clearFilterList())
	}
	const removeListItem = (ticker) => {
		dispatch(deleteTicker(ticker))
	}
	const handleSwitch = (checked, ticker) => {
		if (!checked) {
			dispatch(stopUpdateTicker(ticker))
		} else {
			dispatch(startUpdateTicker(ticker))
		}
	}

	useEffect(() => {
		socket.emit('start')
		dispatch(getTickersDataThunkCreator(socket))
	}, [dispatch])

	return (
		<>
			{notEmptyTickersArray ? (
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
							removeListItem={removeListItem}
							handleSwitch={handleSwitch}
						/>
					) : (
						<TickerListItem
							tickerData={tickerData}
							key={tickerData.ticker}
							removeListItem={removeListItem}
							handleSwitch={handleSwitch}
						/>
					)
				})}
			</List>
		</>
	)
}

export default TickersList
