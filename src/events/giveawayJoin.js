const {
    InteractionType,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    EmbedBuilder,
    StringSelectMenuBuilder,
    ComponentType,
    ChannelType, ButtonStyle
  } = require("discord.js");
  const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder} = require("@discordjs/builders");
  const timestamp = require('unix-timestamp');

  const giveaway = require('../model/giveaway')
  module.exports = {
    name: "interactionCreate",
    execute: async (interaction) => {
        const data = await giveaway.findOne({messageId: interaction.message.id})
        if(interaction.customId === data.buttonId) {
            data.winners.push([{user: interaction.user.id, tag: interaction.user.tag}])
            data.save()
            const newData = await giveaway.findOne({messageId: interaction.message.id})
            const channel = interaction.guild.channels.cache.get(newData.channel)
            const msg = await channel.messages.fetch(newData.messageId)
            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId(newData.buttonId)
                .setLabel(newData.winners.length.toString())
                .setStyle(ButtonStyle.Primary)
                .setEmoji({ name: '🎉' })
            )
            const embed = new EmbedBuilder()
    .setTitle(`Giveaway for ${data.prize}`)
    .setColor(msg.embeds[0].color)
    .setDescription(`React to the message below with 🎉 to\nenter for **${data.prize}**\n\nDuration left: <t:${parseInt(newData.endingTime)}:R> (<t:${parseInt(newData.endingTime)}>)\nCreated by: <@${newData.host}>`)
    .setFooter({text: `${newData.winnerCount} winners`})

   
   await msg.edit({embeds: [embed], components: [buttons],content: '🎉🎉 **GIVEAWAY** 🎉🎉' })

   const joinEmbed = new EmbedBuilder()
   .setColor('#42fc4b')
   .setAuthor({name: 'Successfully Joined', iconURL: interaction.client.user.displayAvatarURL()})
   .setDescription(`Your entry in [${data.prize}](https://discord.com/channels/${interaction.message.guildId}/${interaction.message.channelId}/${interaction.message.id}) is confirmed!`)
   .setTimestamp()
   await interaction.reply({embeds: [joinEmbed], ephemeral: true})
        }
    }
}