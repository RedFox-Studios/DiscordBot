const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  category: 'moderation',
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for kicking'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    const member = await interaction.guild.members.fetch(target.id).catch(console.error);

    if (!member) {
      return interaction.reply({ content: 'That user isn\'t in this guild!', ephemeral: true });
    }

    if (!member.kickable) {
      return interaction.reply({ content: 'I cannot kick this user! Do they have a higher role?', ephemeral: true });
    }

    await member.kick(reason);

    await interaction.reply(`Successfully kicked ${target.tag} for reason: ${reason}`);
  },
};