const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'loop',
    aliases: ['abc'], 
    categories : 'Musica', 
    description: 'Repetir todas as musicas da lista de musicas.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const serverQueue = client.queue.get(interaction.guild.id);
        if(!serverQueue) return interaction.editReply('NÃ£o estou tocando nada no momento');
     serverQueue.loop = !serverQueue.loop;
        client.queue.set(interaction.guild.id, serverQueue);
    if(serverQueue.loop) return interaction.editReply('**ð Repetindo a fila de musicas!**');
        return interaction.editReply('**ð Parando de repetir as musicas!**');


    }
}