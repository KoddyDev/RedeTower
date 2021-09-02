// Módulos
const { Client, Intents } = require('discord.js');
const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")

// Arquivos
const config = require('./config.json')
const Database = require("./db/DatabaseLogin")
const Ticket = require("./db/Models/TicketSystem.js")
const Nota = require("./db/Models/Nota")
const Sugest = require("./db/Models/Sugestao")
const G = require("./db/Models/Sorteio")
const SU = require("./db/Models/UsersTable")
const gApi = require("./GiveawayApi")
const configT = require("./configTicket.json")
const client = new Client({ intents: ["GUILD_VOICE_STATES", "GUILDS", "GUILD_BANS", "GUILD_PRESENCES", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGES"], ws: {
    properties: {
        $browser: "Discord iOS"
    }
} });

client.on('interactionCreate', async (button) => {
    if(button.user.bot) return;
    if(button.isSelectMenu() && button.customId === "tickettt") {       
    for(let i = 0; i < configT.ticket.tipos.length; i++) {
    if(button.values[0] === configT.ticket.tipos[i].id) {
        let perm = [
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: button.user.id
            },
            {
                deny: 'VIEW_CHANNEL',
                id: button.guildId
            }
            ]
    for(let i = 0; i < configT.ids.cargos.tickets.length; i++) {
        perm.push(                {
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
            id: configT.ids.cargos.tickets[i]
        },)
        }
    const findUser2 = await Ticket.findOne({where: {
        authorId: button.user.id,
        resolved: false
    }})
                await button.deferReply({
            ephemeral: true
        })
    if(findUser2) return await button.editReply("Você já possue um ticket").catch((e) => {
        console.log(e);
    });
    const canal = await button.guild.channels.create(configT.ticket.tipos[i].canalName + `-${button.user.username}`, {
        parent: configT.ids.categories.ticket,
        type: 'text',
        permissionOverwrites: perm
    })         

    button.editReply(`Ticket criado com sucesso em <#${canal.id}>!`)
    let tipo1 = new Discord.MessageButton()
        .setLabel("Fechar")
        .setEmoji('859777462615539712')
        .setCustomId('fechartickett')
        .setStyle("DANGER")
    const row = new Discord.MessageActionRow()
        .addComponents(tipo1);
    const msg = await canal.send({ embeds: [new (require("discord.js")).MessageEmbed()
        .setAuthor("📫 Canal de Atendimento Privado")
        .setColor(configT.ticket.embed.cor)
        .setDescription(`Olá <@${button.user.id}>, conte-nos de que você precisa e em alguns instantes alguém da equipe entrará em contato com você.\n** **\nClique no <a:naoo:859777462615539712> para fechar o ticket.`)], components: [row], content: "<@"+button.user.id+">"})
    const newP = await Ticket.create({
        authorId: button.user.id,
        channelId: canal.id,
        guildId: button.guild.id,
        resolved: false,
        closeMessageId: msg.id
    })            
    let tipos = ""
    for(let i = 0; i < configT.ticket.tipos.length; i++) {
        tipos += `${configT.ticket.tipos[i].emoji.fullName} - ${configT.ticket.tipos[i].nome}\n`
    }
    let valor = ""
    if(configT.ticket.embed.site !== "nenhum") {
        valor += "<:mineplaneta:855440184014012427> [Links]("+configT.ticket.embed.site+")\n"
    }
    if(configT.ticket.embed.instagram !== "nenhum") {
        valor += "<:ping:788215814385303592> [Site]("+configT.ticket.embed.instagram+")\n"
    }
    let embed = new (require("discord.js")).MessageEmbed()
    .setAuthor("📫 Central de Atendimento")
    .setDescription(`Olá, seja bem-vindo a central de atendimento da ${configT.ticket.embed.hostName}.\nPara iniciar seu atendimento, reaja no ícone abaixo correspondente ao departamento desejado. Seu atendimento será realizado por meio de um **__canal__ __privado__** com a equipe.`)
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
    .addField(configT.ticket.embed.horario.title, configT.ticket.embed.horario.fim, true)
    .setColor(configT.ticket.embed.cor).setTimestamp()
    .setFooter("Desenvolvido por RedeTower")
        if(configT.ticket.embed.isActive) {
            if(configT.ticket.embed.isThumbnail) {
                embed.setThumbnail(configT.ticket.embed.image)
            } else {
                embed.setImage(configT.ticket.embed.image)
            }
        } 
        button.message.edit({
        embeds: [embed]
        })}}}
    if(button.isButton()) {
        if(button.customId === "fechartickett") {
        await button.deferReply({
            ephemeral: true
        })
        const findT = await Ticket.findOne({where: {
            resolved: false,
            closeMessageId: button.message.id
        }})
            if(findT) {
                findT.update({
                resolved: true
            })
        await button.channel.messages.fetch().then(msg22 => {
            msg22.sort()
            var logStream = fs.createWriteStream('./db/Tickets/Logs/ticket_'+ client.users.cache.get(findT.authorId).id+'.txt', {flags: 'w'});
            for (let [key, value, embeds] of msg22) {
            let hour = "",
                minutes = "",
                seconds = ""
            const date = new Date(value.createdTimestamp);
            if(date.getDay() <= 9) { day = "0"+date.getDay() } else { day = date.getDay() }
            if(date.getMonth() <= 9) { month = "0"+date.getMonth() } else { month = date.getMonth() }
            if(date.getHours() <= 9) { hour = "0"+date.getMonth() } else { your = date.getMonth() }
            if(date.getMinutes() <= 9) { minutes = "0"+date.getMinutes() } else { minutes = date.getMinutes() }
            if(date.getSeconds() <= 9) { seconds = "0"+date.getSeconds() } else { seconds = date.getSeconds() }
            let dateString = `${day}/${month}/${date.getFullYear()} ${hour}:${minutes}:${seconds}`;       
            logStream.write(`${value.author.tag} - ${dateString}\nMensagem: ${value.content}\n`)
        }
            logStream.end("FIM!");
        })
        button.editReply("Finalizando ticket em 5 segundos. 😁").then(m2 => {
        setTimeout(async () => {
            const PedindoNota = new Discord.MessageEmbed()
                .setAuthor("📫 Central de Atendimento")
                .setDescription(`Olá <@${findT.authorId}>, estamos entrando em contato com você para saber como foi o atendimento no seu ticket.\n\n1º Etapa (1/2): Nota :star:\n<:aviso:854929386394615848> Digite uma nota de 1 á 5.\n:arrow_right_hook: Sendo 1 ruim e 5 ótimo.`)
                .setFooter("Desenvolvido por RedeTower")
                .setColor(configT.ticket.embed.cor)
            let dm = await client.users.cache.get(findT.authorId).createDM()
                client.users.cache.get(findT.authorId).send({
                embeds: [PedindoNota]
            })
            button.message.channel.delete()
            let path = './db/Tickets/Logs/ticket_'+ client.users.cache.get(findT.authorId).id+'.txt'
            await client.channels.cache.get(configT.ids.channels.logs).send({
                content: "O ticket de " + client.users.cache.get(findT.authorId).id+ " foi fechado por " + button.user.tag,
                files: ['./db/Tickets/Logs/ticket_'+ client.users.cache.get(findT.authorId).id+'.txt']
            })
            const filt2 = x => x.author.id == findT.authorId
            function Avaliar() {
            let c1 =  dm.createMessageCollector({ filter: filt2, time: 60000 * 20,max:1})
            c1.on('collect', c => {
            const nota = c.content
            if(isNaN(nota) || parseInt(nota) > 5 || parseInt(nota) < 1) return client.users.cache.get(findT.authorId).send("Insira uma nota que seja um numero e que esteja entre 1 a 5!") && Avaliar(); 
            const PedindoComentario = new Discord.MessageEmbed()
                .setTitle("📫 Central de Atendimento")
                .setDescription(`Sua nota para nosso atendimento foi **__${nota}__**, agora vamos para a última etapa.\n\n2º Etapa (2/2): Comentário :book:\n<:aviso:854929386394615848> Nessa parte, queremos te escutar! Nos conte quem lhe atendeu, e nos conte se você foi bem atendido, se o seu problema foi totalmente resolvido, para que podemos sempre aprimorar nossos serviços.`)
                .setColor(configT.ticket.embed.cor)
            button.user.send({
                embeds: [PedindoComentario]
            })
            let c2 =  dm.createMessageCollector({ filter: filt2, time: 60000 * 20,max:1}).on('collect', async c => {
            const comentario = c.content
            const findUser = await Nota.findOne({
                where: {
                authorId: client.users.cache.get(findT.authorId).id
                }})
            await Nota.create({
                authorId: client.users.cache.get(findT.authorId).id,
                nota,
                comentario
            }) 
            var total = 0
            const findA = await Nota.findAll()
            var valor = 0
            findA.map(f => {
                valor += f.dataValues.nota
                total++
            })
            let findAL = await Nota.findAll({
                order: [
                ["createdAt", "DESC"]
                ], limit: 3
            })
            let d = await findAL.map(f => {
                const json = {
                    user: client.users.cache.get(f.authorId),
                    nota: parseInt(f.nota),
                    comentario: String(f.comentario),
                    hora: moment(new Date(f.createdAt)).format('DD [de] MMMM [de] YYYY[,] [às] H [horas] [e] mm [minutos]')
                } 
                  return json
                })
                let notinhas = ""
                    d.forEach(f => {
                    notinhas += `Usuário: <@${f.user.id}>\nComentário: ${f.comentario}\nNota: ${f.nota} :star: \`${f.hora}\`\n`})
                const notaDvidia = ( valor / findA.length )
                let embedAvaliacoes = new Discord.MessageEmbed()
                    .setAuthor("📫 Avaliações de Atendimento")
                    .setDescription(`Estou listando abaixo uma média de 1 á 5 sobre o atendimento de nossa equipe, de acordo com a avaliação dos nossos membros.\n** **\n> Média de atendimento: \`${notaDvidia.toFixed(2)}\` ⭐\n> Total de avaliações: \`${total}\` 🏅\n\n📖 **Últimos três comentários**:\n\n${notinhas}`)
                    .setColor("ORANGE")
                await client.channels.cache.get("867600749604110366").messages.fetch().then(msg223 => {
                    msg223.sort()
                    msg223.first().edit({
                        embeds: [embedAvaliacoes]
                    })
                })
                let embedEditada = new Discord.MessageEmbed()
                    .setAuthor("📫 Comentários de Atendimento")
                    .setDescription(`Usuário: <@${client.users.cache.get(findT.authorId).id}>\nComentário: ${comentario}\nNota: ${nota} :star: \`${moment(new Date(findUser.createdAt)).format('DD [de] MMMM [de] YYYY[,] [às] H [horas] [e] mm [minutos]')}\``)
                    .setFooter("Desenvolvido por RedeTower")
                    .setColor(configT.ticket.embed.cor)
                client.channels.cache.get("868282241145507880").send({
                    embeds: [embedEditada]
                })
                client.users.cache.get(findT.authorId).send({ embeds: [new Discord.MessageEmbed()
                    .setAuthor("📫 Central de Atendimento")
                     .setDescription(`Tudo certo <@${findT.authorId}>, registramos sua avaliação.\n\n:book: Resumo da sua avaliação:\n** **\nFechado por: <@${button.user.id}>\nAvaliado por: <@${findT.authorId}>\nNota: ${nota} :star:\n\nSeu comentário: ${comentario}`)
                     .setColor(configT.ticket.embed.cor)], files: ['./db/Tickets/Logs/ticket_'+ client.users.cache.get(findT.authorId).id+'.txt']})
                    })
                })    
        }
    Avaliar()
        
    }, 5000)
        })
            } else {
                    return await button.editReply("Canal invalido :x")
                }
            }
        if(button.customId === "captcha") {
            await button.deferReply({
            ephemeral: true
        })
        button.editReply("Cargo atribuído com sucesso! :grin:")
        if(!button.member.roles.cache.has(config.ids.roles.membro)) { button.member.roles.add(config.ids.roles.membro); }
        if(!button.member.roles.cache.has("824123742199873558")) { button.member.roles.add("824123742199873558") };
        if(!button.member.roles.cache.has("824126870895329292")) { button.member.roles.add("824126870895329292") };
     }

        }
if (button.isCommand()) {
    await button.deferReply({ephemeral: false}).catch((e) => {
      console.log(e);
    });
    const cmd = client.slashCommands.get(button.commandName);
    if (!cmd) return;
    const args = [];
    button.options.data.map((x) => {
      args.push(x.value);
    });
    cmd.run(client, button, args)
}
    
})

