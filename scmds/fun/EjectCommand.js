const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { random } = require("../../db/DatabaseLogin");

module.exports = {
    name: 'ejetar',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Ejetar alguem da partida',
    usage: '',
    options: [
        {
            name: "user_mention",
            description: "Ejetar alguem da partida",
            type: "USER",
            required: true
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
        }

        var list = [
            'https://imgur.com/78xi9wu.gif',
            'https://imgur.com/L9FBIYR.gif'
            
          ];
          
          var rand = list[Math.floor(Math.random() * list.length)];

          let avatar = interaction.user.displayAvatarURL({format: 'png'});
            const embed = new Discord.MessageEmbed()
                  .setTitle('<a:among_rgb:859828946496520272> EJETOU!')
                  .setColor('ORANGE')
                  .setDescription(`<:aviso:854929386394615848> ${interaction.user} acabou de ejetar ${user} da partida.`)
                  .setImage(rand)
                  .setTimestamp()
                  .setThumbnail(avatar)
                  .setFooter('')
                  .setAuthor(interaction.user.tag, avatar);
                  
                  interaction.editReply({
                      embeds: [embed]
                  })


    }
}