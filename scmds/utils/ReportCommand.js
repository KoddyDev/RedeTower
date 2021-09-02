const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const wait = require("wait");

const talkedRecently = new Set()

module.exports = {
    name: 'reportar',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Reportar um usuario',
    usage: '',
    options: [
        {
            name: "user_mention",
            description: "Selecione o usuario para reportar.",
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
            user = interaction.options.get("user_mention")
        }
  
        let canal = client.channels.cache.get('859872586883006474')

        let membro = interaction.options.get("user_mention").member

        interaction.editReply("Verifique seu privado, enviei as perguntas lá!")
    

       let embed1 = new Discord.MessageEmbed()
       .setAuthor(" | Denúncias", client.user.displayAvatarURL())
       .setDescription(`Qual é o motivo desta denuncia?`)
       .setColor("ORANGE")
       await interaction.user.createDM()
       
       await interaction.user.dmChannel.send({
           embeds: [embed1]
       })
       
    const filter = a => a.author.id == interaction.user.id;

       var collector =  interaction.user.dmChannel.createMessageCollector({filter, time: 10000 * 50,max: 1})
       collector.on('collect', async ab=> {
       var denuncia = ab.content

       let motivo = new Discord.MessageEmbed()
       .setAuthor(`DENÚNCIA!`, client.user.avatarURL())
       .setDescription(`\n\u200bQual a denúncia que você deseja apresentar sobre o usuário?`)
       .setColor(`ORANGE`)
   
       await interaction.user.dmChannel.send({
        embeds: [motivo],
        reply: {
            messageReference: ab.id
        }
    }).catch(console.error)

       interaction.channel.send(`<:alerta_h:854929287525957642> Mandei uma mensagem no seu privado, de uma olhada.`)
       var collector =  interaction.user.dmChannel.createMessageCollector({ filter, time: 10000 * 50,max: 1})
       collector.on('collect', async a => {
       var denuncia = a.content
   
       let link = new Discord.MessageEmbed()
       .setAuthor(`DENÚNCIA!`, client.user.avatarURL())
       .setDescription(`\n\u200bCom quais provas você deseja reforçar a sua denúncia?`)
       .setColor(`ORANGE`)
       await interaction.user.dmChannel.send({
        embeds: [link],
        reply: {
            interactionReference: a.id
        }
    }).catch(console.error)
       var collector2 =  interaction.user.dmChannel.createMessageCollector({ filter, time: 10000 * 50,max: 1})
       collector2.on('collect', async b => {
       var provas = b.content
   
       await interaction.user.dmChannel.send({
        reply: {
            interactionReference: b.id
        }, content: `<:aviso:854929386394615848> Para **__enviar__** a sua denúncia, digite \`confirmar\` e para **__cancelar__**, digite \`cancelar\`.`}).catch(console.error)
       var collector2 =  interaction.user.dmChannel.createMessageCollector({filter, time: 10000 * 50,max: 1})
       collector2.on('collect', async b => {
       var cancelamento = b.content
   
       if(cancelamento == `confirmar`){
   
           let embed = new Discord.MessageEmbed()
           .setColor(`ORANGE`)
           .setAuthor(`NOVA DENÚNCIA!`)
           .setDescription(`O membro <@${interaction.user.id}> abriu uma denúncia contra o membro ${membro}.\n\n <:grade:839619780654006274> ➠ **Denúncia:** ${denuncia}\n <:grade:839619780654006274> ➠ **Provas:** ${provas}\n\u200b`)
           .setFooter(`${interaction.user.tag}`, interaction.user.avatarURL)
           .setThumbnail(`https://api.mcsrvstat.us/icon/147.135.64.147:10145`)
           .setTimestamp()
   
           await interaction.user.dmChannel.send({
            content: "Sucesso!",
            reply: {
                interactionReference: b.id
            }
        }).catch(console.error)
           canal.send({
               embeds: [embed]
           }).then(async msg => {
               await msg.react('859799628597952512')
               await msg.react('859777462615539712')
           }).catch(console.error);
   
       }
   
       if(cancelamento == `cancelar`){
           return   await interaction.user.dmChannel.send({content: `<:aviso:854929386394615848> Você cancelou o envio da denúncia!`,
        reply: {
            interactionReference: b.id
        }})
       }
   
       })
       })
    })
       
   
   })
   
   
   
   
   talkedRecently.add(interaction.user.id);
   setTimeout(() => {
   
     talkedRecently.delete(interaction.user.id);
   }, 15 * 60 * 1000);

    talkedRecently.add(interaction.user.id);
    setTimeout(() => {
    
      talkedRecently.delete(interaction.user.id);
    }, 15 * 60 * 1000)

}
}