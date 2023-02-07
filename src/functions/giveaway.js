const {EmbedBuilder,ButtonStyle} = require('discord.js')
const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder} = require("@discordjs/builders");
const schema = require('../model/giveaway')
const timestamp = require('unix-timestamp');

function giveaway (gw) {
    const randomNumber = Math.floor((Math.random() * 10000) + 1).toString()

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId(randomNumber)
        .setLabel('0')
        .setStyle(ButtonStyle.Primary)
        .setEmoji({ name: '🎉' })
    )
    const time = `+${gw.time}`
    const embed = new EmbedBuilder()
    .setTitle(`Giveaway for ${gw.prize}`)
    .setColor('#67f0f0')
    .setDescription(`React to the message below with 🎉 to\nenter for **${gw.prize}**\n\nDuration left: <t:${parseInt(timestamp.add(timestamp.now(), time))}:R> (<t:${parseInt(timestamp.add(timestamp.now(), time))}>)\nCreated by: <@${gw.host}>`)
    .setFooter({text: `${gw.winner} winners`})
    const channel = gw.client.channels.cache.get(gw.searchChannel.id)
    channel.send({embeds: [embed], content: '🎉🎉 **GIVEAWAY** 🎉🎉', components: [buttons]}).then((m) => {
        new schema({
            guild: m.guild.id,
            messageId: m.id,
            channel: m.channelId,
            prize: gw.prize,
            buttonId: randomNumber,
            winnerCount: parseInt(gw.winner),
            endingTime: timestamp.add(timestamp.now(), time),
            host: gw.host
        }).save()
    })
}

module.exports = {
    giveaway
}