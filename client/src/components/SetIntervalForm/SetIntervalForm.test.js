import { render, screen, fireEvent } from '../../../test-utils'
import { SetIntervalForm } from './SetIntervalForm'
import * as actions from '../TickersList/action'
import React from 'react'

const onChange = jest.fn()
const setUpdateIntervalMock = jest
	.spyOn(actions, 'setUpdateInterval')
	.mockImplementation(() => {})

const setup = () => {
	const utils = render(<SetIntervalForm />)
	const input = utils.getByRole('textbox')
	const button = utils.getByRole('button')
	return {
		input,
		button,
		...utils,
	}
}

describe('Interval Form', () => {
	it('renders SetIntervalForm', () => {
		render(<SetIntervalForm onChange={onChange} />)
		expect(screen.getByRole('textbox')).toBeInTheDocument()
	})
	it('renders SetIntervalForm placeholder', () => {
		render(<SetIntervalForm onChange={onChange} />)
		expect(screen.getByRole('textbox').getAttribute('placeholder')).toContain(
			'set interval, current'
		)
	})
	it('It should set value', () => {
		const { input } = setup()
		fireEvent.change(input, { target: { value: '23' } })
		expect(input.value).toBe('23')
	})
	it('It should show error when letters are inputted', () => {
		const { input } = setup()
		fireEvent.change(input, { target: { value: 'Good Day' } })
		expect(screen.getByText('Set value from 1 to 30')).toBeInTheDocument()
	})
	it('It should show error when value > 30', () => {
		const { input } = setup()
		fireEvent.change(input, { target: { value: 31 } })
		expect(screen.getByText('Set value from 1 to 30')).toBeInTheDocument()
	})
	it('It should show error when value < 1', () => {
		const { input } = setup()
		fireEvent.change(input, { target: { value: 0 } })
		expect(screen.getByText('Set value from 1 to 30')).toBeInTheDocument()
	})
	it('It should fire up setUpdateInterval when button clicked', () => {
		const { button, input } = setup()
		fireEvent.change(input, { target: { value: 15 } })
		fireEvent.click(button)
		expect(setUpdateIntervalMock).toHaveBeenCalled()
	})
})
