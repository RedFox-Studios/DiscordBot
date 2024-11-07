const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  category: 'utility',
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Displays info about the user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to get info about')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const embed = new EmbedBuilder()
      .setTitle(`User Info - ${user.tag}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Username', value: user.username },
        { name: 'ID', value: user.id },
        { name: 'Created At', value: user.createdAt.toDateString() }
      );
    await interaction.reply({ embeds: [embed] });
  },
};