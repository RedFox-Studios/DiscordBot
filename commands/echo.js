module.exports = {
    name: 'echo',
    description: 'Echoes a message.',
    execute(message, args) {
      if (!args.length) {
        return message.reply('You need to provide a message to echo!');
      }
      message.channel.send(args.join(' '));
    },
  };