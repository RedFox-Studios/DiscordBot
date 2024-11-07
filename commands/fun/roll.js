const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  category: 'fun',
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll a die')
    .addIntegerOption(option =>
      option.setName('sides')
        .setDescription('The number of sides on the die')
        .setRequired(false)),
  async execute(interaction) {
    const sides = interaction.options.getInteger('sides') || 6;
    if (sides < 2) {
      return interaction.reply('The die must have at least 2 sides!');
    }
    const result = Math.floor(Math.random() * sides) + 1;
    await interaction.reply(`You rolled a ${result} on a ${sides}-sided die!`);
  },
};