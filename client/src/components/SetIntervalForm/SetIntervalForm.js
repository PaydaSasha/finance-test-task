import React, { useRef, useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { setIntervalInputStyle, setIntervalButtonStyle } from '../../styles/styles';
import { setUpdateInterval } from '../TickersList/action';
import { useSelector } from 'react-redux';


export const SetIntervalForm = ({ socket }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const intervalValue = useRef();
    const { fetchInterval } = useSelector(state => state.tickerList)
    const onChangeHandler = () => {
        if (isNaN(intervalValue.current.value) || !(intervalValue.current.value < 20 && intervalValue.current.value > 1)) {
            intervalValue.current.value !== '' ? setErrorMessage('Set value from 1 to 30') : setErrorMessage('');
        } else {
            setErrorMessage('');
        }
    }

    const setIntervalButtonHandler = () => {
        setUpdateInterval(socket, intervalValue.current.value);
        console.log(intervalValue.current.value);
        intervalValue.current.value = '';
    };
    return (<div className='center-content input-interval-form'>
        <Input inputRef={intervalValue}
            placeholder={`set interval, current ${fetchInterval/1000}s`}
            variant="standard"
            sx={setIntervalInputStyle}
            onChange={onChangeHandler}
            error={errorMessage !== ''}
        />
        {errorMessage !== '' ? <span className='span-error'>{errorMessage}</span> : null}
        <Button variant="text" sx={setIntervalButtonStyle} onClick={setIntervalButtonHandler}>
            SET
        </Button>
    </div>)
}