client.queue = new Discord.Collection()
client.aliases = new Discord.Collection();
client.requires = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.srequires = new Discord.Collection();

const map = new Map();
client.config = config;
  let prefix = config.prefix
  let token = config.token
  console.log("Carregando comandos...");
const fs = require("fs");
const { parse } = require('path');

client.on("guildMemberAdd", async (member) => { 
  const channel2 = client.channels.cache.get("787816372247724042")
    channel2.setTopic(`Membros: ${client.users.cache.size.toString().replace(1, ':one:')
      .replace(2, ':two:')
      .replace(3, ':three:')
      .replace(4, ':four:')
      .replace(5, ':five:')
      .replace(6, ':six:')
      .replace(7, ':seven:')
      .replace(8, ':eight:')
      .replace(9, ':nine:')
      .replace(0, ':zero:')}`)
  let guild = await client.guilds.cache.get("845030350661091390");
  let channel = await client.channels.cache.get("845030350661091390");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === ":one:");
  if (guild != member.guild) {
   } else {
      let embed = await new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`Bem-Vindo :heart:`)
        .setImage("https://imgur.com/yZ8iM6r.gif")
        .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! **${member.guild.memberCount} membros jogando no servidor.**, divirta-se conosco! <a:aA_Estrelinhas:854941291108237322>`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setFooter("")
        .setTimestamp();
      channel.send(embed);
}});

client.on("guildMemberRemove", async (member) => {
  const channel = client.channels.cache.get("845030350661091390")
    channel.setTopic(`Membros: ${client.users.cache.size.toString().replace(1, ':one:')
      .replace(2, ':two:')
      .replace(3, ':three:')
      .replace(4, ':four:')
      .replace(5, ':five:')
      .replace(6, ':six:')
      .replace(7, ':seven:')
      .replace(8, ':eight:')
      .replace(9, ':nine:')
      .replace(0, ':zero:')}`)
})

client.on("ready", async () => {
  console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
  Database.authenticate().then(() => {
    console.log("[DataBase] CONECTADO COM SUCESSO!")
      Ticket.init(Database).sync({force: false})
	  Nota.init(Database).sync({force: false})
      Sugest.init(Database).sync({force: false})
      G.init(Database).sync({force: false})   
      SU.init(Database).sync({force: false})
    }).catch(error => {
        console.error("[DataBase] Ocorreu um erro ao conectar na Database: " + error);
    })
    await client.application.fetch()
    const FA = await G.findAll({
      where: {
          finalizado: false
      }})

    if(!FA?.length > 1) return;
    const mapa = await FA.map(f => {
    const { tempo, tempoMS, reaction, premio, winner, message, canal, finalizado } = f.dataValues
    const json = {
        tempo,
        tempoMS,
        reaction,
        premio,
        winner,
        message,
        canal,
        finalizado,
    } 
      return json
})
    mapa.forEach(F => {
    console.log(F)
    let canal = client.channels.cache.get(F.canal)
    if(canal.isText())
    {
       canal.messages.fetch().then(async f => {
        let msg = await f.get(F.message)
        console.log("Acho q foi kkkkk")
           setTimeout(async () => {
           const winner = await gApi.finish(msg, F.reaction)
           if(winner === "Não foi possivel pegar o usuário.") return msg.channel.send("Não houve reações suficientes para continuar.")
           const ganhador = new Discord.MessageEmbed()
              .setTitle(`<a:hyper_boost:810634732949078026> SORTEIO!`)
              .setDescription(`<:aviso:854929386394615848> Sorteio realizado!\n\n <a:ovelha_arco_iris:859854575040069664> ➠ **Ganhador:** ${winner} \n <a:abelha:854928199900987403> ➠ **Prêmio:** ${F.premio}`)
              .setColor('ORANGE')
              .setTimestamp()
              .setFooter('RedeTower')
              .setThumbnail(`https://api.mcsrvstat.us/icon/147.135.64.147:10145`);
            canal.send({
              embeds: [
                ganhador
              ]
          });
          const findS = await G.findOne({where: {
            message: F.message
        }})
        if(!findS) return;
          findS.destroy()
          console.log("DESTRUIDO")
          }, F.tempoMS)
        })}})});

