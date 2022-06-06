import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'
import useWindowDimensions from '../../service/useWindowDimensions'
import {
	listItemStyle,
	textStyles,
	changePercentStyles,
	changeStyles,
	tickerBadgeStyle,
} from '../../styles/styles'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
	DECLINE_COLOR,
	INCREASE_COLOR,
	MIN_WIDTH,
} from '../../constants/constants'
import { useState } from 'react'
import { textTransition } from '../../service/textTransition'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'

export const TickerListItem = ({
	tickerData,
	removeListItem,
	handleSwitch,
}) => {
	const { width } = useWindowDimensions()
	const ticker = tickerData.ticker || tickerData
	const price = tickerData.price || '-'
	const change = tickerData.change || '-'
	const changePercent = tickerData.change_percent || '-'

	const onDelete = () => {
		removeListItem(ticker)
	}
	const [checked, setChecked] = useState(true)

	const onSwitch = (event) => {
		setChecked(event.target.checked)
		handleSwitch(!checked, ticker)
	}

	return (
		<div>
			<ListItem sx={listItemStyle(width)}>
				<div className='badge-ticker-wrapper'>
					<div
						className={`badge-ticker-container ${
							width < MIN_WIDTH ? 'column-direction' : ''
						}`}
					>
						<ListItemText primary={ticker} sx={tickerBadgeStyle(ticker)} />
						<ListItemText primary={ticker} sx={textStyles} />
					</div>
				</div>

				<div className='right-text-wrapper'>
					<div className='right-text-group'>
						<ListItemText
							primary={textTransition(
								price + (ticker === 'AMZN' && price !== '-' ? '$' : '')
							)}
							sx={textStyles}
						/>

						{width < MIN_WIDTH ? null : (
							<ListItemText
								primary={textTransition(
									change + (ticker === 'AMZN' && change !== '-' ? '$' : '')
								)}
								sx={changeStyles(change)}
							/>
						)}

						<div
							className={`change-percent-container ${
								changePercent > 0 ? 'increase' : 'decline'
							}`}
						>
							{changePercent > 0 ? (
								<ArrowDropUpIcon sx={{ color: INCREASE_COLOR }} />
							) : (
								<ArrowDropDownIcon sx={{ color: DECLINE_COLOR }} />
							)}
							<ListItemText
								primary={textTransition(
									changePercent !== '-' ? changePercent + '%' : '-'
								)}
								sx={changePercentStyles(changePercent)}
							/>
						</div>

						{width < MIN_WIDTH ? null : (
							<div className='button-container'>
								<Switch
									className='switch'
									checked={checked}
									color='default'
									onChange={onSwitch}
								/>
								<IconButton onClick={onDelete}>
									<DeleteOutlineIcon />
								</IconButton>
							</div>
						)}
					</div>
				</div>
			</ListItem>
		</div>
	)
}
