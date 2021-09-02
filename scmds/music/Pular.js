const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'pular',
    aliases: ['abc'], 
    categories : 'Musica', 
    description: 'Pula a musica atual.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.editReplyd('Você precisa entrar em um canal de voz primeiro!');
        let queue = client.queue.get(interaction.guild.id)
        if(!queue){ return interaction.editReply({
            embeds: [{
                description: 'Não estou tocando nada no momento.`',
                color: 'BLACK'
            }]
        })
    }
        if(queue.songs.length !== 0) {
            interaction.editReply("Prontinho!")
            queue.player.stop('Prontinho! Pulei de musica.')
        }
    }
}