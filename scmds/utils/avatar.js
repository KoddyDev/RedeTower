const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Ver o avatar de alguem',
    usage: '',
    options: [
        {
            name: "user_mention",
            description: "Selecione o usuario para ver a foto dele xD",
            type: "USER",
            required: false
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        let user;
        if(interaction.options.get("user_mention")) {
            user = client.users.cache.get(interaction.options.get("user_mention").value)
        } else {
            user = interaction.user
        }
  
  

  let embed = new Discord.MessageEmbed() 
    .setColor(`ORANGE`) 
    .setTitle(`<:3857_pepe_police:854927430850445313> AVATAR!`)
    .setDescription(`<:aviso:854929386394615848> Avatar de: ${user}`)
    .setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })) 
    .setFooter(`Autor: ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png"}));
 await interaction.editReply({
     embeds: [embed]
 }); 

}
}