const { EmbedBuilder, PermissionsBitField, ButtonStyle, APIMessage } = require("discord.js");
const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder} = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gcreate")
    .setDescription("Create a giveaway through simple yet interactive means"),
    run: async (client, interaction) => {
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('interact')
            .setLabel('Create with interactions')
            .setStyle(ButtonStyle.Primary)
            .setEmoji({ name: '👆' }),
            new ButtonBuilder()
            .setCustomId('tutorial')
           .setLabel('Setup with tutorial')
           .setEmoji({ name: '🗨️' })
           .setStyle(ButtonStyle.Secondary)
        )
            const startEmbed = new EmbedBuilder()
            .setTitle('Giveaway Creation Time!')
            .setDescription(`Alright ${interaction.user.username}! Let's begin creating our giveaway!\n\nArumi offers 2 ways of creating giveaways, there's the express way of creating through interactions (see example below) or through a fast and interactive manner where I guide you on how to create your giveaway!\n**Select a button below!**`)
            .setColor('#906ef5')
      
            await interaction.reply({embeds: [startEmbed], components: [buttons]})
    }
 };
