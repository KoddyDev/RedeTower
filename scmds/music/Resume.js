const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'resumir',
    aliases: ['abc'], 
    categories : 'Musica', 
    description: 'Resumir a lisita de musica.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.editReply('Você não está em um canal de voz!');
        let queue = client.queue.get(interaction.guild.id)
        if(!queue) return interaction.editReply({
            embeds: [{
                description: 'Não existe musicas para resumir!'
            }]
        })
            queue.player.unpause()
        interaction.editReply('Musicas resumidas com sucesso!')
        


    }
}