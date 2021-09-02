const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mchead',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Ver a cabeça de alguem do minecraft.',
    usage: '',
    options: [
        {
            name: "nick",
            description: "Nick do Jogador",
            type: 3,
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        let embed = new Discord.MessageEmbed()

        .setTitle(`<a:Mobs:859852098823520266>  MCHEAD!`)
        .setDescription(`<:info:827268467056050247> Cabeça do jogador: **${interaction.options.get("nick").value}** \n <:aviso:854929386394615848> Para conseguir uma head, só precisa ter Minecraft Original.`)
        .setImage(`https://mc-heads.net/head/${interaction.options.get("nick").value}`)
		.setFooter(interaction.user.tag, interaction.user.avatarURL())
		.setTimestamp(new Date())
		.setColor('ORANGE')

 await interaction.editReply({
     embeds: [embed]
 }); 

}
}