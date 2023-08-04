
function infoEmbed(message) {
    console.log(message);
    return {
        color: 0x0066ff,
        title: 'Bot Info',
        description: message,
        timestamp: new Date().toISOString(),
    };
}

function joinEmbed(user) {
    var message = `${user.username}#${user.discriminator} - ID: ${user.id} has joined the server`;
    console.log(message);
    console.log(user);

    return {
        color: 0x00cc44,
        title: '',
        description: message,
        timestamp: new Date().toISOString(),
    };
}

function leaveEmbed(user) {
    var message = `${user.username}#${user.discriminator} - ID: ${user.id} has left the server`;
    console.log(message);
    console.log(user);
    return {
        color: 0x00cc44,
        title: '',
        description: message,
        timestamp: new Date().toISOString(),
    };
}

function roleEmbed(user, role, unassign=false) {
    var assign_msg = 'unassigned';
    if (unassign) {
        assign_msg = 'unassigned';
    };
    var message = `${user.nickname}#${user.discriminator} has been ${assign_msg} the role ${role.tag}`;
    console.log(message);

    return {
        color: 0x0066ff,
        title: '',
        description: message,
        timestamp: new Date().toISOString(),
    };
}

module.exports = { infoEmbed, joinEmbed, leaveEmbed, roleEmbed};