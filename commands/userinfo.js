module.exports = {
    name: 'userinfo',
    description: 'Displays info about the user',
    execute(message, args) {
        const user = message.author;
        message.channel.send(`Username: ${user.tag}\nID: ${user.id}\nCreated At: ${user.createdAt}`);
    },
};
