import { DECLINE_COLOR, INCREASE_COLOR, MIN_WIDTH } from '../constants/constants';

export const listItemStyle = (width) => {
    return {
        borderTop: '1px solid #e8eaed',
        minHeight: '55px',
        width: 'min(700px, 90%, 80vw)',
        minWidth: '210px',
        margin: '0 auto',
        display: 'flex',
        alignItems: width < MIN_WIDTH ? 'center' : 'baseline',
        gap: '20%',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#f8f9fa',
        }
    }
};

export const textStyles = {

    '& .MuiTypography-root': {
        letterSpacing: '.00625em',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: '1.5rem',
        color: '#202124',
        textAlign: 'center',
    },
};

export const changePercentStyles = (changePercent) => {
    return {
        '& .MuiTypography-root': {
            ...textStyles['& .MuiTypography-root'],
            color: changePercent > 0 ? INCREASE_COLOR : DECLINE_COLOR,
            transform: 'translateX(-30%)',
        }
    }
};
export const changeStyles = (changePercent) => {
    return {
        '& .MuiTypography-root': {
            ...textStyles['& .MuiTypography-root'],
            color: changePercent > 0 ? INCREASE_COLOR : DECLINE_COLOR,
        }
    }
};

export const tickerBadgeStyle = (ticker) => {
    return {
        ...setBadgeBackground(ticker),
        width: 'auto',
        display: 'block',
        borderRadius: '20px',
        '& .MuiTypography-root': {
            ...textStyles['& .MuiTypography-root'],
            color: 'white',
            fontWeight: 700,
            padding: '3px',
            fontSize: '0.7rem',
        }
    }
};

export const setBadgeBackground = (ticker) => {
    let style = { backgroundColor: 'transparent' };
    switch (ticker) {
        case 'AAPL':
            style = { backgroundColor: '#729ea1' }
            break;
        case 'GOOGL':
            style = { backgroundColor: '#b5bd89' }
            break;
        case 'MSFT':
            style = { backgroundColor: '#dfbe99' }
            break;
        case 'AMZN':
            style = { backgroundColor: '#ec9192' }
            break;
        case 'FB':
            style = { backgroundColor: '#db5375' }
            break;
        case 'TSLA':
            style = { backgroundColor: '#c48e9c' }
            break;
        default:
            break;
    }
    return style;
}