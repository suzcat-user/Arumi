const { InteractionType, ModalBuilder, TextInputBuilder } = require("discord.js");

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
        let client = interaction.client;
        if(interaction.type !== InteractionType.MessageComponent) return

        if(interaction.customId === 'interact') {
            
        }
    }
}