client.on("ready", () => {
    const mnger = require("./cmdMnger")
    mnger(client)
      const players = 0;
      let ferinha = [
        `Solicite ajuda com /ajuda`,
        `Gerenciando ${client.users.cache.size} membros.`
      ],
      fera = 0;

    const superagent = require("superagent")
setInterval(() => {
        
       // Proxy

   superagent.get("https://painel.hostsquare.com.br/api/client/servers/5079b8d4/resources")
   .set('Accept', 'application/json')
   .set("Content-Type", "application/json")
   .set('Authorization', 'Bearer 46Plv5OEWS74P4l6XDgoYQCBAvJoGQ4pQOowBk6RFPTaPSVe')
   .end((err, resproxy) => {
      const jsonproxy = JSON.parse(resproxy.text)
      const statusproxy = jsonproxy.attributes.current_state.toString().replace('running', ':green_heart:').replace('offline', ':heart:').replace('starting', ':orange_heart:').replace('stopping', ':brown_heart:')
   

   // Login

   superagent.get("https://painel.hostsquare.com.br/api/client/servers/6cb1e5e6/resources")
   .set('Accept', 'application/json')
   .set("Content-Type", "application/json")
   .set('Authorization', 'Bearer 46Plv5OEWS74P4l6XDgoYQCBAvJoGQ4pQOowBk6RFPTaPSVe')
   .end((err, reslogin) => {
      const jsonlogin = JSON.parse(reslogin.text)
      const statuslogin = jsonlogin.attributes.current_state.toString().replace('running', ':green_heart:').replace('offline', ':heart:').replace('starting', ':orange_heart:').replace('stopping', ':brown_heart:')
   

   // Lobby

   superagent.get("https://painel.hostsquare.com.br/api/client/servers/79349e63/resources")
   .set('Accept', 'application/json')
   .set("Content-Type", "application/json")
   .set('Authorization', 'Bearer 46Plv5OEWS74P4l6XDgoYQCBAvJoGQ4pQOowBk6RFPTaPSVe')
   .end((err, reslobby) => {
      const jsonlobby = JSON.parse(reslobby.text)
      const statuslobby = jsonlobby.attributes.current_state.toString().replace('running', ':green_heart:').replace('offline', ':heart:').replace('starting', ':orange_heart:').replace('stopping', ':brown_heart:')
   

   // RankUP Heads

   superagent.get("https://painel.hostsquare.com.br/api/client/servers/a4d9ffb3/resources")
   .set('Accept', 'application/json')
   .set("Content-Type", "application/json")
   .set('Authorization', 'Bearer 46Plv5OEWS74P4l6XDgoYQCBAvJoGQ4pQOowBk6RFPTaPSVe')
   .end((err, resheads) => {
      const jsonheads = JSON.parse(resheads.text)
      const statusheads = jsonheads.attributes.current_state.toString().replace('running', ':green_heart:').replace('offline', ':heart:').replace('starting', ':orange_heart:').replace('stopping', ':brown_heart:')
   

   // R. Heads (Minas)

   superagent.get("https://painel.hostsquare.com.br/api/client/servers/62ce5bef/resources")
   .set('Accept', 'application/json')
   .set("Content-Type", "application/json")
   .set('Authorization', 'Bearer 46Plv5OEWS74P4l6XDgoYQCBAvJoGQ4pQOowBk6RFPTaPSVe')
   .end((err, resheadsm) => {
      const jsonheadsm = JSON.parse(resheadsm.text)
      const statusheadsm = jsonheadsm.attributes.current_state.toString().replace('running', ':green_heart:').replace('offline', ':heart:').replace('starting', ':orange_heart:').replace('stopping', ':brown_heart:')

    today=new Date();
    h=today.getHours();
    m=today.getMinutes();
    s=today.getSeconds();
    d=today.getDate()
    mm=today.getMonth()
    mmm=mm + 1
    a=today.getFullYear();

   let statusEmbed = new Discord.MessageEmbed()
      .setTitle(`<a:carregar:859862232838176808> STATUS!`)
      .setDescription(` ** ** \nBem-vindo ao nosso Status, aqui atualizamos as informações sobre o estado atual da nossos Servidores. Confira abaixo. \n ** ** \n 📋 **| __Legenda__**: \n :green_heart: ➠ **Online** \n :orange_heart: ➠ **Reiniciando** \n :brown_heart: ➠ **Desligando** \n :heart: ➠ **Offline** \n ** ** \n Proxy (Servidor de Conexão) ➠ ${statusproxy} \n Login (Servidor de Autenticação) ➠ ${statuslogin} \n Lobby ➠ ${statuslobby} \n RankUP Heads ➠ ${statusheads} \n RankUP Heads (Servidor de Mineração) ➠ ${statusheadsm} \n ** **\n> Atualizado a cada 30 segundos.\n** **\nEstá com algum problema de Conexão? Abra um ticket em <#787816371236634624>.`)
      .setColor('BLUE')
      .setThumbnail('https://c.tenor.com/bGCuW8uql2kAAAAC/office-server.gif')
      .setFooter(`Desenvolvido por RedeTower. | Atualizado ás: ${h}:${m}:${s} - ${d}/${mmm}/${a}`)
  client.channels.cache.get("838804663205363831").messages.fetch().then(msgStatus => {
                    msgStatus.sort()
        msgStatus.first().edit({
            embeds: [statusEmbed]
        })
})

})})})})})

    }, 30000)

    setInterval( async () => await client.user.setActivity(`${ferinha[fera++ % ferinha.length]}`, {
          type: "PLAYING" //mais tipos: WATCHING / LISTENING
        }), 1000 * 30); 
        client.user
        .setStatus("online")
        console.log("Estou pronto para ser utilizado!")
    });

client.login(config.token);
client.on("messageCreate", message => {
if(message.author.bot) return;
if(message.content == `<@!${client.user.id}>` || message.content == `<@${client.user.id}>`) return message.channel.send(`Olá ${message.author}, meu prefixo é \`/ajuda\``)
});