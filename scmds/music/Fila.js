const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'fila',
    aliases: ['abc'], 
    categories : 'Musica', 
    description: 'Ver a fila de musicas.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
       

        let page = 1
        const channel = interaction.member.voice.channel;

    if (!channel) return interaction.editReply('Você precisa entrar em um canal de voz primeiro!');
    const queue = interaction.client.queue.get(interaction.guild.id)
    let status;
    if(!queue) status = 'Não estou tocando nada.'
    else status = [ queue.songs.map(x => '• ' + x.title + ' - Pedido por ' + `<@${x.requester.id}>`).slice(0,10).join('\n') ]
    if(!queue) np = status
    else np = queue.songs[0].title
    if(queue) thumbnail = queue.songs[0].thumbnail
    else thumbnail = interaction.guild.iconURL()
    let embed = new MessageEmbed()
    .setTitle('Lista de musica')
    .setThumbnail(thumbnail)
    .setColor('GREEN')
    .addField('Tocando agora', np, true)
    .setDescription(status.toString())
    if(queue) { embed.setFooter(`Pagina ${page} de ${status.length}`, interaction.user.displayAvatarURL())}
    interaction.editReply({embeds: [embed]}).then(async msg => {
    await msg.react("⬅️");
    await msg.react("➡️");

    const voltarfilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === interaction.user.id;
    const passarfilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === interaction.user.id;

    const voltar = msg.createReactionCollector({ timeout: 900000, filter: voltarfilter})
    const passar = msg.createReactionCollector({ filter: passarfilter, timeout: 900000})

    voltar.on('collect', r => {
        if (page === 1) return;
        page--;
        embed.setDescription(status[page-1])
        embed.setFooter(`Página ${page} de ${status.length}`, interaction.user.displayAvatarURL)
        interaction.editReply({embeds: [embed]})
    })

passar.on('collect', r => {
    if (page === status.length) return;
    page++;
    embed.setDescription(status [page-1]);
    embed.setFooter(`Página ${page} de ${status.length}`, interaction.user.displayAvatarURL)
    interaction.editReply({embeds: [embed]})
})
   }).catch(err => interaction.editReply("Fila muito grande!"))

    }
}
