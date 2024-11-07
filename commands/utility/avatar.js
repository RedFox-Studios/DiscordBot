const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  category: 'utility',
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Display user avatar')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user whose avatar to show')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    await interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
  },
};