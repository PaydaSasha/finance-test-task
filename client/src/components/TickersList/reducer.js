/* eslint-disable import/no-anonymous-default-export */
import {
	GET_TICKERS_DATA,
	STOP_UPDATE_TICKER,
	START_UPDATE_TICKER,
	CLEAR_FILTER_LIST,
	DELETE_TICKER,
	GET_FETCH_INTERVAL,
} from './actionTypes'
export const initialState = {
	tickers: [],
	filteredTickersArray: [],
	stopUpdateTickersArray: [],
	fetchInterval: '',
}

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_TICKERS_DATA: {
			const { tickers } = action.payload
			return {
				...state,
				tickers,
			}
		}
		case STOP_UPDATE_TICKER: {
			const { ticker } = action.payload
			const stopUpdateTickersArray = state.stopUpdateTickersArray
			stopUpdateTickersArray.push(ticker)
			return {
				...state,
				stopUpdateTickersArray,
			}
		}
		case START_UPDATE_TICKER: {
			const { ticker } = action.payload
			let stopUpdateTickersArray = state.stopUpdateTickersArray
			stopUpdateTickersArray = stopUpdateTickersArray.filter(
				(el) => ticker !== el
			)
			return {
				...state,
				stopUpdateTickersArray,
			}
		}
		case DELETE_TICKER: {
			const { ticker } = action.payload
			const filteredTickersArray = state.filteredTickersArray
			filteredTickersArray.push(ticker)
			return {
				...state,
				filteredTickersArray,
			}
		}
		case CLEAR_FILTER_LIST: {
			let filteredTickersArray = state.filteredTickersArray
			filteredTickersArray = []
			return {
				...state,
				filteredTickersArray,
			}
		}
		case GET_FETCH_INTERVAL: {
			const { interval } = action.payload
			let fetchInterval = state.fetchInterval
			fetchInterval = interval
			return {
				...state,
				fetchInterval,
			}
		}
		default: {
			return state
		}
	}
}
