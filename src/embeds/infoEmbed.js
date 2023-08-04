module.exports = (message) => {
    console.log(message);
    return {
        color: 0x0066ff,
        title: 'Bot Info',
        description: message,
        timestamp: new Date().toISOString(),
    };
};