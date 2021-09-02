const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

const S = require("../../db/Models/Sugestao")
const U = require("../../db/Models/UsersTable")
const cd = new Set()
module.exports = {
    name: 'sugerir',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Sugerir uma sugestão',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

  
  
        if(cd.has(interaction.user.id)) return interaction.editReply("ERRO! Você deve aguardar **__5__** minutos para enviar outra sugestão.")
		let findU;
        
        if(await U.findOne({
            where: {
                user: interaction.user.id
            }
        })) {
            findU = await U.findOne({
            where: {
                user: interaction.user.id
            }
        })
        } else {
            findU = await U.create({
                user: interaction.user.id
            })
        }
        
     interaction.editReply("Te mandei uma mensagem no privado, verifique por gentileza! 😁")
        cd.add(interaction.user.id)
        setTimeout(() => {cd.delete(interaction.user.id)}, 300000)
    
     await interaction.user.createDM()

        let embed1 = new Discord.MessageEmbed()
        .setTitle("Sugestão - RedeTower")
        .setColor("ORANGE")
        .setDescription("Olá, seja bem-vindo á Central de Sugestões da RedeTower, para prosseguir, escolha uma das opções abaixo.")
        
        .setThumbnail(interaction.guild.iconURL())
            const select = new Discord.MessageSelectMenu()
        .setCustomId('Sugestion')
        .setPlaceholder('Clique para visualizar as opções!')
        .setMaxValues(1)
        .setMinValues(1)

        select.addOptions({
            label: "Discord",
            value: "Servidor 01",
            description: "Sugestão para o Discord.",
                        emoji: {
            animated: true,
            id: "859839752915517450" }

        })
        select.addOptions({
            label: "Site",
            value: "Site",
            description: "Sugestão para o Site da Rede.",
                        emoji: {
            animated: true,
            id: "877234185906036748" }

        })
        select.addOptions({
            label: "Lobby",
            value: "Lobby",
            description: "Sugestão para o Lobby.",
                        emoji: {
            animated: true,
            id: "810614885238177832" }
        })

        select.addOptions({
            label: "R. Heads",
            value: "R. Heads",
            description: "Sugestão para o RankUP Heads.",
                        emoji: {
            animated: true,
            id: "826090738471141468" }
        })

        select.addOptions({
            label: "Outro",
            value: "Outro",
            description: "Sugestão para algum outro motivo.",
                        emoji: {
            animated: false,
            name: "❓" }
        })

        interaction.user.send({embeds: [embed1], components: [new Discord.MessageActionRow().addComponents(select)]}).then(msg => {
            const filter2 = (b) => b.user.id === interaction.user.id
            let col = msg.createMessageComponentCollector({ filter: filter2, time: 200000, limit: 1})
                
    const filter = x => x.author.id == interaction.user.id;
            col.on('collect', (b) => {
               if(b.isSelectMenu()) {
                if(b.customId !== "Sugestion") return;
                if(b.user.bot) return;
                
                let embed2 = new Discord.MessageEmbed()
                .setTitle("Sugestão - RedeTower")
                .setColor("ORANGE")
                .setDescription(`Servidor escolhido: \`${b.values[0]}\` \n\n Agora, digite o seu nick para prosseguir.`)
                .setThumbnail(interaction.guild.iconURL())
    
                msg.delete()
                interaction.user.send({
                    embeds: [embed2]
                })

               let cc1 = interaction.user.dmChannel.createMessageCollector({ filter, time: 200000 * 20,max:1})
                cc1.on('collect', c2 => 
                
                {
                    if(c2.author.bot) return;
                    const nick = c2.content
                let embed3 = new Discord.MessageEmbed()
                    .setTitle("Sugestão - RedeTower")
                    .setColor("ORANGE")
                    .setDescription(`Servidor escolhido: \`${b.values[0]}\` \n Seu nick: \`${nick}\` \n\n Agora, digite a sua sugestão para o servidor desejado.`)
                    .setThumbnail(interaction.guild.iconURL())
        
                    interaction.user.send({
                        reply: { messageReference: c2.id },
                        embeds: [embed3]
                    })

                    interaction.user.dmChannel.createMessageCollector({ filter, time: 200000 * 20,max:1})
                .on('collect', c => {
                    if(c.author.bot) return;
                    const sugestão = c.content
    
                    let embed4 = new Discord.MessageEmbed()
                    .setTitle("Sugestão - RedeTower")
                    .setColor("ORANGE")
                    .setDescription(`Servidor escolhido: \`${b.values[0]}\` \n Seu nick: \`${nick}\` \n\n Sugestão: \`${sugestão}\` \n\n Agora, digite o motivo pelo qual devemos aprovar a sua sugestão.`)
                    .setThumbnail(interaction.guild.iconURL())
        
    
                    interaction.user.send({
                        reply: { messageReference: c.id },
                        embeds: [embed4]
                    })
                    

                    
                 const cc2 = interaction.user.dmChannel.createMessageCollector({ filter, time: 200000,max:1});
                 cc2
                .on('collect', async c => {
                    if(c.author.bot) return;
                    const motivo = c.content
    
                    let embed5 = new Discord.MessageEmbed()
                    .setTitle("Sugestão enviada!")
                    .setColor("ORANGE")
                    .setDescription(`Servidor escolhido: \`${b.values[0]}\` \n Seu nick: \`${nick}\` \n\n Sugestão: \`${sugestão}\` \n\n Motivo: \`${motivo}\` \n\n Sugestão enviada com sucesso, quando for respondida por um staffer eu lhe avisarei no privado, obrigado! 😁`)
                    .setThumbnail(interaction.guild.iconURL())
        
    
                    interaction.user.send({
                        embeds: [embed5],
                        reply: {
                            messageReference: c.id
                        }
                    })
                    
                    
    
                    let embed6 = new Discord.MessageEmbed()
                    .setTitle("Sugestão - RedeTower")
                    .setDescription(`Servidor escolhido: \`${b.values[0]}\` \n Nick: \`${nick}\` \n\n Sugestão: \`${sugestão}\` \n\n Motivo: \`${motivo}\` `)
                    .setColor("ORANGE")
                    .setThumbnail(client.user.avatarURL())
                    .setTimestamp()
                    .setFooter("Desenvolvido por RedeTower")
    
                    client.channels.cache.get("872188518892470332").send({
                        embeds: [embed6]
                    })
                    try {
                       await S.create({
                            user: interaction.user.id,
                            sugestão,
                            motivo,
                            nick
                        })
                    } catch (error) {
                        console.error(error.message)
                        client.channels.cache.get("872188518892470332").send(`Ocorreu um erro, a mensagem é ${error.message}${error.code ? ", o codigo do erro é "+ error.code : ""}`)
                    }
                })
                
                }) 
            })           
            
            } 
        })
        })
    
}
}