const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clog',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando de Change Log.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const logChannel = client.channels.cache.get('862798798115045416')
    const user = interaction.user

    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        let semPerm = new Discord.MessageEmbed()
            .setTitle(`<:Anotao:860119678147887114> CHANGE-LOG!`)
            .setDescription(`<:aviso:854929386394615848> Você não tem permissão para isso.`)
            .setColor(`ORANGE`)
            .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
            .setTimestamp()
            .setThumbnail(client.user.avatarURL())
        return interaction.channel.send({
            embeds: [semPerm]
        }).then(msg => msg.delete({ timeout: 20000 }));

    }

    let dmEnviado = new Discord.MessageEmbed()
        .setTitle(`<:Anotao:860119678147887114> CHANGELOG!`)
        .setDescription(`<:aviso:854929386394615848> Para prosseguir com esse comando, confira seu privado.`)
        .setColor(`BLUE`)
        .setFooter(`${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png"}))
    interaction.editReply({
        embeds: [dmEnviado]
    });

    let networkEmbed = new Discord.MessageEmbed()
        .setTitle('<:diamante:839617048380571659> NETWORK!')
        .setDescription('🤔 **|** Quais as alterações que houveram nesse servidor?\n\n<:errado:707762832929980486> **|** Não houveram alterações? Então escreva: `nenhuma`.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('#00eaff')
    let loginEmbed = new Discord.MessageEmbed()
        .setTitle('<:girassol:839616839386005565> LOGIN!')
        .setDescription('🤔 **|** Quais as alterações que houveram nesse servidor?\n\n<:errado:707762832929980486> **|** Não houveram alterações? Então escreva: `nenhuma`.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('#ffed0f')
    let lobbyEmbed = new Discord.MessageEmbed()
        .setTitle('<:foguete:839610476903530536> LOBBY!')
        .setDescription('🤔 **|** Quais as alterações que houveram nesse servidor?\n\n<:errado:707762832929980486> **|** Não houveram alterações? Então escreva: `nenhuma`.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('#f14d4d')
    let headsEmbed = new Discord.MessageEmbed()
        .setTitle('<:vaca:839617715315933226> | RANKUP HEADS!')
        .setDescription('🤔 **|** Quais as alterações que houveram nesse servidor?\n\n<:errado:707762832929980486> **|** Não houveram alterações? Então escreva: `nenhuma`.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('#ff0000')
    let discordEmbed = new Discord.MessageEmbed()
        .setTitle('<:lapis:839615717905137664> | DISCORD!')
        .setDescription('🤔 **|** Quais as alterações que houveram nessa plataforma?\n\n<:errado:707762832929980486> **|** Não houveram alterações? Então escreva: `nenhuma`.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('#2866bd')
    let siteEmbed = new Discord.MessageEmbed()
        .setTitle('<:ferro:839616792963317820> | WEB SITE!')
        .setDescription('🤔 **|** Quais as alterações que houveram nessa plataforma?\n\n<:errado:707762832929980486> **|** Não houveram alterações? Então escreva: `nenhuma`.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('#b2c0cc')
    let equipeEmbed = new Discord.MessageEmbed()
        .setTitle('<:ouro:839615823076130846> | EQUIPE!')
        .setDescription('🤔 **|** Quais as alterações que houveram na equipe?\n\n<:errado:707762832929980486> **|** Não houveram alterações? Então escreva: `nenhuma`.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('#d3d417')
    let confirmacaoEmbed = new Discord.MessageEmbed()
        .setTitle('<:alavanca:839619726535557120> CONFIRMAR!')
        .setDescription('🤔 **|** Você tem certeza que quer enviar essa ChangeLog?\n\n⚠️ **|** Revise a **__ortografia__** e as **__alterações__** antes de enviar.\n\nReaja abaixo com <:correto:707762526917754940> para enviar a ChangeLog.\n\nReaja abaixo com <:errado:707762832929980486> para não enviar a ChangeLog.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('#ffa000')
    let naoEnviadoEmbed = new Discord.MessageEmbed()
        .setTitle(`<:Anotao:860119678147887114> CHANGELOG!`)
        .setDescription('Envio cancelado com sucesso!')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('RED')
    let enviadoEmbed = new Discord.MessageEmbed()
        .setTitle(`<:Anotao:860119678147887114> CHANGE-LOG!`)
        .setDescription('<:aviso:854929386394615848> Você enviou a ChangeLog com sucesso! Vá até o canal <#825451097983418419> para ver.')
        .setFooter('RedeTower • ChangeLog')  
        .setColor('GREEN')
    user.send({
        embeds: [networkEmbed]
    }).then(async msgNetwork => {
        const filter = m => m.author.id === interaction.user.id;
    const respostaNetwork = msgNetwork.channel.createMessageCollector({ filter, max: 1, time: 6000000 })
    respostaNetwork.on('collect', async () => {
    user.send({
        embeds: [loginEmbed]
    }).then(async msgLogin => {
    const respostaLogin = msgLogin.channel.createMessageCollector({ filter, max: 1, time: 6000000 })
    respostaLogin.on('collect', async () => {
    user.send({embeds: [lobbyEmbed]}).then(async msgLobby => {
    const respostaLobby = msgLobby.channel.createMessageCollector({ filter, max: 1, time: 6000000 })
    respostaLobby.on('collect', async () => {
    user.send({embeds: [headsEmbed]}).then(async msgHeads => {
    const respostaHeads = msgHeads.channel.createMessageCollector({ filter, max: 1, time: 6000000 })
    respostaHeads.on('collect', async () => {
    user.send({embeds:[discordEmbed]}).then(async msgDiscord => {
    const respostaDiscord = msgDiscord.channel.createMessageCollector({ filter, max: 1, time: 6000000 })
    respostaDiscord.on('collect', async () => {
    user.send({embeds:[siteEmbed]}).then(async msgSite => {
    const respostaSite = msgSite.channel.createMessageCollector({ filter, max: 1, time: 6000000 })
    respostaSite.on('collect', async () => {
    user.send({embeds:[equipeEmbed]}).then(async msgEquipe => {
    const respostaEquipe = msgEquipe.channel.createMessageCollector({ filter, max: 1, time: 6000000 })
    respostaEquipe.on('collect', async () => {
    user.send({ embeds: [confirmacaoEmbed]}).then(async confirmar => {
    const emoji = ['correto', 'errado'];
    confirmar.react('707762526917754940');
    confirmar.react('707762832929980486');
    const filter = (r, user) => emoji.includes(r.emoji.name) && user.id !== client.user.id
    const collector = confirmar.createReactionCollector({ filter, max: 1, time: 60000, errors: ['time'] });
    collector.on("collect", async (collect, reaction) => {
    const emojii = collect.emoji.name;

    let logNetwork = `\n\n<:diamante:839617048380571659> ➠ **__Network:__** \n${respostaNetwork.collected.first().content}`
    if (logNetwork === "\n\n<:diamante:839617048380571659> ➠ **__Network:__**\nnenhuma") logNetwork = ""

    let logLogin = `\n\n<:girassol:839616839386005565> ➠ **__Login:__** \n${respostaLogin.collected.first().content}`
    if (logLogin === "\n\n<:girassol:839616839386005565> ➠ **__Login:__**\nnenhuma") logLogin = ""

    let logLobby = `\n\n<:foguete:839610476903530536> ➠ **__Lobby:__** \n${respostaLobby.collected.first().content}`
    if (logLobby === "\n\n<:foguete:839610476903530536> ➠ **__Lobby:__**\nnenhuma") logLobby = ""

    let logHeads = `\n\n<:vaca:839617715315933226> ➠ **__RankUP Heads:__** \n${respostaHeads.collected.first().content}`
    if (logHeads === "\n\n<:vaca:839617715315933226> ➠ **__RankUP Heads:__**\nnenhuma") logHeads = ""

    let logDiscord = `\n\n<:lapis:839615717905137664> ➠ **__Discord:__** \n${respostaDiscord.collected.first().content}`
    if (logDiscord === "\n\n<:lapis:839615717905137664> ➠ **__Discord:__**\nnenhuma") logDiscord = ""

    let logSite = `\n\n<:ferro:839616792963317820> ➠ **__Web Site:__** \n${respostaSite.collected.first().content}`
    if (logSite === "\n\n<:ferro:839616792963317820> ➠ **__Web Site:__**\nnenhuma") logSite = ""

    let logEquipe = `\n\n<:ouro:839615823076130846> ➠ **__Equipe:__** \n${respostaEquipe.collected.first().content}`
    if (logEquipe === "\n\n<:ouro:839615823076130846> ➠ **__Equipe:__**\nnenhuma") logEquipe = ""

    if (emojii === emoji[0]) {
        confirmar.delete
        let logEmbed = new Discord.MessageEmbed()
            .setTitle(`<:Anotao:860119678147887114> CHANGE-LOG!`)
            .setDescription(`${logNetwork}${logLogin}${logLobby}${logHeads}${logDiscord}${logSite}${logEquipe}`)
            .setColor('ORANGE')
            .setThumbnail(`https://api.mcsrvstat.us/icon/147.135.64.147:10145`)
            .setFooter('RedeTower • ChangeLog') 
        logChannel.send({
            embeds: [logEmbed]
        }).then(async msgLog => {
        user.send({
            embeds: [enviadoEmbed]
        })
        msgLog.react('859799628597952512');
         })
        }

        if (emojii === emoji[1]) {
            confirmar.delete
            user.send({
                embeds: [naoEnviadoEmbed]
            })
        }
       })
      })
     })   
    })
   })
  })
 })
})
})
})
})
})
})
})
})
})
    }}