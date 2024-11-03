module.exports = {
    name: 'help',
    description: 'List all commands or info about a specific command.',
    execute(message, args) {
      const { commands } = message.client;
      const data = [];
  
      if (!args.length) {
        data.push('Here\'s a list of all my commands:');
        data.push(commands.map(command => command.name).join(', '));
        data.push(`\nYou can send \`!help [command name]\` to get info on a specific command!`);
  
        return message.author.send(data.join('\n'))
          .then(() => {
            if (message.channel.type === 'dm') return;
            message.reply('I\'ve sent you a DM with all my commands!');
          })
          .catch(error => {
            console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
            message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
          });
      }
  
      const name = args[0].toLowerCase();
      const command = commands.get(name);
  
      if (!command) {
        return message.reply('That\'s not a valid command!');
      }
  
      data.push(`**Name:** ${command.name}`);
      if (command.description) data.push(`**Description:** ${command.description}`);
  
      message.channel.send(data.join('\n'));
    },
  };