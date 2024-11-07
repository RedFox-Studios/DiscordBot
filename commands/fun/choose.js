const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  category: 'fun',
  data: new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Choose a number between two values')
    .addIntegerOption(option =>
      option.setName('min')
        .setDescription('The minimum number')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('max')
        .setDescription('The maximum number')
        .setRequired(true)),
  async execute(interaction) {
    const min = interaction.options.getInteger('min');
    const max = interaction.options.getInteger('max');

    if (min >= max) {
      return interaction.reply('The minimum number must be less than the maximum number.');
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    await interaction.reply(`I choose... ${result}!`);
  },
};