import { combineReducers } from 'redux'
import tickerList from '../components/TickersList/reducer'

const rootReducer = combineReducers({
	tickerList,
})

export default rootReducer
