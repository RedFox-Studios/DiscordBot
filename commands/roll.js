module.exports = {
    name: 'roll',
    description: 'Roll a die. Usage: !roll <number of sides>',
    execute(message, args) {
      const sides = parseInt(args[0]) || 6;
      if (sides < 2) {
        return message.reply('The die must have at least 2 sides!');
      }
      const result = Math.floor(Math.random() * sides) + 1;
      message.reply(`You rolled a ${result} on a ${sides}-sided die!`);
    },
  };