import { render, screen } from '../../../test-utils'
import { TickerListItem } from './TickerListItem'
import React from 'react'
import userEvent from '@testing-library/user-event'
const tickerData = {
	ticker: 'AAPL',
	exchange: 'NASDAQ',
	price: 279.29,
	change: 64.52,
	change_percent: 0.84,
	dividend: 0.56,
	yield: 1.34,
	last_trade_time: '2021-04-30T11:53:21.000Z',
}
const removeTicker = jest.fn()
const handleSwitch = jest.fn()

const setup = () => {
	const utils = render(
		<TickerListItem
			tickerData={tickerData}
			removeListItem={removeTicker}
			handleSwitch={handleSwitch}
		/>
	)
	const button = utils.getByRole('button')
	const toggle = utils.getByRole('checkbox')
	return {
		button,
		toggle,
		...utils,
	}
}

describe('Interval Form', () => {
	it('renders TickerListItem', () => {
		render(<TickerListItem tickerData={tickerData} />)
		expect(screen.getByRole('listitem')).toBeInTheDocument()
	})
	it('It should fire up removeTicker when button clicked', () => {
		const { button } = setup()
		userEvent.click(button)
		expect(removeTicker).toHaveBeenCalledWith(tickerData.ticker)
	})
	it('it should render passed data from props', () => {
		render(<TickerListItem tickerData={tickerData} />)
		const items = screen.getAllByText('AAPL')
		expect(items).toHaveLength(2)
		expect(screen.getByText('279.29')).toBeInTheDocument()
		expect(screen.getByText('64.52')).toBeInTheDocument()
		expect(screen.getByText(/0.84/)).toBeInTheDocument()
	})
	it('It should fire up handleSwitch when toggle clicked', () => {
		const { toggle } = setup()
		userEvent.click(toggle)
		expect(handleSwitch).toHaveBeenCalledWith(false, tickerData.ticker)
	})
})
