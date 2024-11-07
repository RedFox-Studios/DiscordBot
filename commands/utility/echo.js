const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  category: 'utility',
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Echoes a message')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message to echo')
        .setRequired(true)),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    await interaction.reply(message);
  },
};