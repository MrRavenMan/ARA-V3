module.exports = (user, role, unassign=false) => {
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
};