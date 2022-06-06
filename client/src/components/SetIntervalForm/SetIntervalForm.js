import React, { useState } from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import {
	setIntervalInputStyle,
	setIntervalButtonStyle,
} from '../../styles/styles'
import { setUpdateInterval } from '../TickersList/action'
import { useSelector } from 'react-redux'

export const SetIntervalForm = ({ socket }) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
		return errorHandler(event.target.value)
	}

	const fetchInterval = useSelector((state) => state.tickerList.fetchInterval)

	const errorHandler = (intervalValue) => {
		if (isNaN(intervalValue) || !(intervalValue <= 30 && intervalValue >= 1)) {
			intervalValue !== ''
				? setErrorMessage('Set value from 1 to 30')
				: setErrorMessage('')
		} else {
			setErrorMessage('')
		}
	}

	const setIntervalButtonHandler = () => {
		if (value <= 30 && value >= 1) {
			setUpdateInterval(socket, value)
			setValue('')
		}
	}
	return (
		<div className='center-content input-interval-form'>
			<Input
				value={value}
				placeholder={`set interval, current ${fetchInterval / 1000}s`}
				variant='standard'
				sx={setIntervalInputStyle}
				onChange={onChange}
				error={errorMessage !== ''}
			/>
			{errorMessage !== '' ? (
				<span className='span-error'>{errorMessage}</span>
			) : null}
			<Button
				variant='text'
				sx={setIntervalButtonStyle}
				onClick={setIntervalButtonHandler}
			>
				SET
			</Button>
		</div>
	)
}
