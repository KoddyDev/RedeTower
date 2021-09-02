const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'pausar',
    aliases: ['abc'], 
    categories : 'Musica', 
    description: 'Pausar a musica atual da lisita de musica.',
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
                description: 'Não existe musicas para pausar!'
            }]
        })
        if(queue.playing !== false)
        queue.player.pause()
        interaction.editReply('Musicas pausadas com sucesso!')
        queue.playing === false
        client.queue.set(interaction.guildId, queue)

    }
}