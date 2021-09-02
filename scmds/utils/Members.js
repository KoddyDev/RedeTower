const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'membros',
    aliases: [''], 
    categories : 'Utils', 
    description: 'Ver a quantida de membros em nosso discord!',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

  
  

        const embed = new Discord.MessageEmbed()
        .setTitle(`<:pepewine:854929105799479316> MEMBROS!`)
        .setDescription(`<:aviso:854929386394615848> Estamos com **__${interaction.guild.memberCount}__** membros em nosso Discord!`)
        .setFooter(interaction.user.tag, interaction.user.avatarURL)
        .setTimestamp(new Date())
        .setColor('ORANGE')
 await interaction.editReply({
     embeds: [embed]
 }); 

}
}