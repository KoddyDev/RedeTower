

const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const S = require("../../db/Models/Sugestao");
const U = require("../../db/Models/UsersTable")
module.exports = {
    name: 'sgadm',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando da staff do menu de sugestões',
    usage: '',

    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let Sgst = require("../../db/Models/Sugestao")
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.editReply("Sem permissão.")
        
        let select = new Discord.MessageSelectMenu()
        .setCustomId('ResponderADM')
        .setPlaceholder('Clique para visualizar as opções')
        .setMaxValues(1)
        .setMinValues(1)
            
        
            const findAll = await U.findAll()
        
            let embed1 = new Discord.MessageEmbed()
            .setTitle("Sugestões - Administrador")
            .setColor("ORANGE")
            .setDescription(`Olá <@${interaction.user.id}>, seja bem vindo ao sistema de de sugestão da administração da RedeTower! Aqui você pode responder uma sugestão, editar um comentario ou mudar o status da sugestão ( aprovada ou recusada )
            
            Encontradas ${findAll.length >= 1 ? findAll.length : 0} sugestões.`) 
            .setFooter("Desenvolvido por Vinicius")
            .setTimestamp()
        
            if(findAll.length === 0) return interaction.channel.send({embeds: [embed1] });
        
            findAll.map(f => {
                select.addOptions({
                    value: f.dataValues.user,
                    label: client.users.cache.get(f.dataValues.user).tag
                })
            })
        
            return interaction.editReply({
                components: [new Discord.MessageActionRow().addComponents(select)],
                embeds: [embed1]
            }).then(msg => {

        const menuF = (b) => b.user.id === interaction.user.id
                let cole = interaction.channel.createMessageComponentCollector({ filter: menuF, time: 15000, max: 1})

                cole.on('collect', async (b) => {
                    
                    if(b.isSelectMenu()) {
                    if(b.customId === "ResponderADM") {
                        interaction.deleteReply()

                        const findUserP = await S.findOne({
                            where: {
                                user: b.values[0]
                            }
                        })
                        if(!findUserP) return "Nulo"
                        let sgsts = await S.findAll({
                            where: {
                                user: b.values[0]
                            }
                        })

                        embed1 = new Discord.MessageEmbed()
                        .setTitle("Sugestões - Administrador")
                        .setColor("ORANGE")
                        .setDescription(`Você já escolheu o usuario <@${b.values[0]}>, agora você deve escolher uma sugestão que ele enviou:
                        
                        ${await sgsts.map(f => {
                            return `
                            ID: ${f.dataValues.id}`
                        })}`)
            
                        select = new Discord.MessageSelectMenu()
                        .setCustomId('ResponderADM45')
                        .setPlaceholder('Clique para visualizar as opções')
                        .setMaxValues(1)
                        .setMinValues(1)

                        await sgsts.map(f => {
                            select.addOptions({
                                value: f.dataValues.id.toString(),
                                label: f.dataValues.id.toString()
                            })
                        })

                        b.reply({
                        components: [new Discord.MessageActionRow().addComponents(select)],
                        embeds: [embed1]
                    }).then(msg => {
                const menuF = (b) => b.user.id === interaction.user.id
                        let cole = interaction.channel.createMessageComponentCollector({ filter: menuF, time: 15000, max: 1})
        
                        cole.on('collect', async (b5) => {
                            let counter = 0
                            counter++
                            console.log("OK " + counter)
                        
                            if(b5.isSelectMenu()) {
                                                            counter++
                            console.log("OK " + counter)
                            if(b5.customId === "ResponderADM45") {
                                let findSPI = await S.findOne({
                                    where: {
                                        id: b5.values[0]
                                    }
                                })
                                if(!findSPI) return console.log("Nulo.")
                                const sugestãoPo = findSPI.sugestão
                        embed1 = new Discord.MessageEmbed()
                        .setTitle("Sugestões - Administrador")
                        .setColor("ORANGE")
                        .setDescription(`Você já escolheu o usuario <@${b.values[0]}>, a sugestão dele \`${sugestãoPo}\`, agora você deve escolher oque você deseja fazer.`)
            
                        select = new Discord.MessageSelectMenu()
                        .setCustomId('ResponderADM2')
                        .setPlaceholder('Clique para visualizar as opções')
                        .setMaxValues(1)
                        .setMinValues(1)
            
                        const rSugestão = {
                            value: "Um",
                            label: "Responder Sugestão"
                        }
            
                        const aComentario = {
                            value: "Dois",
                            label: "Alterar o comentario da sugestão"
                        }
            
                        const aStatus = {
                            value:"Três",
                            label: "Alterar o status da sugestão"
                        }
            
                        select.addOptions([rSugestão, aComentario, aStatus])
                        
                        b5.reply({
                            components: [new Discord.MessageActionRow().addComponents(select)],
                            embeds: [embed1]
                        }).then(msg1 => {
                            const clctor = (b) => b.user.id === interaction.user.id
                        let col2 = interaction.channel.createMessageComponentCollector({ filter: clctor, time: 15000})
            
                        col2.on('collect', async (b2) => {
                            if(b2.isSelectMenu()) {
                            if(b2.customId === "ResponderADM2") {
                                const findU = await Sgst.findOne({
                                    where: {
                                        user: b.values[0]
                                    }
                                })
                                console.log(findU)
                                
                                        if(b2.values[0] === "Um") {
                                            if(findU.comentario) return b2.reply("Esta sugestão já foi respondida!")
                                            embed1 = new Discord.MessageEmbed()
                                            .setTitle("Sugestões - Administrador")
                                            .setColor("ORANGE")
                                            
                                            .setThumbnail(client.user.avatarURL())
                                            .setDescription(`Você já escolheu o usuario \`${client.users.cache.get(b.values[0]).tag}\`, a sugestão \`${sugestãoPo}\` e a a opção Nº \`${b2.values[0]}\`, agora você deve digitar qual é o comentario para a sugestão.`)
                                            b2.reply({embeds: [embed1] })
        
                                            const f22 = x => x.user.id == interaction.user.id;
                                            const f23 = x => x.author.id == interaction.user.id;
                                        interaction.channel.createMessageCollector({filter: f23, time: 60000 * 20,max:1})
                                        .on('collect', async c => {
                                            const comentario = c.content
        
                                            select = new Discord.MessageSelectMenu()
                                            .setCustomId('ResponderADM3')
                                            .setPlaceholder('Clique para visualizar as opções')
                                            .setMaxValues(1)
                                            .setMinValues(1)

                                            select.addOptions([
                                                {
                                                    value: "Um",
                                                    label: "Aprovar"
                                                },
                                                {
                                                    value: "Dois",
                                                    label: "Reprovar"
                                                },
                                                
                                            ])
        
                                            embed1 = new Discord.MessageEmbed()
                                            .setTitle("Sugestões - Administrador")
                                            .setColor("ORANGE")
                                            .setDescription(`Você já escolheu o usuario \`${client.users.cache.get(b.values[0]).tag}\`, a sugestão \`${sugestãoPo}\` e a a opção Nº \`${b2.values[0]}\` e digitou o comentario \`${comentario}\`, agora você deve escolher o status para a finalização da resposta da sugestão.`)
                                        interaction.channel.send({
                                            embeds: [embed1],
                                            components: [new Discord.MessageActionRow().addComponents(select)]
                                        }).then(msg4 => {
        
                                            let col3 = msg4.createMessageComponentCollector({ filter:f22,time: 15000})
                    
                                            col3.on('collect', async b3556 => {
                                                if(b3556.isSelectMenu()) {
                                                    
                                                if(b3556.customId === "ResponderADM3") {
                                                   await b3556.deferReply()
                                                    embed1 = new Discord.MessageEmbed()
                                                    .setTitle("Sugestões - FINALIZAÇÃO - Administrador")
                                                    .setColor("ORANGE")
                                                    
                                                    .setThumbnail(client.user.avatarURL())
                                                    .setDescription("Você deseja responder esta sugestão?")
        
        
                                                    let zum = new Discord.MessageButton()
                                                    .setEmoji("✅")
                                                    .setCustomId("Um")
                                                    .setStyle("SUCCESS")
        
                                                    let zdois = new Discord.MessageButton()
                                                    .setEmoji("❎")
                                                    .setCustomId("Dois")
                                                    .setStyle("DANGER")
        
                                                    let row = new Discord.MessageActionRow()
                                                    .addComponents([zum, zdois]);
                                                    b3556.editReply({
                                                        embeds: [embed1],
                                                        components: [row]
                                                    }).then(msg5 => {
        
                                                    let col4 = msg5.createMessageComponentCollector({ filter: f22,time: 15000})
                                                    
                                                    col4.on("collect", (btn) => {
                                                        if(btn.isButton()) {
                                                        if(btn.customId !== "Um" && btn.customId !== "Dois") return;
        
                                                        if(btn.customId === "Um") {
                    	if(b3556.values[0] === "Um") {
                                                                findU.update({
                                                                    comentario,
                                                                    status: b3556.values[0]
                                                                })
        
                                                                embed1 = new Discord.MessageEmbed()
                                                    .setTitle("Sugestões - Administrador")
                                                    .setColor("ORANGE")
                                                                .setDescription(`A sugestão dele foi aprovada!`)
        
                                                                .setThumbnail(client.user.avatarURL())
                                                                btn.reply({embeds: [embed1] })
        
                                                                embed1 = new Discord.MessageEmbed()
                                                                .setTitle("Sugestões - RedeTower")
                                                                .setColor("ORANGE")
                                                                .setThumbnail(client.user.avatarURL())
                                                                .setDescription("A sua sugestão foi aprovada com sucesso por " + interaction.user.tag + "!\nO comentario adicionado é: " + comentario)
        
                                                                client.users.cache.get(b.values[0]).send({
                                                                    embeds: [embed1]
                                                                })
                                                            
                                                            }
						if(b3556.values[0] === "Dois") {
                                                                                            findU.update({
                                                                    comentario,
                                                                    status: b3556.values[0]
                                                                })
        
                                                                embed1 = new Discord.MessageEmbed()
                                                    .setTitle("Sugestões - Administrador")
                                                    .setColor("ORANGE")
                                                                .setDescription(`A sugestão dele foi reprovada!`)
        
                                                                interaction.channel.send({
                                                                    embeds: [embed1]
                                                                })
        
                                                                embed1 = new Discord.MessageEmbed()
                                                                .setTitle("Sugestões - RedeTower")
                                                                .setColor("ORANGE")
                                                                .setThumbnail(client.user.avatarURL())
                                                                .setDescription(`A sua sugestão \`${sugestãoPo}\` foi reprovada por \`${interaction.user.tag}\`!\nO comentario adicionado é: ${comentario}`)
        
                                                                client.users.cache.get(b.values[0]).send({
                                                                    embeds: [embed1]
                                                                })
                        }
                                                            }
                                                        if(btn.customId === "Dois") {
                                                                btn.channel.send("Cancelado")
                                                        }
                                                    }
                                                    })
                                                })
                                                }
                                            }
                                            })
                                            
                                        })
                                            
                                        })
        
                                        }
                                        
                                        if(b2.values[0] == "Dois") {
                                            
                                            if(!findU.comentario) return b2.reply("Esta sugestão não foi respondida!")
                                            
                                            embed1 = new Discord.MessageEmbed()
                                            .setTitle("Sugestões - Administrador")
                                            .setColor("ORANGE")
                                            .setThumbnail(client.user.avatarURL())
                                            .setDescription(`Olá <@${interaction.user.id}>, aqui você irá alterar o comentario do usuario \`${client.users.cache.get(b.values[0]).tag}\`.\n\nPor favor, insira o novo comentario.`)
        
                                            b2.reply({embeds: [embed1] })
                                            const f22 = x => x.author.id == interaction.user.id;
                                            interaction.channel.createMessageCollector({ filter: f22, time: 60000 * 20,max:1})
                                            .on('collect', c => {
                                                const comentario = c.content
        
                                                embed1 = new Discord.MessageEmbed()
                                                .setTitle("Sugestões - Administrador")
                                                .setColor("ORANGE")
                                                .setThumbnail(client.user.avatarURL())
                                                .setDescription(`Olá <@${interaction.user.id}>, Você já escolheu o usuario \`${client.users.cache.get(b.values[0]).tag}\` e alterou o comentario com sucesso.\n\nO comentario está sendo alterado e informado ao usuario!`)
            
                                                c.reply({
                                                    embeds: [embed1]
                                                })
        
                                                findU.update({
                                                    comentario
                                                })
        
                                                embed1 = new Discord.MessageEmbed()
                                                .setTitle("Sugestões - RedeTower")
                                                .setColor("ORANGE")
                                                .setThumbnail(client.user.avatarURL())
                                                .setDescription(`Em relação a sua sugestão \`${findU.sugestão}\`, o comentario foi alterado por \`${interaction.user.tag}\`. \nNovo comentario: \`${comentario}\``)
        
                                                client.users.cache.get(b.values[0]).send({
                                                    embeds: [embed1]
                                                })
        
        
        
        
                                            })
                                        } 
                                        
                                        if(b2.values[0] == "Três") {
                                            
                                            if(!findU.comentario) return b2.reply("Esta sugestão não foi respondida!")
                                            embed1 = new Discord.MessageEmbed()
                                            .setTitle("Sugestões - Administrador")
                                            .setColor("ORANGE")
                                            .setThumbnail(client.user.avatarURL())
                                            .setDescription(`Olá <@${interaction.user.id}>, aqui você irá alterar o status do usuario \`${client.users.cache.get(b.values[0]).tag}\`.\n\nPor favor, Selecione o novo status!`)
        
                                            select = new Discord.MessageSelectMenu()
                                            .setCustomId("ResponderADM3")
                                            .setPlaceholder("Selecione uma opção")
                                            .setMaxValues(1)
                                            .setMinValues(1)
        
                                            select.addOptions([
                                                {
                                                    label: "Aprovada",
                                                    value: "Um"
                                                },
                                                {
                                                    label: "Reprovada",
                                                    value: "Dois"
                                                }
                                            ])
        
                                            interaction.channel.send({
                                                embeds: [embed1],
                                                components: [new Discord.MessageActionRow().addComponents(select)]
                                            }).then(msg3 => {
        
                                                let f = (b) => b.user.id === interaction.user.id
        
                                                let col3 = interaction.channel.createMessageComponentCollector({ filter: f, time: 15000, max: 1})
                    
                                                col3.on('collect', (b3) => {
                                                    if(b3.customId === "ResponderADM3") {
                                                        embed1 = new Discord.MessageEmbed()
                                                        .setTitle("Sugestões - Administrador")
                                                        .setColor("ORANGE")
                                                        .setThumbnail(client.user.avatarURL())
                                                        .setDescription(`Olá <@${interaction.user.id}>, você já selecionou o novo status da sugestão do \`${client.users.cache.get(b.values[0]).tag}\`.\n\nEle já foi alertado sobre esta mudança, obrigado por utilizar este sistema, atenciosamente \`Vinicius\`.`)
                    
                                                        interaction.channel.send({
                                                            embeds: [embed1]
                                                        })
        
                                                        
                                                embed1 = new Discord.MessageEmbed()
                                                .setTitle("Sugestões - RedeTower")
                                                .setColor("ORANGE")
                                                .setThumbnail(client.user.avatarURL())
                                                .setDescription(`Em relação a sua sugestão \`${findU.sugestão}\`, revi a sua sugestão e resolvi alterar para ${b3.values[0] == "Um" ? "Aprovado" : "Reprovado"}, atenciosamente, ${interaction.user.tag}.`)
                                                client.users.cache.get(b.values[0]).send({
                                                    embeds: [embed1]
                                                })
                                                    }
                                                })
                                            })
                                        }
                                
                            }}
                        })
                    })
                
                    }
                }
            
        })
                
            })
                }

            }
        })
            
    })
}
}