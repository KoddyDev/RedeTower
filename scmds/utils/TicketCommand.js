const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Ticket = require("../../db/Models/TicketSystem")
const configTicket = require("../../configTicket.json")

module.exports = {
    name: 'ticket',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Abrir o menu de ticket',
    usage: '',
    options: [
        {
            name: "fazer",
            description: "Selecionar oque deseja fazer.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: 'Fechar Ticket',
                    value: 'fechar',
                },
                {
                    name: 'Adicionar um usuario',
                    value: 'adicionar',
                },
                {
                    name: 'Remover um usuario',
                    value: 'remover',
                },
                {
                    name: 'Embed de Ticket',
                    value: 'embed',
                },
                
            ]
        },
        {
            name: "user",
            description: "Selecione o usuario caso seja nescessario",
            type: "USER",
            required: false
        }
    ],
    permisions: [
        {
            id: '824756140238700626',
            type: 'ROLE',
            permission: true,
        },
        {
            id: '824756100065787914',
            type: 'ROLE',
            permission: true,
        },

    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

  
  
        let opcao = interaction.options.get("fazer").value

        let user = interaction.options.get("user")

        if(opcao === "fechar") {
            const findT = await Ticket.findOne({
                where: {
                    channelId: interaction.channel.id,
                    guildId: interaction.guild.id
                }
            })
            let embedTicketClose = new Discord.MessageEmbed()
            .setTitle("<:ouro:839615823076130846> | Central de Suporte")
            .setDescription("\n<:robo:718197193130901544> **|** Para confirmar a finalização do ticket, clique em <a:errado:706332824466227260> abaixo.\n")
            .setTimestamp()
            .setFooter("RedeTower • Todos direitos reservados.")
            if(findT) {
                let btn = new Discord.MessageButton()
        .setStyle("DANGER")
        .setEmoji("706332824466227260")
        .setCustomId("fechar")
        interaction.editReply(embedTicketClose).addComponents(btn)
            }else{
            let errofecharEmbeddd = new Discord.MessageEmbed()
                .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                .setDescription(`Esse canal não é um ticket.\nAbra um ticket em <#787816371236634624>`)
                .setColor(`RED`)
                .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                .setTimestamp()
                .setThumbnail(client.user.avatarURL())           
                interaction.editReply({ embeds: 
                    [errofecharEmbeddd] })
           }
        }
        if(opcao === "adicionar") {
            if (interaction.member.roles.cache.has('824756140238700626' && '824756100065787914')){

                let userInvalido = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você deve inserir um usuário válido!`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
            
                if(!user) return interaction.editReply({embeds: [userInvalido]})
                const findT = await Ticket.findOne({
                    where: {
                        channelId: interaction.channel.id,
                        guildId: interaction.guild.id
                    }
                })
                let userInvalido2 = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você não pode adicionar o usuário que criou o ticket.`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                if(findT) {
                    if(user.user.id === findT.authorId) return interaction.editReply({embeds: [userInvalido2]})
                     let userInvalido3 = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você não pode adicionar um usuário que já está adicionado no ticket.`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                    if(interaction.channel.permissionOverwrites.cache.has(user.user.id)) return interaction.editReply({embeds:[userInvalido3]})
                    interaction.channel.permissionOverwrites.create(user.user.id, {
              'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'ATTACH_FILES': true, 'READ_MESSAGE_HISTORY': true
            })
                    let sucesso = new Discord.MessageEmbed()
                        .setTitle(`<:correto:707762526917754940> | SUCESSO!`)
                        .setDescription(`O usuário <@!${user.user.id}> foi adicionado com sucesso ao ticket!`)
                        .setColor(`GREEN`)
                        .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                        .setTimestamp()
                        .setThumbnail(client.user.avatarURL())
                        interaction.editReply({embeds: [sucesso]})

                    }else {
                        let erroaddEmbed = new Discord.MessageEmbed()
                        .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                        .setDescription(`Esse canal não é um ticket.\nAbra um ticket em <#787816371236634624>`)
                        .setColor(`RED`)
                        .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                        .setTimestamp()
                        .setThumbnail(client.user.avatarURL())

                        interaction.editReply({embeds: [erroaddEmbed]})
                    }
            
                }else{
                let semPerm = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você não tem permissão para isso.`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                return interaction.editReply({embeds: [semPerm]})
                }
        }

        if(opcao === "remover") {
            if (interaction.member.roles.cache.has('824756140238700626' && '824756100065787914')){

                let userInvalido = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você deve inserir um id de usuário válido!`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                if(!user) return interaction.reply(userInvalido)
                const findT = await Ticket.findOne({
                    where: {
                        channelId: interaction.channel.id,
                        guildId: interaction.guild.id
                    }
                })
                let userInvalido2 = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você não pode remover o usuário que criou o ticket.`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                if(findT) {
                    if(user.user.id === findT.authorId) return interaction.editReply({embeds: [userInvalido2]})
                     let userInvalido3 = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você não pode remover um usuário que não está adicionado no ticket.`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                    if(!interaction.channel.permissionOverwrites.cache.has(user.user.id)) return interaction.editReply({embeds:[userInvalido3]})
                    interaction.channel.permissionOverwrites.create(user.user.id, {
              'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'ATTACH_FILES': false, 'READ_MESSAGE_HISTORY': false
            })
                    let sucesso = new Discord.MessageEmbed()
                        .setTitle(`<:correto:707762526917754940> | SUCESSO!`)
                        .setDescription(`O usuário <@!${user.user.id}> foi removido com removido do ticket!`)
                        .setColor(`GREEN`)
                        .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                        .setTimestamp()
                        .setThumbnail(client.user.avatarURL())
                        interaction.editReply({
                            embeds:[sucesso]})

                    }else {
                        let erroaddEmbed = new Discord.MessageEmbed()
                        .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                        .setDescription(`Esse canal não é um ticket.\nAbra um ticket em <#787816371236634624>`)
                        .setColor(`RED`)
                        .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                        .setTimestamp()
                        .setThumbnail(client.user.avatarURL())

                        interaction.editReply({
                            embeds:[erroaddEmbed]
                        })
                    }
            
                }else{
                let semPerm = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você não tem permissão para isso.`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                return interaction.editReply({embeds:[semPerm]})
                }
        }

        if(opcao === "embed") {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                let semPerm = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> | ERRO!`)
                    .setDescription(`Você não tem permissão para isso.`)
                    .setColor(`RED`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                return interaction.editReply({embeds: [semPerm]})
            } else {
        
            const select = new Discord.MessageSelectMenu()
            .setCustomId('tickettt')
            .setPlaceholder('Clique para visualizar as opções')
            .setMaxValues(1)
            .setMinValues(1)
        let tipos = ""
            for(let i = 0; i < configTicket.ticket.tipos.length; i++) {
               select.addOptions({
                   value: configTicket.ticket.tipos[i].id,
                   emoji: {
                       id: configTicket.ticket.tipos[i].emoji.id,
                       animated: false
                   },
                   label: configTicket.ticket.tipos[i].nome,
                   description: configTicket.ticket.tipos[i].descricao
               })
                tipos += configTicket.ticket.tipos[i].emoji.fullName+" - "+configTicket.ticket.tipos[i].nome+"\n"
            }
         let valor = ""
        
         if(configTicket.ticket.embed.site !== "nenhum") {
            valor += "🌎 [Site]("+configTicket.ticket.embed.site+")\n"
        }
        if(configTicket.ticket.embed.instagram !== "nenhum") {
            valor += "🌎 [Instagram]("+configTicket.ticket.embed.instagram+")\n"
        }
        if(configTicket.ticket.embed.tutoriais !== "nenhum") {
            valor += "🌎 [Tutoriais]("+configTicket.ticket.embed.tutoriais+")\n"
        }
        
        let embed = new (require("discord.js")).MessageEmbed()
        .setAuthor("📫 Central de Atendimento")
        .setDescription(`
            Olá, seja bem-vindo a central de atendimento da ${configTicket.ticket.embed.hostName}.
            Para iniciar seu atendimento, selecione um ícone abaixo correspondente ao departamento.
            Seu atendimento será realizado por meio de um canal privado.`)
        .addField("**Departamentos:**", `
        ${tipos}
        `, true)
        .addField("**Tickets:**", `
📨 Abertos: ${await Ticket.findAndCountAll({where: {
                resolved: false
            }}).then(value => { return value.count } )}
📫 Totais: ${await Ticket.findAndCountAll().then((value) => { return value.count })}

<:mineplaneta:855440184014012427> [Links](https://redetower.com.br/links)
<:Anotao:860119678147887114> [Tutoriais](https://wiki.redetower.com.br/)
            `, true)
        .addField(configTicket.ticket.embed.horario.title, configTicket.ticket.embed.horario.fim, true)
        
        .setColor(configTicket.ticket.embed.cor).setTimestamp()
            if(configTicket.ticket.embed.isActive) {
                if(configTicket.ticket.embed.isThumbnail) {
                    embed.setThumbnail(configTicket.ticket.embed.image)
                } else {
                    embed.setImage(configTicket.ticket.embed.image)
                }
            } 
                return interaction.channel.send({embeds: [embed], components: [new Discord.MessageActionRow().addComponents(select)]})
        }
        }
}
}