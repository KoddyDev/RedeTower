const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mcskin',
    aliases: [''], 
    categories : 'Utils', 
    description: 'Ver a skin de algum nick do minecraft.',
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

  
  

        let skin = new Discord.MessageEmbed()
		.setTitle(`<a:ovelha_arco_iris:859854575040069664> MCSKIN!`)
        .setDescription(`<:info:827268467056050247> Skin do jogador: **${interaction.options.get("nick").value}**`)
		.setImage(`https://mc-heads.net/player/${interaction.options.get("nick").value}`)
		.setFooter(interaction.user.tag, interaction.user.avatarURL())
		.setTimestamp(new Date())
		.setColor('ORANGE')
 await interaction.editReply({
     embeds: [skin]
 }); 

}
}