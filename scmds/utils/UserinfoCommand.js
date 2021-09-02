const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Ver as informações de um membro.',
    usage: '',
    options: [
        {
            name: "user",
            description: "Selecione o usuario.",
            type: "USER",
            required: true,
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const baliza_err = new MessageEmbed()
        .setTitle("❌ | Erro no comando")
        .setDescription(`❱❱ Por questões de segurança apenas Administradores de **${interaction.guild.name}** podem usar este comando!`)
        .setThumbnail("https://i.imgur.com/sXZJRvc.gif")
        .setColor("DARK BLUE")
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply({embeds:[baliza_err]})
        let baliza_user = interaction.options.get("user").member

        let status;
        switch (baliza_user.presence?.status) {
            case "online":
                status = "Online";
                break;
            case "dnd":
                status = "Ocupado";
                break;
            case "idle":
                status = "Soneca";
                break;
            case "offline":
                status = "Offline";
                break;
            default: "Offline";
        }

        const baliza_info_user = new MessageEmbed()
            .setTitle(`<:sino:788202885880086539> USER INFO!`)
            .setColor("ORANGE")
            .setThumbnail(baliza_user.user.displayAvatarURL({dynamic : true}))
            .setColor("ORANGE")
            .setDescription(`<:livro:788215985466245160> ➠ **Nick:** ${baliza_user.user.username} \n <:discord:859841711625469972> ➠ **ID:** ${baliza_user.id} \n <:teia:839619370812833844> ➠ **Conta criada dia:** ${baliza_user.user.createdAt.toLocaleDateString("pt-BR")} \n <:h_heart:854929181133766676> ➠ **Entrou no server dia:** ${baliza_user.joinedAt.toLocaleDateString("pt-BR")} \n <:online:810635621789728828> ➠ **Status:** ${status ? status : "Offline"}`)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp(new Date())
    interaction.editReply({ embeds: [baliza_info_user]})

}
}