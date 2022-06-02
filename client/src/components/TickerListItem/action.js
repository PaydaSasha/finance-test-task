export const dsblTicker = (socket, ticker) => {
    socket.emit('dsblTicker', ticker);
    console.log('dsblTicker');
};

export const enblTicker = (socket, ticker) => {
    socket.emit('enblTicker', ticker);
    console.log('enblTicker');
};