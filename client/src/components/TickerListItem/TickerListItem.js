import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import useWindowDimensions from '../../service/useWindowDimensions';
import { listItemStyle, textStyles, changePercentStyles, changeStyles, tickerBadgeStyle } from '../../styles/styles'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DECLINE_COLOR, INCREASE_COLOR, MIN_WIDTH } from '../../constants/constants';


const TickerListItem = (props) => {

    const { width } = useWindowDimensions();
    const ticker = props.tickerData.ticker;
    const price = props.tickerData.price;
    const change = props.tickerData.change;
    const changePercent = props.tickerData.change_percent;




    return <div>
        <ListItem sx={listItemStyle(width)}>
            <div className={`badge-ticker-container ${width < MIN_WIDTH ? 'column-direction' : null}`}>
                <ListItemText primary={ticker} sx={tickerBadgeStyle(ticker)} />
                <ListItemText primary={ticker} sx={textStyles} />

            </div>
            <div className='right-text-group'>
                <ListItemText primary={price + (ticker === 'AMZN' ? '$' : null)}
                    sx={textStyles}
                />

                {width < MIN_WIDTH ?
                    null :
                    <ListItemText primary={change + (ticker === 'AMZN' ? '$' : null)}
                        sx={changeStyles(change)}
                    />}

                <div className={`change-percent-container ${changePercent > 0 ? 'increase' : 'decline'}`}>
                    {changePercent > 0 ?
                        <ArrowDropUpIcon sx={{ color: INCREASE_COLOR }} /> :
                        <ArrowDropDownIcon sx={{ color: DECLINE_COLOR }} />}
                    <ListItemText primary={`${changePercent}%`} sx={changePercentStyles(changePercent)} />
                </div>

                {width < MIN_WIDTH ? null : <Switch />}
            </div>

        </ListItem>
    </div>
}

export default TickerListItem;