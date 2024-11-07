const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  category: 'utility',
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays server info'),
  async execute(interaction) {
    const { guild } = interaction;
    const embed = new EmbedBuilder()
      .setTitle(`Server Info - ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: 'Server Name', value: guild.name },
        { name: 'Total Members', value: guild.memberCount.toString() },
        { name: 'Server Owner', value: (await guild.fetchOwner()).user.tag }
      );
    await interaction.reply({ embeds: [embed] });
  },
};