module.exports = {
    name: 'avatar',
    description: 'Display user avatar',
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
    },
};