module.exports = {
    name: 'serverinfo',
    description: 'Displays server info',
    execute(message, args) {
        const { name, memberCount, owner } = message.guild;
        message.channel.send(`Server Name: ${name}\nTotal Members: ${memberCount}\nServer Owner: ${owner.user.tag}`);
    },
};