const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'status',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Ver o status do servidor ( Minecraft )',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

  
  

        var serverip = "jogar.redetower.com.br";

        const embed = new Discord.MessageEmbed()
            .setTitle("<:mineplaneta:706312721569808405> STATUS!")
            .setColor(`ORANGE`)
            .setImage("http://status.mclive.eu/RedeTower/147.135.64.147/10145/banner.png")
            .setTimestamp()
            .setDescription("<:ping:788215814385303592> ➠ **IP:** "+serverip+"")

 await interaction.editReply({
     embeds: [embed]
 }); 

}
}