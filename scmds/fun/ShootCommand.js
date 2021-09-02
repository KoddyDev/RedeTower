const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'atirar',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Atirar com armas em alguem',
    usage: '',
    options: [
        {
            name: "user_mention",
            description: "Selecione o usuario para atirar nele",
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

        let armas = [
            "AK-47",
            "Pistola",
            "M4",
            "Deagle",
            "Taser",
            "Chiquinha",
            "Arco",
            "Espingarda",
            "Metralhadora",
            "AK-22",
            "AK-74",
            "AK74U",
            "AAC Honey Badger PDW"
        ]
        let len = 0;

        var list = [
            'https://imgur.com/sqCBcCb.gif',
            'https://imgur.com/ikk5fEH.gif',
            'https://imgur.com/9YjAjwb.gif',
            'https://imgur.com/63QmHJH.gif',
            'https://imgur.com/183Qo1y.gif'
          ];
          
          var rand = list[Math.floor(Math.random() * list.length)]; 

        let avatar = interaction.user.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('<a:shoot_pepe_do_camelo:859836065136509038> ATIROU!')
        .setColor('ORANGE')
        .setDescription(`${interaction.user} acabou de atirar no ${user}, utiliando uma ${armas[Math.floor(Math.random() * armas.length)]}, que acabou morto.`)
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