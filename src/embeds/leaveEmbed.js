module.exports = (user) => {
    var message = `${user.username}#${user.discriminator} - ID: ${user.id} has left the server`;
    console.log(message);
    console.log(user);
    return {
        color: 0x00cc44,
        title: '',
        description: message,
        timestamp: new Date().toISOString(),
    };
};